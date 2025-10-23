import { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import "./ouvidoria.css";

/* ============ FALLBACK LOCAL (usado se JSON externo falhar) ============ */
const FALLBACK_SECTIONS = [
  { title: "Início (Home)", q: "inicio", body: "Bem-vindo à Casa do Senatus. Na página Inicial (Home), encontrarás um compêndio sobre os líderes..." },
  { title: "Líderes", q: "lideres", body: "Sobre os Líderes: são referenciais de prudência e serviço..." },
  { title: "Filosofia & Valores", q: "filosofia", body: "Nossa filosofia: justiça com clemência, disciplina com humanidade..." },
  { title: "Perguntas Frequentes (FAQ)", q: "faq", body: "Perguntas & Respostas: dispomos de um rol de indagações comuns..." },
  { title: "Formulário de Entrada", q: "formulario", body: "Formulário de Entrada: para integrar os grupos oficiais (WhatsApp)..." },
  { title: "Imagens & Figurinhas", q: "imagens", body: "Imagens & Figurinhas: dispomos de insígnias e figurinhas oficiais..." },
  { title: "Avisos", q: "avisos", body: "Avisos: esta seção é o quadro de edictos..." },
  { title: "Jogo", q: "jogo", body: "Sobre o Jogo: encontra-se em forja..." },
  { title: "Convívio & Religião", q: "convivio", body: "Convívio & Respeito: o Senatus não se firma em uma única religião..." },
  { title: "Contato", q: "contato", body: "Canais de Contato: se necessitares voz mais imediata..." }
];

const FALLBACK_KNOWLEDGE = [
  { question: "quem criou o senatus", answer: "O criador é Anderson, Líder Supremo, que fundou a Ordem após restaurar os valores de justiça e fraternidade." },
  { question: "quem fundou o senatus", answer: "O Senatus foi fundado por Anderson, ao lado de Sun, Thiago, Levi, Arnold, Warlen, Alberto e BiluBilu, após a ruptura com uma comunidade corrompida." },
  { question: "quem é o lider supremo", answer: "O Líder Supremo é Anderson, fundador e criador do Senatus." },
  { question: "quem é o grão mestre", answer: "O Grão-Mestre é Arnaud, oficiante de prudência e ordem." },
  { question: "principios", answer: "Justiça, lealdade, disciplina, fraternidade e respeito — colunas que sustentam a casa comum." },
  { question: "filosofia", answer: "Não buscamos a força pela espada; preferimos a retidão do caráter e o governo da razão." },
  { question: "juramento", answer: "“Pela graça do Senatus, comprometo-me a cultivar a pureza do espírito...”" },
  { question: "reclamar", answer: "Podes registrar tua reclamação aqui mesmo na Ouvidoria ou falar pelos canais de WhatsApp." }
];

/* ============ CONFIG: onde está seu JSON (pode ser URL externa) ============ */
const GUIDE_URL = "/guide.json"; // ou "https://seu-dominio.com/guide.json"

/* ============ CACHE em localStorage com TTL ============ */
const CACHE_KEY = "senatus_guide_cache_v1";
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutos

function getCachedGuide() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (!savedAt || !data) return null;
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}
function setCachedGuide(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {}
}

const Ouvidoria = () => {
  /* ===== Estado dinâmico para sections/knowledge & fuse ===== */
  const [sections, setSections] = useState(FALLBACK_SECTIONS);
  const [knowledge, setKnowledge] = useState(FALLBACK_KNOWLEDGE);
  const [fuse, setFuse] = useState(() => new Fuse(FALLBACK_KNOWLEDGE, { keys: ["question"], threshold: 0.34 }));

  /* ===== Carrega JSON do Guia (com cache + fallback) ===== */
  useEffect(() => {
    let cancelled = false;

    async function loadGuide() {
      // 1) tenta cache
      const cached = getCachedGuide();
      if (cached && !cancelled) {
        if (Array.isArray(cached.sections)) setSections(cached.sections);
        if (Array.isArray(cached.knowledge)) {
          setKnowledge(cached.knowledge);
          setFuse(new Fuse(cached.knowledge, { keys: ["question"], threshold: 0.34 }));
        }
        return;
      }

      // 2) fetch remoto
      try {
        const res = await fetch(GUIDE_URL, { cache: "no-cache" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();

        if (cancelled) return;

        if (Array.isArray(data.sections) && data.sections.length) {
          setSections(data.sections);
        }
        if (Array.isArray(data.knowledge) && data.knowledge.length) {
          setKnowledge(data.knowledge);
          setFuse(new Fuse(data.knowledge, { keys: ["question"], threshold: 0.34 }));
        }
        setCachedGuide({ sections: data.sections || FALLBACK_SECTIONS, knowledge: data.knowledge || FALLBACK_KNOWLEDGE });
      } catch (e) {
        // 3) fallback silencioso (já estamos com os locais)
        // opcional: console.warn("Falha ao carregar guide.json", e);
      }
    }

    loadGuide();
    return () => { cancelled = true; };
  }, []);

  /* ===== Resto do componente (igual ao seu, já com typing, menu, overlay) ===== */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ouvidoria_msgs");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "bot", text: "Saudações. Sou a Ouvidoria do Senatus. Digite 'oi' para iniciarmos, ou 'menu' para sugestões." }];
  });
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState(() => localStorage.getItem("ouvidoria_user") || null);
  const [waitingName, setWaitingName] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => localStorage.setItem("ouvidoria_msgs", JSON.stringify(messages)), [messages]);
  useEffect(() => { if (userName) localStorage.setItem("ouvidoria_user", userName); }, [userName]);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const typeDelay = (text = "") => 360 + Math.min(1000, Math.floor(text.length * 10));
  const say = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", typing: true }]);
    const delay = typeDelay(text);
    setTimeout(() => {
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[copy.length - 1]?.typing) copy.pop();
        return [...copy, { sender: "bot", text }];
      });
    }, delay);
  };

  const SUGGESTIONS = sections.map(s => ({ label: s.title, q: s.q }));
  const showMenu = () => {
    say("Eis algumas sendas de consulta. Escolhe uma, ou escreve tua pergunta:");
    setMessages((prev) => [...prev, { sender: "bot", chips: SUGGESTIONS }]);
  };

  const handleSend = (customText) => {
    const textIn = (customText ?? input).trim();
    if (!textIn) return;
    const userText = textIn.toLowerCase();

    setMessages((prev) => [...prev, { sender: "user", text: textIn }]);
    if (!customText) setInput("");

    if (["oi", "olá", "ola", "salve", "eae", "e aí", "hello", "hey"].includes(userText) && !userName) {
      setWaitingName(true);
      say("Seja cordialmente bem-vindo ao Senatus. Como devo chamá-lo(a)?");
      return;
    }
    if (waitingName && !userName) {
      setUserName(textIn);
      setWaitingName(false);
      say(`Muito prazer, ${textIn}. Em que posso servi-lo(a) hoje? Digite 'menu' para sugestões.`);
      return;
    }
    if (userText === "menu" || userText === "ajuda") {
      showMenu();
      return;
    }

    // 1) tenta seção por "q"
    const sec = sections.find(s => s.q.toLowerCase() === userText);
    if (sec) {
      say(sec.body);
      const delay = typeDelay(sec.body) + 200;
      setTimeout(() => setMessages((prev) => [...prev, { sender: "bot", chips: SUGGESTIONS }]), delay);
      return;
    }

    // 2) busca fuzzy em knowledge
    const result = fuse.search(userText);
    if (result.length > 0) {
      let response = result[0].item.answer;
      if (userName) response = response.replace(/\bVocê\b/gi, `${userName}, você`);
      say(response);

      if (["contato", "reclamar"].some(k => result[0].item.question.includes(k))) {
        const d2 = typeDelay(response) + 200;
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "bot", text: "", contact: true }]);
        }, d2);
      }
      return;
    }

    // 3) resposta completa (se o usuário pedir “sobre…")
    if (["sobre", "senatus", "explicar", "explicacao", "explicação"].some(w => userText.includes(w))) {
      const full = sections.map(s => `• ${s.title}\n${s.body}`).join("\n\n");
      say(full);
      const d3 = typeDelay(full) + 200;
      setTimeout(() => setMessages((prev) => [...prev, { sender: "bot", chips: SUGGESTIONS }]), d3);
      return;
    }

    // 4) fallback
    const fallback =
      `${userName ? userName + "," : ""} não localizei registro específico. ` +
      `Podes escrever novamente com outras palavras, ou escolher uma opção no menu.`;
    say(fallback);
    const d4 = typeDelay(fallback) + 180;
    setTimeout(() => setMessages((prev) => [...prev, { sender: "bot", chips: SUGGESTIONS }]), d4);
  };

  /* ===== Overlay do Guia com busca + acordeão (sincronizado) ===== */
  const [showGuide, setShowGuide] = useState(false);
  const [guideQuery, setGuideQuery] = useState("");
  const [openAcc, setOpenAcc] = useState(() => new Set());

  const filtered = sections.filter(s => {
    if (!guideQuery.trim()) return true;
    const q = guideQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q);
  });
  const toggleAcc = (idx) => {
    setOpenAcc(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") setShowGuide(false); };
    if (showGuide) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [showGuide]);

  const overlayStyles = { position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,.5)", display: showGuide ? "flex" : "none", alignItems: "center", justifyContent: "center", padding: 16 };
  const panelStyles   = { width: "min(900px,95vw)", maxHeight: "85vh", background: "#0e1a2b", borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 60px rgba(0,0,0,.55)", overflow: "hidden", display: "flex", flexDirection: "column" };
  const headerStyles  = { padding: "12px 16px", background: "#0a1524", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 8 };
  const inputStyles   = { flex: 1, background: "#0f2645", color: "#e9f0ff", border: "1px solid rgba(255,255,255,.15)", borderRadius: 10, padding: "8px 10px", outline: "none" };
  const listStyles    = { padding: 12, overflow: "auto", display: "flex", flexDirection: "column", gap: 8 };
  const accHeader     = { width: "100%", textAlign: "left", background: "#16243b", color: "#e9f0ff", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 };
  const accBody       = { background: "#122036", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 12px", color: "#c7d4ee", fontSize: 14, whiteSpace: "pre-line" };
  const subBtnStyles  = { marginTop: 8, background: "gold", color: "#111", border: "none", borderRadius: 8, padding: "6px 10px", fontWeight: 700, cursor: "pointer" };
  const openBtnStyles = { position: "absolute", zIndex: 5, right: 10, top: 10, background: "gold", color: "#111", border: "none", borderRadius: 10, padding: "6px 10px", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 14px rgba(0,0,0,.25)" };
  const closeBtnStyles= { background: "transparent", border: "1px solid rgba(255,255,255,.15)", color: "#dbe6ff", borderRadius: 8, padding: "6px 10px", cursor: "pointer" };

  return (
    <div className="ouvidoria" style={{ position: "relative" }}>
      <button style={openBtnStyles} onClick={() => setShowGuide(true)} aria-haspopup="dialog">Guia rápido</button>

      <div className="ouvidoria__chat" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender} ${msg.typing ? "typing" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
            {msg.sender === "bot" && !msg.typing && msg.text && (
              <img src="/logo.ico" alt="Senatus" width="18" style={{ marginRight: 8, marginBottom: 6 }} />
            )}
            {msg.typing ? <span className="dots"><i></i><i></i><i></i></span> : (msg.text && <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>)}

            {msg.chips && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {msg.chips.map((c, idx) => (
                  <button key={idx} className="contact-btn" onClick={() => handleSend(c.q)} style={{ cursor: "pointer" }}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {msg.contact && (
              <div className="contacts" style={{ marginTop: 8 }}>
                <a href="https://wa.me/5561996941014" target="_blank" rel="noopener noreferrer" className="contact-btn">WhatsApp 61 99694-1014</a>
                <a href="https://wa.me/558188644071" target="_blank" rel="noopener noreferrer" className="contact-btn">WhatsApp 81 88644-071</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ouvidoria__input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem... (ou 'menu')"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={() => handleSend()}>Enviar</button>
      </div>

      {/* Overlay do Guia (sincronizado) */}
      <div
        style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,.5)", display: showGuide ? "flex" : "none", alignItems: "center", justifyContent: "center", padding: 16 }}
        role="dialog"
        aria-modal="true"
        aria-label="Guia Rápido do Senatus"
        onClick={(e) => { if (e.target === e.currentTarget) setShowGuide(false); }}
      >
        <div style={panelStyles}>
          <div style={headerStyles}>
            <strong style={{ color: "#e9f0ff" }}>Guia Rápido — Conhece o caminho</strong>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              <input
                type="text"
                value={guideQuery}
                onChange={(e) => setGuideQuery(e.target.value)}
                placeholder="Buscar seções por título ou conteúdo…"
                style={inputStyles}
                autoFocus
              />
              <button style={closeBtnStyles} onClick={() => setShowGuide(false)}>Fechar (Esc)</button>
            </div>
          </div>

          <div style={listStyles}>
            {filtered.length === 0 && (
              <div style={{ color: "#c7d4ee", opacity: .85 }}>Nada encontrado para “{guideQuery}”.</div>
            )}

            {filtered.map((sec, idx) => {
              const globalIdx = sections.indexOf(sec);
              const opened = openAcc.has(globalIdx);
              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button style={accHeader} aria-expanded={opened} onClick={() => toggleAcc(globalIdx)}>
                    <span>{sec.title}</span>
                    <span style={{ opacity: .8 }}>{opened ? "−" : "+"}</span>
                  </button>

                  {opened && (
                    <div style={accBody}>
                      <div>{sec.body}</div>
                      <button
                        style={subBtnStyles}
                        onClick={() => {
                          setShowGuide(false);
                          setTimeout(() => handleSend(sec.q), 50);
                        }}
                      >
                        Ver no chat
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ouvidoria;
