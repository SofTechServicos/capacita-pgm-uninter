// Types for the ATS resume generator

export interface DadosPessoais {
  nome: string;
  email: string;
  telefone: string;
  linkedin?: string;
  cidadeEstado?: string;
}

export interface Experiencia {
  cargo: string;
  empresa: string;
  dataInicio: string; // could be month/year or full date
  dataFim?: string;   // optional for "Atual"
  atual?: boolean;
  descricao: string[]; // lista de tópicos
}

export interface Formacao {
  curso: string;
  instituicao: string;
  anoConclusao: string;
}

export interface Habilidades {
  itens: string[]; // lista de habilidades
}

export interface CurriculoATS {
  dadosPessoais: DadosPessoais;
  resumo?: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string[]; // simplificado
}