// src/data.js
// import { SiOpenaigym } from 'react-icons/si';
import { FaChessKing, FaCrown } from 'react-icons/fa';
import { GiOldKing, GiLockPicking } from 'react-icons/gi';
import { BsPersonWalking } from 'react-icons/bs';
import filos1 from '../../senatus-vite/public/filos.png';
import filos3 from '../../senatus-vite/public/filos.png';
import filos4 from '../../senatus-vite/public/filos.png';
import filos2 from '../../senatus-vite/public/filos.png';

export const links = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Figurinhas', path: '/gallery' },
  { name: 'Formulário', path: '/plans' },
  { name: 'Ouvidoria', path: '/ouvidoria' },
];


// parte onde fica os cards dos lidres
export const programs = [
  { id: 1, icon: <FaChessKing/>, title: 'LÍDER SUPREMO: Anderson', info: 'Líder supremo do Senatus!', path: '/programs/111', imagem: '../../public/lider1.png' },
  { id: 2, icon: <FaCrown/>,     title: 'GRÃO-MESTRE: Arnaud',      info: 'Mestre do Senatus!', path: '/programs/222', imagem: '../../public/gra2.png' },
  { id: 3, icon: <GiOldKing/>,   title: 'ADMINISTRADORES: Sun', info: 'Administradora da Senatus', path: '/programs/333', imagem: '../../public/adm.png' },
  { id: 4, icon: <GiOldKing/>,   title: 'ENGENHEIRO: Warlen', info: 'Engenheiro do Senatus', path: '/programs/444', imagem: '../../public/eng1.png' },
  { id: 5, icon: <GiLockPicking/>, title: 'CONSELHEIROS',         info: 'Líder dos Cívis do Senatus', path: '/programs/555', imagem: '../../public/liciv.png' },
  { id: 6, icon: <BsPersonWalking/>, title: 'CIVIL',              info: 'Cívis do Senatus', path: '/programs/666', imagem: '../../public/civil.png' },
];


// as 4 filosofias que tem no senatus
export const values = [
  { 
    id: 1, 
    img: filos1, 
    title: '1 Filosofia', 
    desc: 'No Senatus, a justiça não é apenas lei: é o alicerce que sustenta nossa irmandade. Pois onde há equidade, há verdadeira força.' 
  },
  { 
    id: 2, 
    img: filos2, 
    title: '2 Filosofia', 
    desc: 'A lealdade é a chama que mantém o Senatus unido. Não se trata de obediência cega, mas da confiança inquebrantável entre irmãos.' 
  },
  { 
    id: 3, 
    img: filos3, 
    title: '3 Filosofia', 
    desc: 'A disciplina é o caminho silencioso que molda o homem no Senatus. É pela constância que o espírito se torna inabalável.' 
  },
  { 
    id: 4, 
    img: filos4, 
    title: '4 Filosofia', 
    desc: 'No Senatus, cada irmão é reflexo do todo. A fraternidade não é apenas união, é a certeza de que ninguém caminha sozinho.' 
  },
];

// ADICIONEI: perguntas para FAQs
export const faqs = [
  { id: 1, question: 'O que é o SENATUS?', answer: 'Uma comunidade orientada por princípios, fraternidade e crescimento.' },
  { id: 2, question: 'Como faço para entrar?', answer: 'Preencha o formulário e aguarde o contato.' },
  { id: 3, question: 'Existe idade mínima?', answer: 'Sim, 15 anos.' },
];

// ADICIONEI: depoimentos mínimos
export const testimonials = [
  { id: 1, name: 'Anderson', job: 'Líder Supremo', quote: 'Unidade, justiça e luz.', avatar: '../../public/lider1.png' },
  { id: 2, name: 'Arnaud', job: 'Gram-mestre', quote: 'Ordem, respeito e fraternidade.', avatar: '../../public/gra2.png' },
  { id: 3, name: 'Sun', job: 'Administrador', quote: 'Ordem, respeito e fraternidade.', avatar: '../../public/adm.png' },
  { id: 4, name: 'Warlen', job: 'Engenheiro', quote: 'Ordem, respeito e fraternidade..', avatar: '../../public/eng1.png' },

];
