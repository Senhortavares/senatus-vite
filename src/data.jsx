// src/data.js
import { FaChessKing, FaCrown } from 'react-icons/fa';
import { GiOldKing, GiLockPicking } from 'react-icons/gi';
import { BsPersonWalking } from 'react-icons/bs';

// As filosofias puxam da pasta public
const filos1 = "/filos.png";
const filos2 = "/filos.png";
const filos3 = "/filos.png";
const filos4 = "/filos.png";

// esses sao os links que aparece no menu tem que fazer os import aqui para pode almentar no menu
export const links = [
  { name: 'Início', path: '/' },
  { name: 'Formulário', path: '/plans' },
  { name: 'Imagens', path: '/gallery' },
  { name: 'Jogo', path: '/notis' },
  { name: 'Avisos', path: '/aviso' },
  { name: 'Duvidas', path: '/ouvidoria' },
  { name: 'Sobre', path: '/sobre' },


];

// Cards dos líderes
export const programs = [
  { id: 1, icon: <FaChessKing />, title: 'LÍDER SUPREMO: Anderson',  info: 'Líder supremo do Senatus!', path: '/programs/111', imagem: '/lider1.png' },
  { id: 2, icon: <FaCrown />,     title: 'GRÃO-MESTRE: Arnaud',      info: 'Mestre do Senatus!', path: '/programs/222', imagem: '/gra2.png' },
  { id: 3, icon: <GiOldKing />,   title: 'ADMINISTRADORES: Sun',     info: 'Administradora da Senatus', path: '/programs/333', imagem: '/adm.png' },
  { id: 4, icon: <GiOldKing />,   title: 'ENGENHEIRO: Warlen',       info: 'Engenheiro do Senatus', path: '/programs/444', imagem: '/eng1.png' },
  { id: 5, icon: <GiLockPicking />, title: 'CONSELHEIROS',           info: 'Líder dos Cívis do Senatus', path: '/programs/555', imagem: '/liciv.png' },
  { id: 6, icon: <BsPersonWalking />, title: 'CIVIL',                info: 'Cívis do Senatus', path: '/programs/666', imagem: '/civil.png' },
];

// Filosofias
export const values = [
  { id: 1, img: filos1, title: '1 Filosofia', desc: 'No Senatus, a justiça não é apenas lei: é o alicerce que sustenta nossa irmandade. Pois onde há equidade, há verdadeira força.' },
  { id: 2, img: filos2, title: '2 Filosofia', desc: 'A lealdade é a chama que mantém o Senatus unido. Não se trata de obediência cega, mas da confiança inquebrantável entre irmãos.' },
  { id: 3, img: filos3, title: '3 Filosofia', desc: 'A disciplina é o caminho silencioso que molda o homem no Senatus. É pela constância que o espírito se torna inabalável.' },
  { id: 4, img: filos4, title: '4 Filosofia', desc: 'No Senatus, cada irmão é reflexo do todo. A fraternidade não é apenas união, é a certeza de que ninguém caminha sozinho.' },
];

// FAQs
export const faqs = [
  { id: 1, question: 'O que é o SENATUS?', answer: 'Uma comunidade orientada por princípios, fraternidade e crescimento.' },
  { id: 2, question: 'Como faço para entrar?', answer: 'Preencha o formulário e vai aparecer um link para o Discord.' },
  { id: 3, question: 'Existe idade mínima?', answer: 'Sim, 15 anos.' },
];

// Depoimentos e noticias que cada lider vai passar 
export const testimonials = [
  { id: 1, name: 'Anderson', job: 'Líder Supremo', quote: 'Unidade, justiça e luz.', avatar: '/lider1.png' },
  { id: 2, name: 'Arnaud', job: 'Grão-Mestre', quote: 'Ordem, respeito e fraternidade.', avatar: '/gra2.png' },
  { id: 3, name: 'Sun', job: 'Administrador', quote: 'Ordem, respeito e fraternidade.', avatar: '/adm.png' },
  { id: 4, name: 'Warlen', job: 'Engenheiro', quote: 'Ordem, respeito e fraternidade.', avatar: '/eng1.png' },
];



// Avisos importantes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// export const avisos = [
//   {
//     id: 1,
//     img: "/cavaleiro.png", 
//     title: "Aviso 1",
//     desc: "O sistema estará em manutenção hoje às 22h."
//   },
//   {
//     id: 2,
//     img: "/cavaleiro.png",
//     title: "Aviso 2",
//     desc: "📢 Novo formulário disponível na aba de cadastros."
//   },
//   {
//     id: 3,
//     img: "/cavaleiro.png",
//     title: "Aviso 3",
//     desc: "🔒 Atualização de segurança aplicada com sucesso."
//   }
// ];

export const avisos = [
  {
    id: 1,
    title: "Aviso Importante",
    desc: "Se estiver com dificuldades, vai ate Duvidas."
  },
  {
    id: 2,
    title: "Lideres",
    desc: "Em breve vamos anunciar quem serão os novos líderes ."
  },
  {
    id: 3,
    title: "Atualização",
    desc: "O jogo ainda está em desenvolvimento, mas você pode se divertir com esta versão que está rodando lá ."
  },
  {
    id: 4,
    title: "Reuniões",
    desc: "As reuniões no Discord acontecem todos os dias às 22h."
  },
    {
    id: 4,
    title: "Outubro Rosa",
    desc: "Outubro é o mês da conscientização sobre o câncer de mama, uma oportunidade para reforçar a importância do autocuidado, da prevenção e do diagnóstico precoce. O laço rosa simboliza a união de forças em prol da vida, lembrando que o exame de toque, a mamografia e o acompanhamento médico podem salvar vidas. Vista-se de rosa, compartilhe informação e apoie essa causa — porque cuidar de si também é um ato de amor."
  }
];


