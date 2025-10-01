import React, { useEffect } from 'react'
import './About.css'

const About = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".about p");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="about">
      <div className="about-container">
        <h1 className="about-title">A Origem do SENATUS</h1>

        <p>
          Nos tempos em que a harmonia se confundia com ilusão e os homens buscavam na comunidade um refúgio de crescimento e virtude, levantou-se Anderson, cujo espírito inquieto ansiava por justiça e ordem. Ele era parte de uma irmandade dedicada ao autoconhecimento, à colaboração e à elevação do espírito. Porém, como tantas vezes ocorre na história dos homens, a serenidade foi quebrada.
        </p>

        <p>
          O guia daquela comunidade renunciou à sua função e, ao invés de abrir caminhos para a escolha justa e democrática, impôs um sucessor. Mas este novo condutor revelou-se inclinado à hipocrisia, à injustiça e à falta de princípios. Assim, onde deveria haver união, germinaram o descontentamento e a discórdia.
        </p>

        <p>
          Vendo a degradação dos valores, Anderson tomou para si a tarefa de restaurar a justiça. Criou, dentro da antiga comunidade, um círculo de homens comprometidos com leis, princípios e equidade. Por três dias lutaram por um governo mais claro e participativo, até que, de forma arbitrária e injusta, foram silenciados pelos que temiam a luz da razão.
        </p>

        <p>
          Não obstante, Anderson não se deixou tombar. Reuniu ao seu lado companheiros de fé e convicção, Lamonica, Levi, Arnold e Rash e com eles ergueu as primeiras colunas de uma nova comunidade, fundada sobre a justiça, a transparência e a participação coletiva. Assim germinava aquilo que viria a ser conhecido como "O Conselho".
        </p>

        <p>
          O Conselho cresceu e prosperou, reunindo multidões que chegaram a somar mais de duzentos e cinquenta membros. Mas, como na marcha de todo destino humano, vieram também as provações. Lamonica e Levi afastaram-se do caminho, e um antigo amigo, dominado pela ambição, tentou erguer para si uma nova comunidade, desviando membros e corrompendo laços de confiança.
        </p>

        <p>
          Diante disso, Anderson novamente se firmou. Reuniu os fiéis: Sun, Tiago Batista, Arnold, Warlen, Bilu e Alberto, além de outros que, por circunstâncias diversas, também marcaram presença, como João Victor, cuja mão diligente ajudou a erguer a organização no espaço digital. E assim também se enfrentaram as infiltrações, expulsando os que, como Santos, traziam a desordem.
        </p>

        <p>
          Foi desse labor e dessas provas que nasceu oficialmente o SENATUS: não como obra de um só, mas como fruto da confiança, da fraternidade e da perseverança de muitos. Estruturado em princípios claros, erguido sobre a justiça e a lealdade, o SENATUS tornou-se um espaço de verdadeira comunhão. Seus fundadores dedicaram dias e noites à construção de sua identidade, à criação de regras e à firme organização de sua casa.
        </p>

        <p className="about-highlight">
          Pela graça do Senatus, instituição sagrada que vela pela ordem dos homens, comprometo-me a cultivar a pureza do espírito, a benevolência do coração e a lealdade da alma. Guardarei com reverência a lei da justiça, sendo servo da verdade e amigo dos que caminham sob o mesmo sol.
          Formarei meu caráter como o escultor molda o mármore: com paciência, razão e firme propósito. Seguirei o caminho da razão, pois nela reside o farol que guia os navegantes da existência. Agirei com respeito, pois todo homem é reflexo do divino, e recordarei que a verdadeira força não se impõe pela espada, mas floresce na disciplina, na honra e na paz — virtudes que sustentam o cosmos e elevam o homem à sua melhor versão.
        </p>
      </div>
    </section>
  )
}

export default About
