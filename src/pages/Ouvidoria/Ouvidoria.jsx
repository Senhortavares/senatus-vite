import { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import "./ouvidoria.css";

/* =========================================================
   LEIS DO SENATUS — conteúdo oficial (Preâmbulo + Títulos I–XVIII)
   - Estrutura: agrupadas por Título; renderizamos uma lista “achatada”
   - O filtro instantâneo suporta: "art 18", "artigo 18", "18", termos etc.
========================================================= */
const LAWS_DATA = [
  {
    group: "🏛 Preâmbulo",
    items: [
      {
        num: null,
        text:
          "Pela graça do SENATUS, instituição sagrada que vela pela ordem dos homens, comprometo-me a cultivar a pureza do espírito, a benevolência do coração e a lealdade da alma. Guardarei com reverência a lei da justiça, sendo servo da verdade e amigo dos que caminham sob o mesmo sol. Formarei meu caráter como o escultor molda o mármore: com paciência, razão e firme propósito. Seguirei o caminho da razão, pois nela reside o farol que guia os navegantes da existência. Agirei com respeito, pois todo homem é reflexo do divino, e recordarei que a verdadeira força não se impõe pela espada, mas floresce na disciplina, na honra e na paz — virtudes que sustentam o cosmos e elevam o homem à sua melhor versão."
      }
    ]
  },
  {
    group: " Título I – Da Palavra Honrosa",
    items: [
      { num: 1, text: "Todos os membros devem zelar pela honra de suas palavras, utilizando a linguagem como instrumento de edificação, respeito e verdade." },
      { num: 2, text: "É vedado o uso de palavras que promovam desordem, vaidade excessiva ou humilhação." }
    ]
  },
  {
    group: " Título II – Da Escuta Sábia",
    items: [
      { num: 3, text: "Antes de emitir opinião, o membro deverá ouvir atentamente os demais, reconhecendo que a sabedoria muitas vezes se manifesta no silêncio." },
      { num: 4, text: "O silêncio reflexivo será valorizado como prática de respeito e maturidade comunicativa." }
    ]
  },
  {
    group: " Título III – Da Igualdade de Dignidade",
    items: [
      { num: 5, text: "Todos os membros possuem igual valor e dignidade, independentemente de suas funções, experiências ou estilos de expressão." },
      { num: 6, text: "É proibida qualquer forma de hierarquização que diminua ou silencie a voz de outro membro." }
    ]
  },
  {
    group: " Título IV – Da Prudência",
    items: [
      { num: 7, text: "As decisões e conselhos emitidos deverão buscar o equilíbrio entre razão e sentimento, evitando precipitações." },
      { num: 8, text: "A prudência será critério orientador para ações que envolvam conflitos, orientações ou mudanças significativas." }
    ]
  },
  {
    group: " Título V – Do Auxílio Mútuo",
    items: [
      { num: 9, text: "Cada membro será considerado guardião do outro, devendo prestar auxílio sempre que alguém demonstrar fragilidade ou dúvida." },
      { num: 10, text: "O auxílio deverá ser prestado com empatia, discrição e sem julgamento." }
    ]
  },
  {
    group: " Título VI – Do Silêncio Oportuno",
    items: [
      { num: 11, text: "Quando as palavras não contribuírem para o bem comum, para a verdade ou para a paz, o silêncio deverá prevalecer." },
      { num: 12, text: "O silêncio será reconhecido como ato de sabedoria e não como omissão." }
    ]
  },
  {
    group: " Título VII – Da Urbanidade Digital",
    items: [
      { num: 13, text: "Nos espaços digitais, deverá ser adotada linguagem formal, respeitosa e conduta nobre." },
      { num: 14, text: "O uso de figurinhas, imagens e demais recursos visuais deverá seguir o padrão oficial estabelecido pela comunidade." }
    ]
  },
  {
    group: " Título VIII – Do Conflito Justo",
    items: [
      { num: 15, text: "Em situações de divergência, os membros deverão buscar mediação, provas e argumentos racionais, evitando qualquer forma de ofensa pessoal." },
      { num: 16, text: "O conflito será tratado como oportunidade de crescimento, desde que conduzido com justiça, respeito e escuta ativa." }
    ]
  },
  {
    group: " Título IX – Da Justiça com Clemência",
    items: [
      { num: 17, text: "A justiça deve ser exercida com firmeza e compaixão, buscando restaurar o equilíbrio sem alimentar vingança." },
      { num: 18, text: "Toda correção deve visar o crescimento do indivíduo e da comunidade, sendo vedada a punição que humilhe ou exclua sem diálogo." }
    ]
  },
  {
    group: " Título X – Da Disciplina com Humanidade",
    items: [
      { num: 19, text: "A disciplina será praticada como caminho de elevação moral, e não como instrumento de controle." },
      { num: 20, text: "O erro será tratado com orientação e paciência, reconhecendo que todo homem está em processo de lapidação." }
    ]
  },
  {
    group: " Título XI – Da Fraternidade com Compostura",
    items: [
      { num: 21, text: "A fraternidade deve ser expressa com respeito, sobriedade e zelo pela ordem." },
      { num: 22, text: "É vedado o excesso de intimidade que comprometa a compostura ou confunda amizade com favoritismo." }
    ]
  },
  {
    group: " Título XII – Da Liderança como Serviço",
    items: [
      { num: 23, text: "Todo cargo ou função será considerado serviço à comunidade, e não privilégio pessoal." },
      { num: 24, text: "O líder deverá ouvir antes de decidir, servir antes de exigir, e agir com equilíbrio entre razão e sentimento." }
    ]
  },
  {
    group: " Título XIII – Da Lealdade à Verdade",
    items: [
      { num: 25, text: "Os membros devem cultivar a lealdade à verdade, mesmo quando esta for desconfortável." },
      { num: 26, text: "É proibido ocultar fatos relevantes, manipular informações ou distorcer relatos para benefício próprio ou de terceiros." }
    ]
  },
  {
    group: " Título XIV – Da Honra na Discordância",
    items: [
      { num: 27, text: "Toda discordância será tratada com honra, evitando sarcasmo, desdém ou qualquer forma de humilhação." },
      { num: 28, text: "O debate será incentivado como ferramenta de crescimento, desde que guiado pela razão e pela cortesia." }
    ]
  },
  {
    group: " Título XV – Da Fidelidade à Missão",
    items: [
      { num: 29, text: "Os membros devem manter fidelidade aos princípios fundadores da comunidade, mesmo diante de provações ou tentações externas." },
      { num: 30, text: "A deserção por ambição ou vaidade será considerada quebra de confiança, sujeita à avaliação do Conselho." }
    ]
  },
  {
    group: " Título XVI – Da Reverência à História",
    items: [
      { num: 31, text: "A história do SENATUS será preservada com reverência, reconhecendo os feitos, os erros e os aprendizados dos que vieram antes." },
      { num: 32, text: "É dever de cada membro conhecer os fundamentos da comunidade, respeitar seus símbolos e honrar seus fundadores." }
    ]
  },
  {
    group: " Título XVII – Da Pureza do Espírito",
    items: [
      { num: 33, text: "O SENATUS valoriza a pureza do espírito como virtude essencial, manifestada em intenções nobres e condutas íntegras." },
      { num: 34, text: "É vedado o uso da comunidade para fins egoístas, manipulações emocionais ou busca de poder pessoal." }
    ]
  },
  {
    group: " Título XVIII – Da Paz como Força",
    items: [
      { num: 35, text: "A verdadeira força reside na paz, na disciplina e na honra, e não na imposição ou intimidação." },
      { num: 36, text: "Toda ação deverá buscar a pacificação dos ânimos, a elevação do caráter e a preservação da unidade." }
    ]
  }
];

/* Convertemos em lista “achatada”: cada item já sabe seu título/título-grupo */
const LAWS_FLAT = LAWS_DATA.flatMap(({ group, items }) =>
  items.map((it) => ({
    group,
    num: it.num, // null para preâmbulo
    title: it.num ? `Art. ${it.num}º` : "Preâmbulo",
    fullTitle: it.num ? `${group} — Art. ${it.num}º` : group,
    text: it.text
  }))
);

/* ============================ FALLBACKS EXISTENTES ============================ */
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

/* ============================ CONFIG/CACHE ============================ */
const GUIDE_URL = "/guide.json";
const CACHE_KEY = "senatus_guide_cache_v1";
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 min

function getCachedGuide() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (!savedAt || !data) return null;
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch { return null; }
}
function setCachedGuide(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data })); } catch {}
}

/* ============================ Utils de busca/normalização ============================ */
const normalize = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos

// Extrai número de artigo do texto (ex.: "art 18", "artigo 18" -> 18)
const extractArticleNumber = (q) => {
  const m = normalize(q).match(/\b(?:art|artigo)\s*(\d+)\b/) || normalize(q).match(/\b(\d+)\b/);
  return m ? Number(m[1]) : null;
};

/* ============================ COMPONENTE ============================ */
const Ouvidoria = () => {
  /* ===== Estado dinâmico para sections/knowledge & fuse ===== */
  const [sections, setSections] = useState(FALLBACK_SECTIONS);
  const [knowledge, setKnowledge] = useState(FALLBACK_KNOWLEDGE);
  const [fuse, setFuse] = useState(() => new Fuse(FALLBACK_KNOWLEDGE, { keys: ["question"], threshold: 0.34 }));

  /* ===== Carrega JSON do Guia (com cache + fallback) ===== */
  useEffect(() => {
    let cancelled = false;
    async function loadGuide() {
      const cached = getCachedGuide();
      if (cached && !cancelled) {
        if (Array.isArray(cached.sections)) setSections(cached.sections);
        if (Array.isArray(cached.knowledge)) {
          setKnowledge(cached.knowledge);
          setFuse(new Fuse(cached.knowledge, { keys: ["question"], threshold: 0.34 }));
        }
        return;
      }
      try {
        const res = await fetch(GUIDE_URL, { cache: "no-cache" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.sections) && data.sections.length) setSections(data.sections);
        if (Array.isArray(data.knowledge) && data.knowledge.length) {
          setKnowledge(data.knowledge);
          setFuse(new Fuse(data.knowledge, { keys: ["question"], threshold: 0.34 }));
        }
        setCachedGuide({ sections: data.sections || FALLBACK_SECTIONS, knowledge: data.knowledge || FALLBACK_KNOWLEDGE });
      } catch (e) { /* fallback silencioso */ }
    }
    loadGuide();
    return () => { cancelled = true; };
  }, []);

  /* ===== Chat ===== */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ouvidoria_msgs");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "bot", text: "Saudações. Sou a Ouvidoria do Senatus. Digite 'oi' para iniciarmos, 'menu' para sugestões, ou 'leis' para consultar os artigos." }];
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

  /* ====== Painel LEIS ====== */
  const [showLaws, setShowLaws] = useState(false);
  const [lawsQuery, setLawsQuery] = useState("");

  // Filtro rápido: por número do artigo OU por termos no título/grupo/texto
  const filteredLaws = (() => {
    const q = lawsQuery.trim();
    if (!q) return LAWS_FLAT;

    const nq = normalize(q);
    const targetNum = extractArticleNumber(q);

    // Tokeniza para AND simples (todas as palavras devem existir)
    const tokens = nq.split(/\s+/).filter(Boolean);

    return LAWS_FLAT.filter((item) => {
      if (targetNum && item.num === targetNum) return true; // bateu número

      const hay = normalize(`${item.fullTitle} ${item.text}`);
      return tokens.every(t => hay.includes(t));
    });
  })();

  const highlight = (text, q) => {
    if (!q.trim()) return text;
    const nq = normalize(q);
    const tokens = [...new Set(nq.split(/\s+/).filter(Boolean))];
    if (!tokens.length) return text;
    // marca cada token simples (sem quebrar acentos visualmente)
    let out = text;
    tokens.forEach(tok => {
      const re = new RegExp(`(${tok})`, "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  };

  /* ====== Guia Rápido (já existente) ====== */
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
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setShowGuide(false);
        setShowLaws(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  /* ===== Envio do chat ===== */
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

    // Abrir painel de leis via chat
    if (userText === "leis" || userText.startsWith("art")) {
      setShowLaws(true);
      // se escreveu algo como “artigo 18”, já preenche a busca
      const n = extractArticleNumber(userText);
      if (n) setLawsQuery(String(n));
      say("Abrindo o compêndio de Leis. Use o campo de busca para filtrar (ex.: Artigo 18).");
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

    // 3) resposta completa
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

  /* ====== estilos inline usados nos painéis ====== */
  const panelStyles   = { width: "min(980px,95vw)", maxHeight: "85vh", background: "#0e1a2b", borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 60px rgba(0,0,0,.55)", overflow: "hidden", display: "flex", flexDirection: "column" };
  const headerStyles  = { padding: "12px 16px", background: "#0a1524", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 8 };
  const inputStyles   = { flex: 1, background: "#0f2645", color: "#e9f0ff", border: "1px solid rgba(255,255,255,.15)", borderRadius: 10, padding: "8px 10px", outline: "none" };
  const listStyles    = { padding: 12, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 };
  const accHeader     = { width: "100%", textAlign: "left", background: "#16243b", color: "#e9f0ff", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 };
  const accBody       = { background: "#122036", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 12px", color: "#c7d4ee", fontSize: 14, whiteSpace: "pre-line" };
  const subBtnStyles  = { marginTop: 8, background: "gold", color: "#111", border: "none", borderRadius: 8, padding: "6px 10px", fontWeight: 700, cursor: "pointer" };
  const openBtnStyles = { position: "absolute", zIndex: 5, right: 10, top: 10, background: "gold", color: "#111", border: "none", borderRadius: 10, padding: "6px 10px", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 14px rgba(0,0,0,.25)" };
  const openLawsBtn   = { position: "absolute", zIndex: 5, right: 120, top: 10, background: "#e0c15a", color: "#111", border: "none", borderRadius: 10, padding: "6px 10px", fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 14px rgba(0,0,0,.25)" };
  const closeBtnStyles= { background: "transparent", border: "1px solid rgba(255,255,255,.15)", color: "#dbe6ff", borderRadius: 8, padding: "6px 10px", cursor: "pointer" };

  return (
    <div className="ouvidoria" style={{ position: "relative" }}>
      {/* Botões flutuantes */}
      <button style={openLawsBtn} onClick={() => setShowLaws(true)} aria-haspopup="dialog">Leis</button>
      <button style={openBtnStyles} onClick={() => setShowGuide(true)} aria-haspopup="dialog">Guia rápido</button>

      {/* Chat */}
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
          placeholder="Digite sua mensagem... (ou 'menu' / 'leis')"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={() => handleSend()}>Enviar</button>
      </div>

      {/* ===== Overlay: GUIA RÁPIDO ===== */}
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

      {/* ===== Overlay: LEIS ===== */}
      <div
        style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.55)", display: showLaws ? "flex" : "none", alignItems: "center", justifyContent: "center", padding: 16 }}
        role="dialog"
        aria-modal="true"
        aria-label="Leis do Senatus"
        onClick={(e) => { if (e.target === e.currentTarget) setShowLaws(false); }}
      >
        <div style={panelStyles}>
          <div style={headerStyles}>
            <strong style={{ color: "#e9f0ff" }}>Leis do Senatus — Compêndio</strong>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              <input
                type="text"
                value={lawsQuery}
                onChange={(e) => setLawsQuery(e.target.value)}
                placeholder='Busque por "Artigo 18" ou termos (ex.: prudência, honra)…'
                style={inputStyles}
                autoFocus
                aria-label="Campo de busca das Leis"
              />
              <button style={closeBtnStyles} onClick={() => setShowLaws(false)}>Fechar (Esc)</button>
            </div>
          </div>

          <div style={listStyles}>
            {filteredLaws.length === 0 && (
              <div style={{ color: "#c7d4ee", opacity: .85 }}>
                Nenhuma lei encontrada para “{lawsQuery}”.
              </div>
            )}

            {filteredLaws.map((it, idx) => (
              <div
                key={`${it.num ?? "preambulo"}-${idx}`}
                style={{
                  background: "#122036",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  padding: 12,
                  color: "#e9f0ff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6
                }}
                data-art={it.num ?? ""}
                data-titulo={it.fullTitle}
              >
                <div style={{ fontWeight: 800, color: "#e0c15a" }}>
                  {it.fullTitle}
                </div>
                {it.num && <div style={{ fontWeight: 700 }}>Art. {it.num}º</div>}
                <div
                  style={{ color: "#c7d4ee", lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: highlight(it.text, lawsQuery) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ouvidoria;
