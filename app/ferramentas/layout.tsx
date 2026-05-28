import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gerador QR Code, Senhas Seguras, Base64 e Contador Texto Online Grátis',
  description: '4 ferramentas online essenciais: Gerador QR Code grátis, Gerador senhas seguras, Conversor Base64 e Contador caracteres. 100% gratuito, sem cadastro, funciona offline.',
  keywords: [
    'gerador qr code online gratis',
    'gerador senha segura',
    'conversor base64 online',
    'contador caracteres palavras',
    'qr code generator',
    'password generator',
    'ferramentas online gratuitas',
    'softech'
  ],
  openGraph: {
    title: 'Ferramentas Online Mais Procuradas - QR Code, Senhas, Base64',
    description: 'Gerador QR Code, Senhas Seguras, Base64 e Contador de Texto. Mais de 145K buscas/mês. Gratuito e sem cadastro.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SofTech Serviços e Tecnologia'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://softechservicos.vercel.app/ferramentas'
  }
};

export default function FerramentasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ferramentas Online Gratuitas SofTech',
    description: 'Gerador QR Code, Senhas Seguras, Base64 e Contador de Texto online gratuito',
    url: 'https://softechservicos.vercel.app/ferramentas',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    provider: {
      '@type': 'Organization',
      name: 'SofTech Serviços e Tecnologia',
      url: 'https://softechservicos.vercel.app'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}