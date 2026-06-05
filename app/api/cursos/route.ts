import { NextRequest, NextResponse } from 'next/server'

// Dados estáticos para demonstração
const cursosData = {
  bradesco: [
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
  ],
  governo: [
    {
      titulo: "Administração Pública",
      descricao: "Princípios e práticas da administração pública brasileira",
      link: "https://www.escolavirtual.gov.br/curso/1",
      categoria: "Gestão"
    },
    {
      titulo: "Atendimento ao Cidadão",
      descricao: "Técnicas de atendimento e relacionamento com o público",
      link: "https://www.escolavirtual.gov.br/curso/2",
      categoria: "Atendimento"
    },
    {
      titulo: "Gestão de Projetos",
      descricao: "Metodologias e ferramentas para gestão de projetos",
      link: "https://www.escolavirtual.gov.br/curso/3",
      categoria: "Gestão"
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fonte = searchParams.get('fonte') // 'bradesco' ou 'governo'
    
    if (fonte && cursosData[fonte as keyof typeof cursosData]) {
      return NextResponse.json({
        success: true,
        cursos: cursosData[fonte as keyof typeof cursosData]
      })
    }
    
    return NextResponse.json({
      success: true,
      cursos: cursosData
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar cursos' },
      { status: 500 }
    )
  }
}