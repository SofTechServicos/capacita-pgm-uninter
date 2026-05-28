import { Metadata } from 'next';
import { GeradorClientPage } from './GeradorClientPage'; // The component we just renamed

export const metadata: Metadata = {
  title: "Gerador de Currículo Grátis ATS - Capacita PGM Paragominas",
  description: "Crie seu currículo profissional otimizado para vagas de emprego em Paragominas. Ferramenta gratuita, sem cadastro e padrão Harvard.",
  keywords: "currículo grátis, paragominas, emprego, gerador de currículo, modelo ats",
};

export default function GeradorPage() {
  return <GeradorClientPage />;
}
