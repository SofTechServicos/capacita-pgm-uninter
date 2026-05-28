import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacita PGM - Hub de Capacitação Profissional Gratuita | Paragominas',
  description: 'Projeto de extensão universitária oferecendo 30+ cursos gratuitos e kit de ferramentas profissionais para a comunidade de Paragominas. Alinhado com ODS 4, 8, 10 e 11.',
  keywords: 'capacitação profissional, cursos gratuitos, Paragominas, extensão universitária, ODS, educação, MEI, empregabilidade',
  authors: [{ name: 'Elio Alves Queiroz Junior', url: 'https://softechservicos.vercel.app' }],
  creator: 'SofTech Serviços e Tecnologia',
  publisher: 'SofTech Serviços e Tecnologia',
  openGraph: {
    title: 'Capacita PGM - Hub de Oportunidades de Capacitação para Paragominas',
    description: 'Projeto acadêmico de extensão oferecendo cursos gratuitos e ferramentas profissionais para desenvolvimento local.',
    url: 'https://softechservicos.vercel.app/capacita-pgm',
    siteName: 'SofTech Serviços e Tecnologia',
    type: 'website',
    locale: 'pt_BR'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  category: 'education'
}