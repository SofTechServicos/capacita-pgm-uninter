import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppWidget from '../components/WhatsAppWidget'
import BackToTop from '../components/BackToTop'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SofTech - Soluções em Tecnologia',
  description: 'Otimizando Processos. Simplificando a Tecnologia.',
  keywords: 'tecnologia, suporte técnico, sites, formatação, impressão, Paragominas',
  verification: {
    google: '9HPqm_zrbMSTUNAgy2vtbyCUWF0YUdC2M1pTN_ygKTA',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size antialiased selection:bg-accent-cyan selection:text-white`}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
          <BackToTop />
          <Toaster position="top-right" />
          <GoogleAnalytics GA_MEASUREMENT_ID="G-V4DBK5NVH6" />
      </body>
    </html>
  )
}