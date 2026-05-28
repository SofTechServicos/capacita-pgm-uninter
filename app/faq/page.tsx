'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Como funciona o suporte remoto?",
    answer: "Utilizamos ferramentas seguras para acessar seu computador com sua permissão e resolver problemas de software à distância. Você acompanha todo o processo na sua tela."
  },
  {
    question: "Vocês consertam problemas físicos no meu computador (hardware)?",
    answer: "Nosso foco é em software, sistemas e serviços digitais. Realizamos diagnósticos e upgrades (como instalação de SSD e RAM), mas não reparos eletrônicos complexos."
  },
  {
    question: "Como é feito o pagamento?",
    answer: "Aceitamos PIX e cartões. Para serviços, o pagamento é realizado após a conclusão. Para produtos, o pagamento é antecipado."
  },
  {
    question: "Em quanto tempo meu serviço é entregue?",
    answer: "A agilidade é nosso lema! Serviços rápidos como auxílio em portais são feitos na hora. Projetos maiores como sites têm o prazo combinado diretamente com você."
  },
  {
    question: "Vocês atendem em domicílio?",
    answer: "Sim! Oferecemos atendimento presencial em Paragominas e região para serviços que necessitam de presença física, como manutenção de hardware e configuração de equipamentos."
  },
  {
    question: "Qual a garantia dos serviços?",
    answer: "Oferecemos garantia de 30 dias para formatações e 15 dias para outros serviços técnicos. Sites e sistemas têm garantia de 90 dias contra defeitos de funcionamento."
  },
  {
    question: "Vocês trabalham com empresas?",
    answer: "Sim! Oferecemos pacotes especiais para empresas, incluindo manutenção preventiva, suporte técnico contínuo e desenvolvimento de soluções personalizadas."
  },
  {
    question: "Como posso acompanhar o andamento do meu serviço?",
    answer: "Mantemos contato direto via WhatsApp durante todo o processo, enviando atualizações e fotos quando necessário. Transparência total!"
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen py-16 bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-lg text-slate-300">
            Tire suas dúvidas sobre nossos serviços e processos
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-800/60 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <FaChevronUp className="text-accent-cyan flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-accent-cyan flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-slate-300 mb-6">
            Entre em contato conosco! Estamos sempre prontos para esclarecer suas dúvidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5593981154627"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
            >
              WhatsApp
            </a>
            <a
              href="mailto:softechservicosetecnologia@gmail.com"
              className="bg-softech-blue text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
            >
              E-mail
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}