import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Capacita PGM - Projeto Extensionista UNINTER',
  description: 'Hub de oportunidades de capacitação focado na população de Paragominas - PA.',
  keywords: 'capacitação, cursos, paragominas, uninter, projeto de extensão',
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
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster position="top-right" />
      </body>
    </html>
  )
}