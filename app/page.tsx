'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiBookOpen, FiUsers, FiTrendingUp, FiAward, FiClock, FiTag } from 'react-icons/fi'
import GuiaTracker from '../components/GuiaTracker'

interface CursoGoverno {
  id: string;
  nome: string;
  area_tematica: string;
  competencias: string;
  carga_horaria: string;
  modalidade: string;
}

interface KitFerramenta {
  tipo: 'guia' | 'modelo';
  titulo: string;
  descricao: string;
  link: string;
}

// DADOS DOS CURSOS - ESCOLA VIRTUAL GOV (CURADORIA FINAL)
const cursosGov = [
  // Categoria 1: Fundamentos Digitais
  {
    titulo: "Como Trabalhar com Computadores e Dispositivos Móveis",
    descricao: "Aprenda conceitos básicos sobre computadores, tablets, smartphones e aplicativos essenciais. O ponto de partida para quem tem pouca familiaridade com tecnologia.",
    link: "https://www.escolavirtual.gov.br/curso/1130",
    categoria: "Fundamentos Digitais",
    carga_horaria: "6h"
  },
  {
    titulo: "Como trabalhar e colaborar On-line",
    descricao: "Desenvolva habilidades básicas de trabalho remoto e colaboração online, cada vez mais exigidas pelo mercado de trabalho.",
    link: "https://www.escolavirtual.gov.br/curso/1131",
    categoria: "Fundamentos Digitais",
    carga_horaria: "6h"
  },
  // Categoria 2: Cidadania Digital Essencial
  {
    titulo: "Acesso à Conta gov.br",
    descricao: "Aprenda o passo a passo para criar, recuperar a senha e aumentar o nível da sua conta gov.br para acessar todos os serviços digitais.",
    link: "https://www.escolavirtual.gov.br/curso/74",
    categoria: "Cidadania Digital",
    carga_horaria: "20h"
  },
  {
    titulo: "Serviços públicos e defesa do usuário",
    descricao: "Conheça os direitos dos usuários de serviços públicos e como as ouvidorias contribuem para sua proteção. Empodere-se como cidadão.",
    link: "https://www.escolavirtual.gov.br/curso/875",
    categoria: "Cidadania Digital",
    carga_horaria: "20h"
  },
  // Categoria 3: Segurança e Confiança Online
  {
    titulo: "Segurança da Informação e Comunicação",
    descricao: "Conheça os principais riscos da internet, como vírus e fraudes, e aprenda as melhores práticas para se proteger online.",
    link: "https://www.escolavirtual.gov.br/curso/184",
    categoria: "Segurança Digital",
    carga_horaria: "15h"
  },
  {
    titulo: "Assédio Moral: O que saber e fazer",
    descricao: "Conheça e reflita sobre o Assédio Moral no trabalho, legislação e como prevenir situações de assédio. Segurança no ambiente profissional.",
    link: "https://www.escolavirtual.gov.br/curso/836",
    categoria: "Segurança Digital",
    carga_horaria: "12h"
  },
  // Categoria 4: Habilidades Profissionais e Financeiras
  {
    titulo: "Educação Financeira Pessoal",
    descricao: "Aprenda a organizar suas finanças, planejar seu orçamento e tomar decisões financeiras mais inteligentes para o seu dia a dia.",
    link: "https://www.escolavirtual.gov.br/curso/103",
    categoria: "Finanças",
    carga_horaria: "25h"
  },
  {
    titulo: "Noções básicas de atendimento ao cidadão",
    descricao: "Aprenda técnicas essenciais de atendimento e relacionamento com o público, fundamentais para o comércio e serviços.",
    link: "https://www.escolavirtual.gov.br/curso/1349",
    categoria: "Atendimento",
    carga_horaria: "20h"
  },
  {
    titulo: "Planejamento e Organização Pessoal no Trabalho",
    descricao: "Aprenda ferramentas e práticas para melhorar seu planejamento pessoal, organização e produtividade no ambiente de trabalho.",
    link: "https://www.escolavirtual.gov.br/curso/475",
    categoria: "Desenvolvimento Pessoal",
    carga_horaria: "20h"
  },
  {
    titulo: "Gerenciar Dados com o Microsoft 365",
    descricao: "Aprenda a coletar, organizar e distribuir dados usando Forms, Power Automate, Excel e Power BI. Complementa os cursos de Office da Bradesco.",
    link: "https://www.escolavirtual.gov.br/curso/1160",
    categoria: "Tecnologia",
    carga_horaria: "4h"
  }
];

// DADOS DOS CURSOS - FGV (CURSOS ESSENCIAIS)
const cursosFGV = [
  {
    titulo: "Segurança Digital",
    descricao: "Aprenda as melhores práticas para se proteger de ameaças e navegar na internet com mais confiança e segurança.",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos/seguranca-digital",
    categoria: "Segurança Digital"
  },
  {
    titulo: "Proteção de Dados",
    descricao: "Entenda seus direitos sobre suas informações pessoais (LGPD) e saiba como proteger sua privacidade em cadastros e redes sociais.",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos/protecao-de-dados",
    categoria: "Segurança Digital"
  },
  {
    titulo: "Acesso à Informação",
    descricao: "Descubra como usar a internet para exercer sua cidadania, acessar informações públicas e entender seus direitos.",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos/acesso-informacao",
    categoria: "Cidadania Digital"
  },
  {
    titulo: "Publicidade e Consumo On-line",
    descricao: "Torne-se um consumidor mais consciente e seguro na internet, aprendendo a identificar publicidade e a se proteger em compras online.",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos/publicidade-e-consumo-line",
    categoria: "Finanças"
  },
  {
    titulo: "Empreendedorismo para o Mercado Financeiro",
    descricao: "Desenvolva habilidades empreendedoras específicas para o setor financeiro, aprendendo sobre inovação, gestão e oportunidades de negócio.",
    link: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/empreendedorismo-para-o-mercado-financeiro",
    categoria: "Empreendedorismo"
  }
];

// DADOS DO KIT DE FERRAMENTAS PROFISSIONAIS
const kitFerramentas: KitFerramenta[] = [
  {
    tipo: 'guia',
    titulo: "Guia: Como Criar um Currículo de Impacto",
    descricao: "Aprenda o passo a passo para montar um currículo que chama a atenção dos recrutadores, mesmo sem ter experiência.",
    link: "/guias/curriculo"
  },
  {
    tipo: 'guia',
    titulo: "Guia: O que é o MEI e Como se Formalizar",
    descricao: "Entenda as vantagens de se tornar um Microempreendedor Individual e veja o passo a passo para abrir seu CNPJ de graça.",
    link: "/guias/mei"
  },
  {
    tipo: 'guia',
    titulo: "Guia: Ferramentas Digitais para seu Negócio",
    descricao: "Uma curadoria da SOFTECH com os melhores apps gratuitos para controle financeiro, divulgação e pagamentos para o seu MEI.",
    link: "/guias/ferramentas-digitais"
  },
  {
    tipo: 'guia',
    titulo: "Gerador ATS: Currículo em PDF",
    descricao: "Preencha um formulário e baixe seu currículo formatado para robôs de triagem (ATS).",
    link: "/gerador"
  }
];

export default function CapacitaPGMPage() {
  const [cursosGoverno, setCursosGoverno] = useState<CursoGoverno[]>([]);
  const [loadingGoverno, setLoadingGoverno] = useState(true);

  // Função disparadora para registrar o clique em cursos
  const trackCourseClick = (courseName: string) => {
    fetch('https://softechservicos.vercel.app/api/capacita-pgm/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'clique_curso',
        course_name: courseName,
        label: courseName
      })
    }).catch(err => console.error('Erro no tracking:', err));
  };

  // Função disparadora para registrar o acesso aos guias e modelos
  const trackToolDownload = (toolName: string) => {
    fetch('https://softechservicos.vercel.app/api/capacita-pgm/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'download_ferramenta',
        tool_name: toolName,
        label: toolName
      })
    }).catch(err => console.error('Erro no tracking:', err));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  useEffect(() => {
    const fetchCursosGoverno = async () => {
      try {
        const response = await fetch('/api/cursos-governo');
        const data = await response.json();
        if (data.success) {
          setCursosGoverno(data.cursos);
        }
      } catch (error) {
        console.error('Erro ao carregar cursos do governo:', error);
      } finally {
        setLoadingGoverno(false);
      }
    };

    fetchCursosGoverno();
  }, []);

  return (
    <div className="min-h-screen bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size">
      <GuiaTracker guideName="Página Principal" />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium text-gray-200">🎓 Capacitação Profissional Gratuita</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              Capacita PGM
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl md:text-3xl mb-6 max-w-4xl mx-auto font-semibold leading-tight"
            >
              O Hub de Oportunidades de Capacitação para Paragominas
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed"
            >
              Conectamos você aos melhores cursos online gratuitos e ferramentas essenciais para impulsionar sua carreira na nossa região.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
              whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
              href="#cursos"
              className="inline-flex items-center gap-3 bg-accent-cyan text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
            >
              <span>🚀</span>
              Explorar Oportunidades
            </motion.a>
          </div>
        </div>
      </section>

      {/* Sobre o Programa */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-softech-blue/20 text-accent-cyan px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎦 Sobre o Programa
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sua Porta de Entrada para o
              <span className="block text-accent-cyan">Mercado de Trabalho</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-softech-blue to-accent-cyan mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              O Capacita PGM é uma iniciativa da <strong className="text-accent-cyan">SOFTECH</strong> para fortalecer nossa comunidade. Pesquisamos, selecionamos e organizamos os melhores cursos online gratuitos de instituições renomadas, criando ferramentas práticas para o mercado de trabalho.
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mt-4">
              Nosso objetivo: economizar seu tempo e te guiar diretamente para as oportunidades que realmente farão a diferença na sua carreira.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ Diferenciais
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              3 Razões para Transformar
              <span className="block text-green-400">sua Carreira Conosco</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-accent-cyan mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-softech-blue/20 to-accent-cyan/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <FiAward className="text-accent-cyan text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Curadoria de Confiança
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Nossa equipe já fez o trabalho de selecionar apenas os cursos gratuitos mais relevantes e de instituições confiáveis.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500/20 to-green-400/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <FiBookOpen className="text-green-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Tudo em um Só Lugar
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Economize seu tempo. Cursos de capacitação e kit de ferramentas profissionais em um único ambiente, fácil de navegar.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-400/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <FiTrendingUp className="text-purple-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Foco na Prática
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Recursos focados em habilidades práticas que o mercado de trabalho local valoriza. Capacite-se para as oportunidades de hoje.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Online Gratuitos */}
      <section id="cursos" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-softech-blue/20 to-purple-500/20 text-accent-cyan px-6 py-3 rounded-full text-sm font-semibold mb-6">
              🎓 Cursos Gratuitos Certificados
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              +30 Cursos Gratuitos
              <span className="block text-transparent bg-gradient-to-r from-accent-cyan to-purple-400 bg-clip-text">
                com Certificado
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-cyan to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Mais de <strong className="text-accent-cyan">500 horas</strong> de conteúdo das melhores instituições do Brasil
            </p>
          </div>

          {/* Cursos Fundação Bradesco */}
          <div className="mb-16">
            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl">
                  <span className="text-3xl">🏆</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">
                Fundação Bradesco
              </h3>
              <p className="text-center text-slate-300 text-lg">
                Cursos Mais Procurados do Mercado
              </p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                {
                  titulo: "Excel 2016 (do básico ao avançado)",
                  descricao: "Aprenda a dominar as planilhas eletrônicas, do nível básico ao avançado. Ideal para uso profissional e pessoal.",
                  link: "https://www.ev.org.br/trilhas-de-conhecimento/excel-2016-do-basico-ao-avancado",
                  categoria: "Pacote Office"
                },
                {
                  titulo: "Office 365",
                  descricao: "Conheça as principais ferramentas do Office 365 para trabalho colaborativo, como Outlook, OneDrive, OneNote e Teams.",
                  link: "https://www.ev.org.br/trilhas-de-conhecimento/office-365",
                  categoria: "Pacote Office"
                },
                {
                  titulo: "Word 2016 (do básico ao avançado)",
                  descricao: "Domine o processador de textos mais popular do mundo. Aprenda a criar, editar e formatar documentos do básico ao avançado.",
                  link: "https://www.ev.org.br/trilhas-de-conhecimento/word-2016-do-basico-ao-avancado",
                  categoria: "Pacote Office"
                },
                {
                  titulo: "Pacote Office 2016",
                  descricao: "Uma trilha completa para aprender o essencial do Pacote Office, incluindo Excel, PowerPoint e Word para diversas tarefas profissionais.",
                  link: "https://www.ev.org.br/trilhas-de-conhecimento/pacote-office-2016",
                  categoria: "Pacote Office"
                },
                {
                  titulo: "Comunicação Escrita: Ortografia, Gramática e Texto",
                  descricao: "Aprimore sua comunicação escrita estudando as regras essenciais de ortografia, gramática e construção de textos.",
                  link: "https://www.ev.org.br/cursos/comunicacao_escrita",
                  categoria: "Desenvolvimento Pessoal"
                },
                {
                  titulo: "Construindo minha Proteção Financeira",
                  descricao: "Aprenda a administrar suas finanças por meio de planejamento e organização, mapeando gastos para um futuro melhor.",
                  link: "http://ev.org.br/cursos/Construindo-minha-Protecao-Financeira",
                  categoria: "Gestão"
                },
                {
                  titulo: "Introdução à Análise de Dados - Microsoft Power BI",
                  descricao: "Conheça o Power BI e aprenda como transformar fontes de dados em relatórios imersivos para tomada de decisões.",
                  link: "https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi",
                  categoria: "Tecnologia"
                },
                {
                  titulo: "Inteligência Emocional",
                  descricao: "Desenvolva estratégias para lidar com emoções, autoconhecimento e melhorar seus relacionamentos interpessoais.",
                  link: "https://www.ev.org.br/trilhas-de-conhecimento/inteligencia-emocional",
                  categoria: "Desenvolvimento Pessoal"
                },
                {
                  titulo: "Empreendedorismo e Inovação",
                  descricao: "Aprenda conceitos importantes sobre a postura empreendedora, identificação de oportunidades e criação de Planos de Negócios.",
                  link: "https://www.ev.org.br/cursos/empreendedorismo-e-inovacao",
                  categoria: "Empreendedorismo"
                }
              ].map((curso, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-[0_0_20px_theme(colors.accent-cyan/10%)]"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-softech-blue/20 text-accent-cyan text-xs px-2 py-1 rounded-full mb-2">
                      {curso.categoria}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white">{curso.titulo}</h4>
                  </div>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed flex-grow">{curso.descricao}</p>
                  <a
                    href={curso.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  onClick={() => trackCourseClick(curso.titulo)}
                    className="inline-block mt-auto bg-softech-blue text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium"
                  >
                    Acessar Curso Gratuito
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Cursos FGV */}
          <div className="mb-16">
            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-4 rounded-xl">
                  <span className="text-3xl">🎓</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">
                FGV - Fundação Getulio Vargas
              </h3>
              <p className="text-center text-slate-300 text-lg">
                Cursos Essenciais de Qualidade Premium
              </p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {cursosFGV.map((curso, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-purple-400/30 hover:shadow-[0_0_20px_theme(colors.purple.400/10%)]"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full mb-2">
                      {curso.categoria}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white">{curso.titulo}</h4>
                  </div>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed flex-grow">{curso.descricao}</p>
                  <a
                    href={curso.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  onClick={() => trackCourseClick(curso.titulo)}
                    className="inline-block mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium"
                  >
                    Acessar Curso Gratuito
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Cursos Governo */}
          <div className="mb-16">
            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl">
                  <span className="text-3xl">🇧🇷</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">
                Escola Virtual Gov
              </h3>
              <p className="text-center text-slate-300 text-lg">
                Certificação Oficial do Governo Federal
              </p>
            </div>
            {loadingGoverno ? (
              <div className="text-center py-8">
                <p className="text-slate-300">Carregando cursos...</p>
              </div>
            ) : cursosGov.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-300">Nenhum curso disponível nesta categoria no momento.</p>
              </div>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {cursosGov.map((curso, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants} 
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-green-400/30 hover:shadow-[0_0_20px_theme(colors.green.400/10%)]"
                    >
                      <div className="mb-3">
                        <span className="inline-block bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full mb-2">
                          {curso.categoria}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2">{curso.titulo}</h4>
                      </div>
                      <div className="flex items-center text-sm text-slate-300 mb-2">
                        <FiClock className="mr-2" />
                        <span>{curso.carga_horaria}</span>
                      </div>
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed flex-grow">{curso.descricao}</p>
                      <a
                        href={curso.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCourseClick(curso.titulo)}
                        className="inline-block mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium"
                      >
                        Acessar Curso Gratuito
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

              </>
            )}
            

          </div>
        </div>
      </section>

      {/* Kit de Ferramentas Profissionais */}
      <section id="kit-ferramentas" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              🛠️ Kit de Ferramentas
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu Kit Completo para
              <span className="block text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">
                Conseguir Emprego ou Abrir seu Negócio
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Guias práticos, modelos prontos e vídeos exclusivos para <strong className="text-orange-400">Paragominas</strong>
            </p>
          </div>

          <motion.div 
            id="kit-ferramentas-container" 
            className="kit-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {kitFerramentas.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                whileHover={{ y: -5, scale: 1.02 }}
                className={`ferramenta-card bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:shadow-[0_0_20px_theme(colors.accent-cyan/10%)] border-l-4 ${
                  item.tipo === 'guia' ? 'border-l-softech-blue hover:border-l-accent-cyan' : 'border-l-green-500 hover:border-l-green-400'
                }`}
              >
                <div className="mb-4">
                  <span className={`inline-block text-xs px-2 py-1 rounded-full mb-2 ${
                    item.tipo === 'guia' 
                      ? 'bg-softech-blue/20 text-accent-cyan' 
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {item.tipo === 'guia' ? '📖 Guia' : '📄 Modelo'}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3">{item.titulo}</h4>
                </div>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed flex-grow">{item.descricao}</p>
                <a
                  href={item.link}
                  target={item.tipo === 'modelo' ? '_self' : '_blank'}
                  rel={item.tipo === 'modelo' ? '' : 'noopener noreferrer'}
                  download={item.tipo === 'modelo' ? true : undefined}
                onClick={() => trackToolDownload(item.titulo)}
                  className={`inline-block mt-auto text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium ${
                    item.tipo === 'guia'
                      ? 'bg-softech-blue'
                      : 'bg-green-600'
                  }`}
                >
                  {item.tipo === 'guia' ? 'Ver Guia' : 'Download'}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="kit-ferramentas-grid grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Conquistando seu Emprego */}
            <motion.div variants={itemVariants} className="ferramenta-card bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:border-accent-cyan/30">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-softech-blue/20 to-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Conseguir Emprego em Paragominas
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Currículo que Chama Atenção dos Recrutadores
                  </h4>
                  <div className="mb-4 rounded-lg overflow-hidden border border-slate-700">
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                       <iframe
                         className="absolute top-0 left-0 w-full h-full"
                         src="https://www.youtube.com/embed/jSiesGzgggQ"
                         title="Dicas de Currículo para Conseguir Emprego"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                       ></iframe>
                     </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Assista ao vídeo com dicas práticas para criar um currículo que chama a atenção dos recrutadores.
                  </p>
                  {/* Download do modelo removido: substituído pelo Gerador ATS */}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎤</span>
                    Entrevista de Emprego em Paragominas: Dicas para se Destacar
                  </h4>
                  <div className="mb-4 rounded-lg overflow-hidden border border-slate-700">
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                       <iframe
                         className="absolute top-0 left-0 w-full h-full"
                         src="https://www.youtube.com/embed/b6E0ZF6oApk"
                         title="Entrevista de Emprego em Paragominas: Dicas para se Destacar"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                       ></iframe>
                     </div>
                  </div>
                  <p className="text-slate-300">
                    Assista ao vídeo completo com dicas práticas para se destacar em entrevistas de emprego na região de Paragominas.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    Melhores Lugares para Encontrar Vagas na Cidade
                  </h4>
                  <ul className="text-slate-300 space-y-2">
                    <li>• SINE Paragominas - Atendimento presencial</li>
                    <li>• Grupos de Facebook locais</li>
                    <li>• Instagram de empresas da região</li>
                    <li>• Indicações de conhecidos</li>
                    <li>• Visitas presenciais às empresas</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Iniciando seu Negócio (MEI) */}
            <motion.div variants={itemVariants} className="ferramenta-card bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:border-green-400/30">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Abrir seu Próprio Negócio (MEI)
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Por que Virar MEI? Vantagens que Você Precisa Conhecer
                  </h4>
                  <p className="text-slate-300">
                    O Microempreendedor Individual (MEI) permite formalizar seu negócio com baixo custo, ter CNPJ, emitir notas fiscais e contribuir para a Previdência Social. Ideal para quem fatura até R$ 81.000/ano.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏦</span>
                    Como Cadastrar no GOV.BR para Abrir o MEI
                  </h4>
                  <div className="mb-4">
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                       <iframe
                         className="absolute top-0 left-0 w-full h-full"
                         src="https://www.youtube.com/embed/y7OVwLCd0ag"
                         title="Como Abrir MEI - Passo a Passo Completo - Sebrae"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                       ></iframe>
                     </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Tutorial completo do Sebrae sobre o processo 100% online e gratuito para cadastro no GOV.BR e abertura do MEI.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <a 
                      href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium text-center"
                    >
                      🌐 Portal Oficial MEI
                    </a>
                    <a 
                      href="https://servicos.acesso.gov.br" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-softech-blue text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all duration-300 text-sm font-medium text-center"
                    >
                      🔐 Criar Conta GOV.BR
                    </a>
                  </div>
                  
                  {/* Links Apps GOV.BR */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="text-md font-bold text-white mb-3 text-center">
                      📱 Baixe o app GOV.BR no seu celular
                    </h5>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://play.google.com/store/apps/details?id=br.gov.meugovbr&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                      >
                        <span className="mr-2">📱</span>
                        Google Play
                      </a>
                      <a
                        href="https://apps.apple.com/br/app/gov-br/id1506827551"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                      >
                        <span className="mr-2">🍎</span>
                        App Store
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    Apps Gratuitos para Gerenciar seu Negócio
                  </h4>
                  <ul className="text-slate-300 space-y-2">
                    <li>• <strong>Conta Azul:</strong> Controle financeiro gratuito</li>
                    <li>• <strong>Instagram Business:</strong> Divulgação e vendas</li>
                    <li>• <strong>WhatsApp Business:</strong> Atendimento profissional</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Impacto Simplificada */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-softech-blue/20 text-accent-cyan px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📊 Impacto Social
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Recursos Disponíveis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="bg-softech-blue/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="text-2xl font-bold text-accent-cyan mb-1">30+</div>
              <div className="text-sm text-slate-300">Cursos Gratuitos</div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">3</div>
              <div className="text-sm text-slate-300">Fontes de Cursos</div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">500+</div>
              <div className="text-sm text-slate-300">Horas de Conteúdo</div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <div className="text-2xl font-bold text-orange-400 mb-1">4</div>
              <div className="text-sm text-slate-300">Ferramentas Profissionais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget de Feedback */}
    </div>
  )
}