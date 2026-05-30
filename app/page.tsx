'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiBookOpen, FiAward, FiFileText } from 'react-icons/fi'

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-cyan/20 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-sm font-semibold tracking-wide uppercase"
          >
            Projeto Extensionista UNINTER
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Capacita <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">PGM</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Um hub de oportunidades focado na população de Paragominas. 
            Crie seu currículo profissional, acesse guias práticos e descubra cursos de qualificação gratuitos.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1: Gerador */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-accent-cyan/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <FiFileText className="text-3xl text-accent-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Gerador de Currículos</h2>
            <p className="text-slate-400 mb-8 flex-grow">
              Ferramenta gratuita para criar currículos otimizados para sistemas de RH (ATS). Exporte em PDF pronto para enviar.
            </p>
            <Link href="/gerador" className="w-full py-4 flex justify-center bg-accent-cyan hover:bg-cyan-400 text-slate-900 text-center font-bold rounded-xl transition-all shadow-[0_0_20px_theme(colors.cyan.400/30%)]">
              Acessar Gerador →
            </Link>
          </motion.div>

          {/* Card 2: Guias */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <FiBookOpen className="text-3xl text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Guias Práticos</h2>
            <p className="text-slate-400 mb-8 flex-grow">
              Materiais de estudo, dicas de entrevista e manuais passo a passo para se destacar no mercado de trabalho.
            </p>
            <Link href="/guias" className="w-full py-4 flex justify-center bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-center font-bold rounded-xl transition-all">
              Ver Guias
            </Link>
          </motion.div>

          {/* Card 3: Cursos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <FiAward className="text-3xl text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Cursos Gratuitos</h2>
            <p className="text-slate-400 mb-8 flex-grow">
              Mapeamento de oportunidades de cursos de qualificação gratuitos do Governo e instituições parceiras.
            </p>
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-400 text-center font-bold rounded-xl transition-all cursor-not-allowed">
              Em Breve
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
