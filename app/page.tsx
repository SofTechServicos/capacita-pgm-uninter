'use client';

import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen py-24 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Capacita PGM</h1>
      <p className="text-slate-400 mb-8 text-lg">Projeto Extensionista UNINTER - Hub de Oportunidades</p>
      
      <Link href="/gerador" className="px-6 py-3 bg-accent-cyan text-white rounded-lg font-semibold hover:bg-opacity-80 transition-all shadow-lg">
        Acessar Gerador de Currículos
      </Link>
    </div>
  )
}
