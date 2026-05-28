import { Servico } from '../types'

export const servicos: Servico[] = [
  // Serviços Essenciais e de Escritório
  {
    nome: "Auxílio em Serviços Públicos Online",
    valor: 40.00,
    descricao: "Assistência completa e segura para agendamentos, emissões e navegação em portais do governo (Gov.br, INSS, Detran, etc.).",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "/images/services/servicos-publicos-online.png"
  },
  {
    nome: "Suporte para Serviços Bancários Online",
    valor: 35.00,
    descricao: "Auxílio seguro para realizar transações, pagamentos de contas e outras operações em aplicativos e sites de bancos.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "/images/services/servicos-bancarios-online.png"
  },
  {
    nome: "Elaboração e Atualização de Currículo",
    valor: 45.00,
    descricao: "Criação ou modernização do seu currículo com um design profissional que destaca suas qualificações para o mercado de Paragominas.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "/images/services/elaboracao-curriculo.png"
  },
  {
    nome: "Formatação de Trabalhos (Normas ABNT)",
    valor: 50.00,
    descricao: "Garantimos a adequação completa do seu trabalho acadêmico ou relatório às normas da ABNT. (Valor a partir de, para até 15 páginas).",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "/images/services/formatacao-abnt.png"
  },
  {
    nome: "Criação de Documentos e Contratos Simples",
    valor: 40.00,
    descricao: "Redação clara e profissional de declarações, requerimentos e contratos básicos para prestação de serviços, aluguel, etc.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "/images/services/documentos-contratos.png"
  },
  
  // Manutenção e Suporte Técnico
  {
    nome: "Diagnóstico Técnico Completo",
    valor: 70.00,
    descricao: "Identificação precisa de qualquer problema em seu PC, notebook ou impressora. O valor é 100% abatido no custo do conserto, se aprovado.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "/images/services/diagnostico-tecnico.png"
  },
  {
    nome: "Formatação com Backup e Programas Essenciais",
    valor: 150.00,
    descricao: "Deixamos seu computador como novo: sistema reinstalado, otimizado, com backup seguro de seus arquivos e pacote de programas essenciais.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "/images/services/formatacao-backup.png"
  },
  {
    nome: "Pacote 'Softech Turbo': Otimização e Remoção de Vírus",
    valor: 100.00,
    descricao: "Nossa solução completa para lentidão. Inclui remoção de vírus e malwares, limpeza de arquivos e otimização do sistema para máxima performance.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "/images/services/otimizacao-remocao-virus.png"
  },
  {
    nome: "Limpeza Física Interna Completa (PCs e Notebooks)",
    valor: 120.00,
    descricao: "Manutenção preventiva essencial. Inclui limpeza detalhada de componentes e a troca da pasta térmica para evitar superaquecimento.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "/images/services/limpeza-fisica-interna.png"
  },
  {
    nome: "Suporte Técnico Remoto",
    valor: 100.00,
    descricao: "Resolvemos problemas de software, configurações e tiramos dúvidas de forma ágil e segura via acesso remoto (sessão de até 1h).",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "/images/services/suporte-remoto.png"
  },

  // Soluções para Negócios e Presença Online
  {
    nome: "Pacote 'Presença Online Essencial'",
    valor: 150.00,
    descricao: "A forma mais rápida de colocar sua empresa no mapa digital: criamos e otimizamos seu perfil no Google Meu Negócio e contas profissionais.",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "/images/services/presenca-online-essencial.png"
  },
  {
    nome: "Criação de Landing Pages Promocionais",
    valor: 450.00,
    descricao: "Desenvolvimento de uma página única e moderna, focada em converter visitantes em clientes para suas campanhas e eventos. (Valor a partir de).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "/images/services/landing-pages.png"
  },
  {
    nome: "Criação de Sites Institucionais",
    valor: 750.00,
    descricao: "A vitrine profissional da sua empresa na internet. Desenvolvemos um site completo, responsivo e otimizado para ser encontrado no Google. (Valor a partir de).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "/images/services/sites-institucionais.png"
  },
  {
    nome: "Atualização e Manutenção de Site",
    valor: 150.00,
    descricao: "Serviços de manutenção, atualização de conteúdo e correções de segurança em sites já existentes. (Valor por hora ou pacote).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "/images/services/atualizacao-manutencao-site.png"
  },

  // Consultoria e Treinamento
  {
    nome: "Configuração de Backup em Nuvem",
    valor: 80.00,
    descricao: "Proteja seus dados! Implementamos uma rotina de backup automático e seguro no Google Drive ou OneDrive para evitar perdas.",
    categoria: "Consultoria e Treinamento",
    imagem: "/images/services/backup-nuvem.png"
  },
  {
    nome: "Consultoria para Compra de Equipamentos",
    valor: 60.00,
    descricao: "Orientação especializada para a escolha do PC, notebook ou periférico ideal, garantindo o melhor custo-benefício para você.",
    categoria: "Consultoria e Treinamento",
    imagem: "/images/services/consultoria-equipamentos.png"
  },
  {
    nome: "Aulas Básicas de Informática",
    valor: 50.00,
    descricao: "Aulas particulares de informática, internet ou Pacote Office para todos os níveis, com foco nas suas necessidades. (Valor por hora).",
    categoria: "Consultoria e Treinamento",
    imagem: "/images/services/aulas-informatica.png"
  },
  {
    nome: "Consultoria para Licenciamento de Software",
    valor: 300.00,
    descricao: "Auxiliamos sua empresa a adquirir e regularizar as licenças de software necessárias, garantindo conformidade e segurança. (Valor a partir de).",
    categoria: "Consultoria e Treinamento",
    imagem: "/images/services/licenciamento-software.png"
  },
  {
    nome: "Pacote de Manutenção Mensal (Empresas)",
    valor: null,
    descricao: "Plano personalizado de manutenção preventiva e suporte técnico contínuo para garantir a produtividade do seu negócio.",
    categoria: "Consultoria e Treinamento",
    imagem: "/images/services/manutencao-mensal-empresas.png"
  }
]