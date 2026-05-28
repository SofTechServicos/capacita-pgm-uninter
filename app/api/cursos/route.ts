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
      titulo: "Comunicação Escrita e Oral",
      descricao: "Aprimore suas competências de fala e escrita para se comunicar de forma correta e apropriada em diferentes contextos.",
      link: "https://www.ev.org.br/trilhas-de-conhecimento/comunicacao-escrita-e-oral",
      categoria: "Desenvolvimento Pessoal"
    },
    {
      titulo: "Finanças",
      descricao: "Compreenda os principais fundamentos financeiros, da matemática financeira à contabilidade e análise de balanços.",
      link: "https://www.ev.org.br/trilhas-de-conhecimento/financas",
      categoria: "Gestão"
    },
    {
      titulo: "Fundamentos do Power BI",
      descricao: "Aprenda a transformar dados brutos em informações coerentes e visualmente interativas com o Microsoft Power BI.",
      link: "https://www.ev.org.br/trilhas-de-conhecimento/fundamentos-do-power-bi",
      categoria: "Tecnologia"
    },
    {
      titulo: "Inteligência Emocional",
      descricao: "Desenvolva estratégias para lidar com emoções, autoconhecimento e melhorar seus relacionamentos interpessoais.",
      link: "https://www.ev.org.br/trilhas-de-conhecimento/inteligencia-emocional",
      categoria: "Desenvolvimento Pessoal"
    },
    {
      titulo: "Transformação Digital e Inovação",
      descricao: "Entenda como a tecnologia, o empreendedorismo e a inovação caminham juntos e aprenda sobre IA, LGPD e processos de inovação.",
      link: "https://www.ev.org.br/trilhas-de-conhecimento/transformacao-digital-e-inovacao",
      categoria: "Tecnologia"
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