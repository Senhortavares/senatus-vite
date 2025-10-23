import React, { useEffect, useRef } from "react";
import "./About.css";

const About = () => {
  const historiaRef = useRef(null);

  /* Revelar ao rolar (fade/slide-in) */
  useEffect(() => {
    const els = document.querySelectorAll(".about p, .about li, .about h2");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="about">
      {/* Guichê */}
      <nav className="about-dock">
        <div className="dock-inner">
          <button onClick={() => scrollTo("historia")}>História</button>
          <button onClick={() => scrollTo("explicacao")}>Explicação</button>
          <button onClick={() => scrollTo("leis")}>Leis</button>
          <button onClick={() => scrollTo("convivio")}>Convívio & Fé</button>
          <div className="lang-toggle">
            <span className="lang-legend">✔️ Português</span>
          </div>
        </div>
      </nav>

      <div className="about-container">
        <h1 className="about-title">A Origem do SENATUS</h1>

        {/* ===== HISTÓRIA (PT definitivo) ===== */}
        <section id="historia" ref={historiaRef} className="centered-section">
          <h2>História</h2>

          <p>
            Nos tempos em que a harmonia se confundia com ilusão e os homens buscavam na comunidade um refúgio de
            crescimento e virtude, levantou-se Anderson, cujo espírito inquieto ansiava por justiça e ordem. Ele era
            parte de uma irmandade dedicada ao autoconhecimento, à colaboração e à elevação do espírito. Porém, como
            tantas vezes ocorre na história dos homens, a serenidade foi quebrada.
          </p>

          <p>
            O guia daquela comunidade renunciou à sua função e, ao invés de abrir caminhos para a escolha justa e
            democrática, impôs um sucessor. Mas este novo condutor revelou-se inclinado à hipocrisia, à injustiça e à
            falta de princípios. Assim, onde deveria haver união, germinaram o descontentamento e a discórdia.
          </p>

          <p>
            Vendo a degradação dos valores, Anderson tomou para si a tarefa de restaurar a justiça. Criou, dentro da
            antiga comunidade, um círculo de homens comprometidos com leis, princípios e equidade. Por três dias lutaram
            por um governo mais claro e participativo, até que, de forma arbitrária e injusta, foram silenciados pelos
            que temiam a luz da razão.
          </p>

          <p>
            Não obstante, Anderson não se deixou tombar. Reuniu ao seu lado companheiros de fé e convicção, Lamonica,
            Levi, Arnold e Rash e com eles ergueu as primeiras colunas de uma nova comunidade, fundada sobre a justiça,
            a transparência e a participação coletiva. Assim germinava aquilo que viria a ser conhecido como "O
            Conselho".
          </p>

          <p>
            O Conselho cresceu e prosperou, reunindo multidões que chegaram a somar mais de duzentos e cinquenta
            membros. Mas, como na marcha de todo destino humano, vieram também as provações. Lamonica e Levi
            afastaram-se do caminho, e um antigo amigo, dominado pela ambição, tentou erguer para si uma nova
            comunidade, desviando membros e corrompendo laços de confiança.
          </p>

          <p>
            Diante disso, Anderson novamente se firmou. Reuniu os fiéis: Sun, Tiago Batista, Arnold, Warlen, Bilu e
            Alberto, além de outros que, por circunstâncias diversas, também marcaram presença, como João Victor, cuja
            mão diligente ajudou a erguer a organização no espaço digital. E assim também se enfrentaram as infiltrações,
            expulsando os que, como Santos, traziam a desordem.
          </p>

          <p>
            Foi desse labor e dessas provas que nasceu oficialmente o SENATUS: não como obra de um só, mas como fruto da
            confiança, da fraternidade e da perseverança de muitos. Estruturado em princípios claros, erguido sobre a
            justiça e a lealdade, o SENATUS tornou-se um espaço de verdadeira comunhão. Seus fundadores dedicaram dias e
            noites à construção de sua identidade, à criação de regras e à firme organização de sua casa.
          </p>

          <p className="about-highlight">
            Pela graça do Senatus, instituição sagrada que vela pela ordem dos homens, comprometo-me a cultivar a pureza
            do espírito, a benevolência do coração e a lealdade da alma. Guardarei com reverência a lei da justiça, sendo
            servo da verdade e amigo dos que caminham sob o mesmo sol. Formarei meu caráter como o escultor molda o
            mármore: com paciência, razão e firme propósito. Seguirei o caminho da razão, pois nela reside o farol que
            guia os navegantes da existência. Agirei com respeito, pois todo homem é reflexo do divino, e recordarei que
            a verdadeira força não se impõe pela espada, mas floresce na disciplina, na honra e na paz — virtudes que
            sustentam o cosmos e elevam o homem à sua melhor versão.
          </p>
        </section>

        {/* ===== EXPLICAÇÃO ===== */}
        <section id="explicacao" className="centered-section">
          <h2>Explicação</h2>
          <p>
            O Senatus existe para cultivar justiça com clemência, disciplina com humanidade e fraternidade com
            compostura. Não buscamos domínio, mas excelência moral; não agitamos a espada: lapidamos o caráter. Onde
            houver ruído, prevaleça a razão; onde houver discórdia, eleve-se a palavra justa.
          </p>
          <p>
            Em sua organização, cada ofício é serviço. Liderar é servir; aconselhar é ouvir; decidir é equilibrar
            coração e razão. A vida comum requer linguagem honrosa, paciência na escuta e zelo pela unidade — sem
            oprimir a consciência.
          </p>
        </section>

        {/* ===== LEIS ===== */}
        <section id="leis" className="centered-section">
          <h2>Leis do Senatus</h2>
          <ol className="laws">
            <li>
              <strong>Lei da Palavra Honrosa.</strong>
              <span> Todos devem zelar para que suas palavras edifiquem, evitando a desordem e a vaidade.</span>
            </li>
            <li>
              <strong>Lei da Escuta Sábia.</strong>
              <span> Antes de opinar, ouça atentamente; a sabedoria, muitas vezes, nasce do silêncio.</span>
            </li>
            <li>
              <strong>Lei da Igualdade de Dignidade.</strong>
              <span> Todos têm igual valor e voz, ainda que em diferentes tons, sem hierarquias.</span>
            </li>
            <li>
              <strong>Lei da Prudência.</strong>
              <span> Decisões e conselhos devem equilibrar coração e razão, evitando precipitação.</span>
            </li>
            <li>
              <strong>Lei do Auxílio Mútuo.</strong>
              <span> Cada um deve ser guardião do outro, ajudando quando alguém cair.</span>
            </li>
            <li>
              <strong>Lei do Silêncio Oportuno.</strong>
              <span> Quando as palavras não servirem à verdade ou ao bem, que prevaleça o silêncio.</span>
            </li>
            <li>
              <strong>Lei da Urbanidade Digital.</strong>
              <span> Nos grupos e servidores, usa linguagem formal e conduta nobre; figurinhas e imagens seguem o padrão oficial.</span>
            </li>
            <li>
              <strong>Lei do Conflito Justo.</strong>
              <span> Em divergências, busca mediação, provas e razão; jamais ofensa pessoal.</span>
            </li>
          </ol>
          <p className="law-note">
            Estas leis podem ser aprimoradas à medida que o Senatus amadurecer, sempre em fidelidade aos seus princípios.
          </p>
        </section>

        {/* ===== CONVÍVIO & FÉ ===== */}
        <section id="convivio" className="centered-section">
          <h2>Convívio & Fé</h2>
          <p>
            O Senatus não se limita a uma única religião. Honramos os que creem no Criador e acolhemos com igual respeito
            os que não professam fé. Pedimos a todos que resguardem o próximo com dignidade: quem crê não vilipendie quem
            não crê; quem não crê não ridicularize quem crê. Em todo debate, mantemos a calma, a cortesia e o apreço
            pela verdade.
          </p>
          <div className="verses">
            <h3>Versos que inspiram</h3>
            <ul>
              <li>
                <em>“Aquele que tem as mãos limpas e o coração puro.”</em> — <strong>Salmo 24:4</strong>.
              </li>
              <li>
                <em>“Amarás o teu próximo como a ti mesmo.”</em> — <strong>Marcos 12:31</strong>.
              </li>
              <li>
                <em>“Se possível, quanto depender de vós, tende paz com todos.”</em> — <strong>Romanos 12:18</strong>.
              </li>
              <li>
                <em>“A resposta branda desvia o furor.”</em> — <strong>Provérbios 15:1</strong>.
              </li>
            </ul>
            <p className="note">
              Tais versos inspiram virtudes; não impomos credo, mas pedimos respeito mútuo e urbanidade.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
