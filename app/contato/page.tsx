'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import ContactForm from '../../components/ContactForm'
import WhatsAppButton from '../../components/WhatsAppButton'

export default function ContatoPage() {


  return (
    <div className="min-h-screen relative overflow-hidden py-16">
      {/* Efeitos de Luz no Fundo (Glowing Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-softech-blue/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
            Entre em Contato
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-softech-blue to-accent-cyan mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Estamos prontos para ajudar você com suas necessidades tecnológicas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-5 shrink-0 shadow-[0_0_15px_theme(colors.green.500/20%)]">
                    <FaWhatsapp className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <p className="text-slate-400 mb-2">(91) 98020-2752</p>
                    <div>
                      <WhatsAppButton 
                        service="Atendimento Geral"
                        size="sm"
                        className="shadow-md hover:shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-softech-blue/20 rounded-full flex items-center justify-center mr-5 shrink-0 shadow-[0_0_15px_theme(colors.accent-cyan/20%)]">
                    <FaPhone className="text-accent-cyan text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Telefone</h3>
                    <a href="tel:5591980202752" className="text-slate-400 hover:text-accent-cyan transition-colors">
                      (91) 98020-2752
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-5 shrink-0 shadow-[0_0_15px_theme(colors.purple.500/20%)]">
                    <FaEnvelope className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">E-mail</h3>
                    <a
                      href="mailto:softechservicosetecnologia@gmail.com"
                      className="text-slate-400 hover:text-purple-400 transition-colors break-all"
                    >
                      softechservicosetecnologia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-5 shrink-0 shadow-[0_0_15px_theme(colors.red.500/20%)]">
                    <FaMapMarkerAlt className="text-red-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Localização</h3>
                    <p className="text-slate-400">Paragominas - PA</p>
                    <p className="text-sm text-slate-500 mt-1">Atendimento presencial e remoto</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mr-5 shrink-0 shadow-[0_0_15px_theme(colors.orange.500/20%)]">
                    <FaClock className="text-orange-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Horário de Atendimento</h3>
                    <p className="text-slate-400">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-slate-400">Sábado: 8h às 12h</p>
                    <p className="text-sm text-slate-500 mt-1">Atendimento via WhatsApp no horário comercial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Siga-nos nas Redes Sociais
              </h2>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/softechservicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full hover:bg-pink-500/20 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_theme(colors.pink.500/10%)]"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://www.tiktok.com/@softechservicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-slate-800 border border-slate-700 text-white rounded-full hover:bg-slate-700 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <FaTiktok size={28} />
                </a>
                <a
                  href="https://www.youtube.com/@softechservicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_theme(colors.red.500/10%)]"
                >
                  <FaYoutube size={28} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 blur-[50px] rounded-full pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-white mb-8 relative z-10">
              Envie sua Mensagem
            </h2>
            <div className="relative z-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}