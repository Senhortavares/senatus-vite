import React, { useState, useEffect, useRef } from "react";
import "./chatForm.css";

const ChatForm = () => {
  // Endpoint do Sheet Monkey (já configurado)
  const SHEET_MONKEY_URL = "https://api.sheetmonkey.io/form/7JtARpRBnxbt7pRuZFMr6G";

  // Links dos convites:
  const LINK_WHATS = "https://chat.whatsapp.com/H2wOxqH5LJD51wo7GgVcog"; // seu grupo WhatsApp
  const LINK_DISCORD = "https://discord.gg/SEU_SERVIDOR";                 // seu servidor Discord

  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá, Tudo bem! para começarmos, informe seu nome completo (nome e sobrenome)." }
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(""); // mensagem de validação

  // Ref para auto-scroll do chat
  const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  // ========= Validações / Máscaras =========
  const isFullName = (v = "") => {
    const parts = v.trim().split(/\s+/);
    return parts.length >= 2 && parts.every(p => p.length >= 2);
  };

  const onlyDigits = (v = "") => v.replace(/\D/g, "");

  // BR: 11 dígitos (DDD + 9 + número) ou 13 com “55” na frente
  const isValidBRPhone = (v = "") => {
    const d = onlyDigits(v);
    if (d.startsWith("55")) return d.length === 13;
    return d.length === 11;
  };

  const formatBRPhone = (v = "") => {
    let d = onlyDigits(v);
    if (d.startsWith("55")) d = d.slice(2);     // remove código do país para exibir local
    if (d.length > 11) d = d.slice(0, 11);      // limita ao tamanho local

    const dd = d.slice(0, 2);
    const p1 = d.slice(2, 3);                   // geralmente o 9
    const p2 = d.slice(3, 7);                   // primeiros 4 do número
    const p3 = d.slice(7, 11);                  // últimos 4

    if (!dd) return d;

    let out = `(${dd}`;
    if (d.length >= 2) out += `) `;
    if (d.length >= 3) out += `${p1}`;
    if (d.length >= 4) out += ` ${p2}`;
    if (d.length >= 8) out += `-${p3}`;
    return out.trim();
  };

  const isValidEmail = (v = "") => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  const normalizeYesNo = (v = "") => {
    const t = v.trim().toLowerCase();
    const yes = ["sim", "s", "claro", "ok", "okay", "affirmativo", "afirmativo", "yes", "y"];
    const no  = ["nao", "não", "n", "negativo", "no"];
    if (yes.includes(t)) return "sim";
    if (no.includes(t))  return "não";
    return t;
  };

  // Sanitiza e-mail durante digitação: remove espaços e caracteres inválidos, limita a 1 "@"
  const sanitizeEmailInput = (v = "") => {
    let s = v.replace(/\s+/g, "");
    s = s.replace(/[^a-zA-Z0-9._%+\-@]/g, "");
    const parts = s.split("@");
    if (parts.length > 2) {
      s = parts[0] + "@" + parts.slice(1).join("").replace(/@/g, "");
    }
    return s;
  };

  // ========= Texto formal (revisado) =========
  const TEXTO_FORMAL =
    "Importante: utilize sempre o português formal em todas as interações. As figurinhas oficiais do Senatus " +
    "estão disponíveis na página Imagens. Na página Inicial (Home) você encontrará informações sobre os líderes " +
    "e em breve disponibilizaremos mensagens deles ao final da página para consulta. Em Avisos publicaremos todas " +
    "as novidades: atualizações, história do Senatus, novas leis e orientações claras sobre o que é permitido " +
    "ou não. A Ouvidoria está ativa (ainda em desenvolvimento): você pode enviar mensagens pelos números informados " +
    ". Sempre que houver mudanças, avisaremos para que consulte o site; quando preferir, você também pode " +
    "acessar por conta própria para tirar dúvidas.";

  // ========= Etapas =========
  // 0 nome → 1 whats → 2 whatsConfirm → 3 discordName → 4 consentEmail → (5 email se sim) →
  // 6 intro → 7 cidade → 8 objetivo → 9 origem → 10 conhece → 11 lideres → 12 calma → 13 aviso → 14 preferencia
  const steps = [
    { key: "nome",           text: "Perfeito, NOME. Agora, informe seu número de WhatsApp (com DDD)." },
    { key: "whats",          text: "Repita o número do WhatsApp para confirmarmos." },
    { key: "whatsConfirm",   text: "Qual é o seu nome no Discord?" },
    { key: "discord",        text: "Você autoriza informar um e-mail para contato? (responda: sim ou não)" },
    { key: "email",          text: "Informe seu e-mail, por favor." }, // condicional
    { key: "intro",          text: "Seja bem-vindo ao Senatus, NOME! Faremos uma breve entrevista para te conhecer melhor. Ao final, você poderá escolher entrar no grupo do WhatsApp ou no servidor do Discord." },
    { key: "cidade",         text: "Qual cidade você é?" },
    { key: "objetivo",       text: "Qual é o seu objetivo no Senatus?" },
    { key: "origem",         text: "Onde você conheceu o Senatus?" },
    { key: "conhece",        text: "Você já sabe algo sobre o Senatus? Se sim, o que?" },
    { key: "lideres",        text: "Você respeitará os líderes, mesmo quando não concordar? (Responda: sim ou não)" },
    { key: "calma",          text: "Se ouvir discussão, manterá a calma e conversará de forma formal? (Responda: sim ou não)" },
    { key: "aviso",          text: "AVISO_FORMAL" },
    { key: "preferencia",    text: "Você prefere entrar no WhatsApp ou no Discord?" }
  ];

  // ====== Util: delay e “digitando…” ======
  const typeDelay = (text = "") => {
    // delay proporcional ao tamanho do texto (entre 350ms e 1200ms)
    const base = 350;
    const extra = Math.min(850, Math.floor(text.length * 10));
    return base + extra;
  };

  // Mostra bolinhas de "digitando..." e depois substitui pela resposta
  const say = (text) => {
    // 1) adiciona mensagem temporária com typing
    setMessages((msgs) => [...msgs, { from: "bot", typing: true }]);
    // 2) após delay, remove typing e coloca a resposta real
    const delay = typeDelay(text);
    setTimeout(() => {
      setMessages((msgs) => {
        const copy = [...msgs];
        // remove a última se for typing
        if (copy[copy.length - 1]?.typing) copy.pop();
        return [...copy, { from: "bot", text }];
      });
    }, delay);
  };

  // ====== Envio ao Sheet Monkey ======
  async function submitToSheet(finalData) {
    if (!SHEET_MONKEY_URL) return; // só envia se o endpoint estiver configurado
    try {
      const res = await fetch(SHEET_MONKEY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          NomeCompleto:     finalData.nome || "",
          WhatsApp:         finalData.whats || "",
          DiscordName:      finalData.discord || "",
          ConsentEmail:     finalData.consentEmail || "",
          Email:            finalData.email || "",
          Cidade:           finalData.cidade || "",
          Objetivo:         finalData.objetivo || "",
          Origem:           finalData.origem || "",
          ConheceSenatus:   finalData.conhece || "",
          RespeitarLideres: finalData.lideres || "",
          ManterCalma:      finalData.calma || "",
          PreferenciaGrupo: finalData.preferencia || "",
          Timestamp:        new Date().toISOString()
        })
      });
      if (res.ok) {
        setMessages(m => [...m, { from: "meta", text: "Seus dados foram registrados." }]);
      } else {
        setMessages(m => [...m, { from: "meta", text: "Não foi possível salvar agora." }]);
      }
    } catch {
      setMessages(m => [...m, { from: "meta", text: "Não foi possível salvar agora." }]);
    }
  }

  // ====== Util ======
  const ask = (text) => say(text); // agora ask usa “digitando…”

  // onChange com máscara de telefone e sanitização de e-mail
  const handleChange = (e) => {
    let val = e.target.value;
    setError("");

    const currentKey = steps[step]?.key;
    if (currentKey === "whats" || currentKey === "whatsConfirm") {
      setInput(formatBRPhone(val));
      return;
    }

    if (currentKey === "email" && userData.consentEmail === "sim") {
      setInput(sanitizeEmailInput(val));
      return;
    }

    setInput(val);
  };

  const handleSend = () => {
    const valRaw = input.trim();
    if (!valRaw) return;

    setError(""); // limpa erro anterior
    const s = steps[step];

    // pinta a resposta
    setMessages([...messages, { from: "user", text: valRaw }]);

    // === Regras por etapa ===
    if (s?.key === "nome") {
      if (!isFullName(valRaw)) {
        say("Por favor, informe seu nome completo (nome e sobrenome).");
        setError("Informe nome e sobrenome.");
        setInput("");
        return;
      }
      setUserData(d => ({ ...d, nome: valRaw }));
      ask(steps[step].text.replace(/NOME/gi, valRaw.split(" ")[0]));
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "whats") {
      if (!isValidBRPhone(valRaw)) {
        say("Número inválido. Envie novamente com DDD (ex.: (31) 9 1234-5678).");
        setError("Número inválido. Use DDD + 9 + número (11 dígitos).");
        return;
      }
      setUserData(d => ({ ...d, whats: onlyDigits(valRaw) }));
      ask(steps[step].text); // "Repita o número..."
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "whatsConfirm") {
      const again = onlyDigits(valRaw);
      if (again !== (userData.whats || "")) {
        say("Os números não coincidem. Digite novamente o seu WhatsApp (com DDD).");
        setError("Números diferentes. Confirme o mesmo número enviado antes.");
        setStep(step - 1);
        setInput("");
        return;
      }
      ask(steps[step].text); // "Qual é o seu nome no Discord?"
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "discord") {
      if (valRaw.length < 2) {
        say("Informe um nome de Discord válido.");
        setError("Nome do Discord muito curto.");
        return;
      }
      setUserData(d => ({ ...d, discord: valRaw }));
      // pergunta consentimento
      ask("Você autoriza informar um e-mail para contato? (responda: sim ou não)");
      setStep(step + 1); // vai para “email” (consentimento primeiro)
      setInput("");
      return;
    }

    if (s?.key === "email") {
      // Primeiro input desta etapa é o consentimento
      if (userData.consentEmail == null) {
        const consent = normalizeYesNo(valRaw);
        setUserData(d => ({ ...d, consentEmail: consent }));
        if (consent === "sim") {
          ask("Informe seu e-mail, por favor.");
        } else {
          const nome = (userData.nome || "").split(" ")[0] || "amigo(a)";
          ask(steps[5].text.replace(/NOME/gi, nome)); // intro
          setStep(6); // pula para cidade
        }
        setInput("");
        return;
      }
      // Já temos consentimento=sim → validar e-mail
      if (!isValidEmail(valRaw)) {
        say("E-mail inválido. Tente novamente.");
        setError("E-mail inválido. Ex.: nome@dominio.com");
        return;
      }
      setUserData(d => ({ ...d, email: valRaw }));
      const nome = (userData.nome || "").split(" ")[0] || "amigo";
      ask(steps[5].text.replace(/NOME/gi, nome)); // intro
      setStep(6); // cidade
      setInput("");
      return;
    }

    if (s?.key === "intro") {
      const nome = (userData.nome || "").split(" ")[0] || "amigo(a)";
      ask(steps[step].text.replace(/NOME/gi, nome));
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "cidade") {
      setUserData(d => ({ ...d, cidade: valRaw }));
      ask(steps[step + 1].text);
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "objetivo") {
      setUserData(d => ({ ...d, objetivo: valRaw }));
      ask(steps[step + 1].text);
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "origem") {
      setUserData(d => ({ ...d, origem: valRaw }));
      ask(steps[step + 1].text);
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "conhece") {
      setUserData(d => ({ ...d, conhece: valRaw }));
      ask(steps[step + 1].text);
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "lideres") {
      const ans = normalizeYesNo(valRaw);
      if (ans === "não") {
        setUserData(d => ({ ...d, lideres: ans }));
        say("⚠️ Infelizmente você não pode entrar no SENATUS, pois não está adequado às nossas regras.");
        setInput("");
        setStep(steps.length); // encerra
        return;
      }
      setUserData(d => ({ ...d, lideres: ans }));
      ask(steps[step + 1].text);
      setStep(step + 1);
      setInput("");
      return;
    }

    if (s?.key === "calma") {
      const ans = normalizeYesNo(valRaw);
      setUserData(d => ({ ...d, calma: ans }));
      // mostrar aviso formal, depois a preferência
      say(TEXTO_FORMAL);
      setStep(step + 1); // “aviso”
      setTimeout(() => {
        ask(steps[step + 2].text);
        setStep(step + 2); // preferência
      }, typeDelay(TEXTO_FORMAL) + 220);
      setInput("");
      return;
    }

    if (s?.key === "preferencia") {
      const pref = valRaw.toLowerCase();
      const finalData = { ...userData };
      let linkMsg;

      if (pref.includes("whats")) {
        finalData.preferencia = "WhatsApp";
        linkMsg = `Perfeito! Clique no botão abaixo para acessar o nosso WhatsApp:\n${LINK_WHATS}`;
      } else {
        finalData.preferencia = "Discord";
        linkMsg = `Perfeito! Clique no botão abaixo para acessar o nosso Discord:\n${LINK_DISCORD}`;
      }

      setUserData(finalData);
      say(linkMsg);
      submitToSheet(finalData); // envia para o Sheet Monkey

      setInput("");
      setStep(step + 1); // fim
      return;
    }

    setInput("");
  };

  // placeholder dinâmico ajuda o usuário no momento do telefone / e-mail
  const currentKey = steps[step]?.key;
  const placeholder =
    currentKey === "whats" || currentKey === "whatsConfirm"
      ? "(31) 9 1234-5678"
      : (currentKey === "email" && userData.consentEmail === "sim")
        ? "nome@dominio.com"
        : "Digite sua resposta...";

  return (
    <section className="ouvidoria">
      <div className="ouvidoria__chat" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from} ${msg.typing ? "typing" : ""}`}>
            {msg.from === "bot" && !msg.typing && (
              <img src="/logo.ico" alt="Senatus" width="20" style={{ marginRight: "8px" }} />
            )}
            {msg.typing ? (
              <span className="dots"><i></i><i></i><i></i></span>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Ação final opcional (reforço visual) */}
        {step > steps.length - 1 && userData.preferencia === "Discord" && (
          <div className="final-step">
            <a href={LINK_DISCORD} target="_blank" rel="noreferrer" className="discord-btn">
              <img src="/logo.ico" alt="Senatus" width="18" style={{ marginRight: "6px" }} />
              Entrar no Discord
            </a>
          </div>
        )}

        {step > steps.length - 1 && userData.preferencia === "WhatsApp" && (
          <div className="final-step">
            <a href={LINK_WHATS} target="_blank" rel="noreferrer" className="discord-btn">
              <img src="/logo.ico" alt="Senatus" width="18" style={{ marginRight: "6px" }} />
              Entrar no WhatsApp
            </a>
          </div>
        )}
      </div>

      <div className="ouvidoria__input">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          OK<img src="/logo.ico" alt="Senatus" width="20" />
        </button>
      </div>

      {error && (
        <div className="input-error" aria-live="polite">
          {error}
        </div>
      )}
    </section>
  );
};

export default ChatForm;
