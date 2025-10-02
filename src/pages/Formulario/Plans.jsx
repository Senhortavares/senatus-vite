import React, { useState } from "react";
import "./chatForm.css";

const ChatForm = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá, qual é seu nome?" }
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({});

  const steps = [
    { key: "nome", text: "Seja bem-vindo ao Senatus, NOME! Qual sua idade?" },
    { key: "idade", text: "Como você acredita que pode contribuir para a comunidade?" },
    { key: "contribuicao", text: "O que deseja aprender e desenvolver dentro da ordem?" },
    { key: "aprendizado", text: "Você se compromete a respeitar todos os irmãos da ordem?" },
    { key: "respeito", text: "Diante de conflitos, você buscará o diálogo e a razão?" },
    { 
      key: "lideres", 
      text: "Você respeitará os líderes, mesmo quando não concordar? (Responda: sim ou não)" 
    },
    { key: "discord", text: "Você tem Discord? (sim/não)" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const currentStep = steps[step];

    // Salva resposta
    setMessages([...messages, { from: "user", text: input }]);
    const updatedData = { ...userData, [currentStep.key]: input };
    setUserData(updatedData);

    // Condição especial: se for a pergunta dos líderes e ele disser "não"
    if (currentStep.key === "lideres" && input.toLowerCase() === "não") {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "⚠️ Infelizmente você não pode entrar no SENATUS, pois não está adequado às nossas regras." }
      ]);
      setInput("");
      return; // encerra o fluxo
    }

    // Se for a última pergunta (Discord)
    if (currentStep.key === "discord") {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Perfeito! Clique no botão abaixo para acessar o nosso Discord:" }
      ]);
      setInput("");
      setStep(step + 1);
      return;
    }

    // Próxima pergunta
    setTimeout(() => {
      let botMsg = steps[step + 1].text;
      if (currentStep.key === "nome") {
        botMsg = `Seja bem-vindo ao Senatus, ${input}! Qual sua idade?`;
      }
      setMessages(msgs => [...msgs, { from: "bot", text: botMsg }]);
      setStep(step + 1);
    }, 500);

    setInput("");
  };

  return (
    <section className="ouvidoria">
      <div className="ouvidoria__chat">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            {msg.from === "bot" && <img src="/logo.ico" alt="Senatus" width="20" style={{ marginRight: "8px" }} />}
            {msg.text}
          </div>
        ))}

        {/* botão do discord só aparece no fim */}
        {step >= steps.length && userData.lideres?.toLowerCase() === "sim" && (
          <div className="final-step">
            <a href="https://discord.gg/56DNkNry7H" target="_blank" rel="noreferrer" className="discord-btn">
              <img src="/logo.ico" alt="Senatus" width="18" style={{ marginRight: "6px" }} />
              Entrar no Discord
            </a>
          </div>
        )}
      </div>

      <div className="ouvidoria__input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua resposta..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          OK<img src="/logo.ico" alt="Senatus" width="20" />
        </button>
      </div>
    </section>
  );
};

export default ChatForm;
