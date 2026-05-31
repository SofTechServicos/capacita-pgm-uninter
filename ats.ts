export interface DadosPessoais {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  cidadeEstado: string;
}

export interface Experiencia {
  cargo: string;
  empresa: string;
  dataInicio: string;
  dataFim: string;
  atual: boolean;
  descricao: string[];
}

export interface Formacao {
  curso: string;
  instituicao: string;
  anoConclusao: string;
}

export interface CurriculoATS {
  dadosPessoais: DadosPessoais;
  resumo: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string[];
}