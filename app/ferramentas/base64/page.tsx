import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Conversor Base64 Online Grátis - Codificar e Decodificar',
  description: 'Conversor Base64 online gratuito. Codifique e decodifique texto em Base64 instantaneamente. Sem upload!',
  alternates: {
    canonical: 'https://softechservicos.vercel.app/ferramentas/base64'
  }
}

export default function Base64Page() {
  redirect('/ferramentas#base64-converter')
}