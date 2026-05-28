import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Contador de Caracteres e Palavras Online Grátis',
  description: 'Contador de caracteres, palavras e linhas online gratuito. Análise completa de texto com tempo de leitura. Instantâneo!',
  alternates: {
    canonical: 'https://softechservicos.vercel.app/ferramentas/contador-texto'
  }
}

export default function TextCounterPage() {
  redirect('/ferramentas#text-counter')
}