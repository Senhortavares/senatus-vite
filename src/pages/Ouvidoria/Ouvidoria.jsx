import { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import "./ouvidoria.css";

const knowledgeBase = [
  // Fundação e História
  { question: "quem criou o senatus", answer: "O criador é Anderson, Líder Supremo, que fundou a ordem após restaurar os valores de justiça e fraternidade." },
  { question: "quem fundou o senatus", answer: "O Senatus foi fundado por Anderson, ao lado de Sun, Thiago, Levi, Arnold, warlen, Alberto, BiluBilu , após a ruptura com uma comunidade corrompida." },
  { question: "como nasceu o senatus", answer: "Nasceu da ruptura de uma antigo Conselho corrompido. Anderson e seus companheiros fundaram uma nova ordem baseada em justiça, lealdade e participação coletiva." },
  { question: "qual a historia do senatus", answer: "O Senatus surgiu da luta contra a tirania de um sucessor imposto. Anderson e seus aliados ergueram uma nova ordem que cresceu e prosperou como guardiã da justiça." },

  // Hierarquia
  { question: "quem é o lider supremo?", answer: "O Líder Supremo é Anderson, fundador e criador do Senatus." },
  { question: "quem é o segundo lider?", answer: "O Grão-Mestre Arnaud" },
  { question: "quem é o grão mestre?", answer: "O Grão-Mestre é  Arnaud." },
  { question: "quem é os lideres?", answer: "Anderson é o Líder; o Grão-Mestre é Arnaud; Warlen é Engenheiro; Sun é Administradora; Thiago é Juiz; entre outros." },
  { question: "quem é o soberano do conselho?", answer: "O Soberano do Conselho é Tiago Batista." },
  { question: "quem são os conselheiros?", answer: "Os conselheiros do Senatus são todos, Anderson, Sun, Arnold, Bilu, Alberto, Warlen, Arnaud, Tiago." },
  { question: "Quem são os membros que causaram desonra?", answer: "Entre os membros honrados estão Lamonica, Levi e Rash, que participaram da fundação." },

  // Princípios
  { question: "quais são os principios", answer: "Os princípios do Senatus são justiça, lealdade, disciplina, fraternidade e respeito." },
  { question: "quais são os valores", answer: "O Senatus se sustenta em justiça, lealdade, disciplina, fraternidade e respeito mútuo." },
  { question: "qual é a filosofia do senatus", answer: "A filosofia do Senatus ensina que a verdadeira força não nasce da espada, mas floresce na disciplina, na honra e na paz." },
  { question: "o que significa justiça", answer: "Para o Senatus, justiça é a lei maior, guia das ações e proteção contra a hipocrisia." },
  { question: "o que significa fraternidade", answer: "Fraternidade é apoiar uns aos outros como irmãos, com amor, lealdade e dedicação." },
  { question: "o que significa disciplina", answer: "Disciplina é moldar o caráter como o escultor molda o mármore: com paciência, razão e firme propósito." },

  // Juramento
  { question: "qual é o juramento do senatus", answer: "“Pela graça do Senatus, comprometo-me a cultivar a pureza do espírito, a benevolência do coração e a lealdade da alma. Guardarei a justiça como lei maior e caminharei sob a razão, pois nela reside o farol da existência. Pois a verdadeira força não nasce da espada, mas floresce na disciplina, na honra e na paz.”" },

  // Conselho e Organização
  { question: "quem fez parte do conselho", answer: "O Conselho é formado por Anderson, Sun, Tiago Batista, além dos conselheiros Arnold, Bilu, Alberto e João Victor." },
  { question: "o que diferencia o senatus", answer: "O Senatus não nasceu do poder imposto, mas da justiça escolhida. Sua base é a lealdade, a fraternidade e o compromisso coletivo com a verdade." },

  // Contato / Reclamações
  { question: "quero reclamar", answer: "Você pode registrar sua reclamação aqui mesmo na Ouvidoria ou falar diretamente pelos canais de WhatsApp." },
  { question: "como faço para reclamar", answer: "Basta digitar sua reclamação aqui ou entrar em contato diretamente pelos canais de atendimento do Senatus." },
  { question: "como entrar em contato", answer: "Você pode falar diretamente com os responsáveis do Senatus pelos canais abaixo:" }
];


// Configuração do Fuse.js
const fuse = new Fuse(knowledgeBase, {
  keys: ["question"],
  threshold: 0.4
});

const Ouvidoria = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá, eu sou a Ouvidoria do Senatus. Digite 'oi' para começarmos." }
  ]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState(null);
  const [waitingName, setWaitingName] = useState(false);
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userText = input.toLowerCase();
    let response = "";
    let showContact = false;

    // 🔹 Se usuário disser "oi"
    if ((userText === "oi" || userText === "olá") && !userName) {
      response = "Seja bem-vindo ao Senatus! Qual é o seu nome?";
      setWaitingName(true);
    }
    // 🔹 Se estamos esperando o nome
    else if (waitingName && !userName) {
      setUserName(input); // guarda o nome
      response = `Muito prazer, ${input}! Como posso te ajudar hoje?`;
      setWaitingName(false);
    }
    // 🔹 Caso normal (usa Fuse.js)
    else {
      const result = fuse.search(userText);
      response =
        result.length > 0
          ? result[0].item.answer
          : `${userName ? userName + "," : ""} não encontrei nada nos registros do Senatus. Se preferir, entre em contato diretamente:`;

      if (response.includes("contato") || response.includes("❌")) {
        showContact = true;
      }

      // Personaliza com nome, se já tiver
      if (userName) {
        response = response.replace("Você", `${userName}, você`);
      }
    }

    const botMessage = { sender: "bot", text: response, contact: showContact };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  // Auto-scroll sempre para última mensagem
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ouvidoria">
      <div className="ouvidoria__chat" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.contact && (
              <div className="contacts">
                <a
                  href="https://wa.me/5561996941014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                >
                  WhatsApp 61 99694-1014
                </a>
                <a
                  href="https://wa.me/558188644071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                >
                  WhatsApp 81 88644-071
                </a>
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
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default Ouvidoria;
