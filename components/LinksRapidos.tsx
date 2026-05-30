'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCogs, FaBlog, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa'

const links = [
  {
    title: 'Nossos Serviços',
    description: 'Conheça todos os serviços oferecidos pela SOFTECH',
    href: '/servicos',
    icon: FaCogs,
    color: 'bg-softech-blue hover:brightness-110'
  },
  {
    title: 'Blog e Dicas',
    description: 'Artigos e dicas sobre tecnologia e informática',
    href: '/blog',
    icon: FaBlog,
    color: 'bg-green-600 hover:brightness-110'
  },
  {
    title: 'Sobre a SOFTECH',
    description: 'Saiba mais sobre nossa empresa e missão',
    href: '/#sobre',
    icon: FaInfoCircle,
    color: 'bg-purple-600 hover:brightness-110'
  },
  {
    title: 'Perguntas Frequentes',
    description: 'Respostas para as dúvidas mais comuns',
    href: '/faq',
    icon: FaQuestionCircle,
    color: 'bg-orange-600 hover:brightness-110'
  }
]

export default function LinksRapidos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <section className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Links Rápidos
      </h2>
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {links.map((link, index) => {
          const IconComponent = link.icon
          
          return (
            <motion.div variants={itemVariants} key={index}>
              <Link
                href={link.href}
                className={`${link.color} text-white rounded-2xl p-6 text-center transition-all duration-300 group hover:scale-105 hover:shadow-xl flex flex-col h-full items-center justify-center border border-white/10`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                    <IconComponent className="text-3xl group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-lg">
                    {link.title}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed text-slate-100">
                    {link.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}