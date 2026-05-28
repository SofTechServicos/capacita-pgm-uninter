import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gerador de Senhas Seguras Online Grátis - Senhas Fortes',
  description: 'Gerador de senhas seguras online gratuito. Crie senhas fortes com até 32 caracteres. 100% seguro e privado!',
  alternates: {
    canonical: 'https://softechservicos.vercel.app/ferramentas/gerador-senhas'
  }
}

export default function PasswordPage() {
  redirect('/ferramentas#password-generator')
}