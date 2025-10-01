import './plans.css';
import React, { useState } from 'react';

const Plans = () => {
  const [formData, setFormData] = useState({
    motivo: '', contribuicao: '', aprendizado: '', valores: '',
    respeito: '', lealdade: '', dialogo: '', lideres: '',
    raiva: '', convivio: '', nome: '', idade: '',
    discord: '', celular: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const palavrasOfensivas = [
    "burro", "idiota", "otario", "palavrão", "merda", "vai tomar no cu", 
    "cu", "se fuder", "minha rola", "meu pau", "desgraça", 
    "vagabundo", "filho da puta", "sarrombado"
  ];

  const validateField = (name, value) => {
    const lower = value.toLowerCase();
    if (value.trim() === '') return 'Este campo é obrigatório.';
    if (palavrasOfensivas.some(p => lower.includes(p))) return 'Evite linguagem ofensiva.';
    if (name === 'idade' && parseInt(value, 10) < 15) return 'Idade mínima é 15 anos.';
    if (name === 'celular' && value.length < 10) return 'Número de celular inválido.';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    const errorMsg = validateField(name, value);
    const updatedErrors = { ...errors };
    if (errorMsg) updatedErrors[name] = errorMsg;
    else delete updatedErrors[name];

    setErrors(updatedErrors);
    setIsValid(Object.keys(updatedErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) finalErrors[name] = error;
    });

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      setIsValid(false);
      setFeedback({
        type: "error",
        message: "⚠️ Corrija os campos destacados antes de enviar."
      });
      return;
    }

    const payload = {
      Motivo: formData.motivo,
      Contribuicao: formData.contribuicao,
      Aprendizado: formData.aprendizado,
      Valores: formData.valores,
      Respeito: formData.respeito,
      Lealdade: formData.lealdade,
      Dialogo: formData.dialogo,
      Lideres: formData.lideres,
      Raiva: formData.raiva,
      Convivio: formData.convivio,
      Nome: formData.nome,
      Idade: String(formData.idade),
      Discord: formData.discord,
      Celular: formData.celular,
    };

    try {
      const response = await fetch(
        "https://api.sheetmonkey.io/form/iziVhEVnyfdt4iw9uBMHgd",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const resultText = await response.text();
      console.log("📥 Resposta do servidor:", resultText);

      if (response.ok) {
        setFeedback({
          type: "success",
          message: `🎉 Obrigado, ${formData.nome || "irmão"}! Suas respostas foram registradas com sucesso.`
        });

        setFormData({
          motivo: '', contribuicao: '', aprendizado: '', valores: '',
          respeito: '', lealdade: '', dialogo: '', lideres: '',
          raiva: '', convivio: '', nome: '', idade: '',
          discord: '', celular: ''
        });
        setErrors({});
        setIsValid(false);
      } else {
        setFeedback({
          type: "error",
          message: `⚠️ Erro ao enviar. Status: ${response.status}. Detalhes: ${resultText}`
        });
      }
    } catch (err) {
      console.error("❌ Erro de conexão:", err);
      setFeedback({
        type: "error",
        message: "⚠️ Erro ao conectar com o servidor. Verifique sua internet ou o endpoint."
      });
    }
  };

  const renderField = (label, name, type = 'textarea') => (
    <>
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea name={name} value={formData[name]} onChange={handleChange} />
      ) : (
        <input type={type} name={name} value={formData[name]} onChange={handleChange} />
      )}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </>
  );

  return (
    <section className="formulario">
      <div className="form-container">
        <h1 className="form-title">Formulário de Entrada - SENATUS</h1>
        <form onSubmit={handleSubmit}>
          {renderField("1. O que motivou você a buscar o SENATUS?", "motivo")}
          {renderField("2. Como você acredita que pode contribuir para a comunidade?", "contribuicao")}
          {renderField("3. O que deseja aprender e desenvolver dentro da ordem?", "aprendizado")}
          {renderField("4. Quais valores você considera essenciais em uma irmandade?", "valores")}
          {renderField("5. Você se compromete a respeitar todos os irmãos da ordem?", "respeito")}
          {renderField("6. Está disposto a ser leal às doutrinas do SENATUS?", "lealdade")}
          {renderField("7. Diante de conflitos, você buscará o diálogo e a razão?", "dialogo")}
          {renderField("8. Você respeitará os líderes, mesmo quando não concordar?", "lideres")}
          {renderField("9. Quando sentir raiva, você será capaz de controlar suas ações?", "raiva")}
          {renderField("10. Está disposto a conviver em união e fraternidade, acima das diferenças?", "convivio")}

          <hr />
          <div className="explicacao">
            <p id='PR'>
              <strong>Por que pedimos seu Discord e número?</strong><br />
              Para adicionar você aos grupos e servidores oficiais do SENATUS.
            </p>
          </div>

          {renderField("Nome:", "nome", "text")}
          {renderField("Idade:", "idade", "number")}
          {renderField("Nome no Discord:", "discord", "text")}
          {renderField("Número de celular:", "celular", "text")}

          <button type="submit" disabled={!isValid}>Enviar Formulário</button>
        </form>
      </div>

      {/* MODAL DE FEEDBACK */}
      {feedback && (
        <div className="modal-overlay" onClick={() => setFeedback(null)}>
          <div className={`modal ${feedback.type}`}>
            <h2>{feedback.type === "success" ? "✅ Sucesso" : "❌ Erro"}</h2>
            <p>{feedback.message}</p>
            <button onClick={() => setFeedback(null)}>Fechar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Plans;
