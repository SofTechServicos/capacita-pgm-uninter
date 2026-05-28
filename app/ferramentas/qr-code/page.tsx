import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Gerador QR Code Online Grátis - Crie QR Codes Instantaneamente',
  description: 'Gerador de QR Code online 100% gratuito. Crie QR codes para URLs, WhatsApp, WiFi e textos. Instantâneo e sem cadastro!',
  alternates: {
    canonical: 'https://softechservicos.vercel.app/ferramentas/qr-code'
  }
}

export default function QRCodePage() {
  redirect('/ferramentas#qr-generator')
}