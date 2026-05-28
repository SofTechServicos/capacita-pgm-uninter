'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTool, FiImage, FiFileText, FiLock, FiZap, FiDownload } from 'react-icons/fi';
import QRGenerator from '../../components/tools/QRGenerator';
import PasswordGenerator from '../../components/tools/PasswordGenerator';
import TextCounter from '../../components/tools/TextCounter';
import Base64Converter from '../../components/tools/Base64Converter';

const tools = [
  {
    id: 'qr-generator',
    name: 'Gerador de QR Code Online Grátis',
    description: 'Crie QR codes instantaneamente para URLs, textos, WhatsApp e telefones',
    icon: FiZap,
    component: QRGenerator
  },
  {
    id: 'password-generator',
    name: 'Gerador de Senhas Seguras',
    description: 'Gere senhas fortes e seguras com até 50 caracteres',
    icon: FiLock,
    component: PasswordGenerator
  },
  {
    id: 'base64-converter',
    name: 'Conversor Base64 Online',
    description: 'Codifique e decodifique texto em Base64 instantaneamente',
    icon: FiDownload,
    component: Base64Converter
  },
  {
    id: 'text-counter',
    name: 'Contador de Caracteres e Palavras',
    description: 'Conte caracteres, palavras, linhas e tempo de leitura',
    icon: FiFileText,
    component: TextCounter
  }
];

export default function FerramentasPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const selectedToolData = tools.find(tool => tool.id === selectedTool);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Efeitos de Luz no Fundo (Glowing Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-softech-blue/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
            Ferramentas Online Gratuitas Essenciais
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-softech-blue to-accent-cyan mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Um kit com 4 ferramentas essenciais: QR Code, Gerador de Senhas, Base64 e Contador de Texto. 
            <strong className="text-white block mt-2">100% gratuito, sem cadastro e direto no seu navegador.</strong>
          </p>
        </motion.div>

        {/* Tool View */}
        {selectedTool && selectedToolData ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6 md:p-10 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-softech-blue/20 border border-softech-blue/30 rounded-xl">
                  <selectedToolData.icon className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedToolData.name}</h2>
                  <p className="text-slate-400">{selectedToolData.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                ← Voltar
              </button>
            </div>
            <selectedToolData.component />
          </motion.div>
        ) : (
            /* Tools Grid */
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {tools.map((tool) => (
                <motion.div
                  variants={itemVariants}
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-xl hover:shadow-[0_0_30px_theme(colors.accent-cyan/15%)] transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:border-accent-cyan/50 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-softech-blue/20 border border-softech-blue/30 rounded-2xl group-hover:bg-accent-cyan/20 transition-colors shadow-inner">
                      <tool.icon className="w-8 h-8 text-accent-cyan group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="px-4 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-full font-bold tracking-wide uppercase">
                      Gratuito
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">{tool.name}</h2>
                  <p className="text-slate-400 mb-8 text-base flex-grow leading-relaxed">{tool.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                    <div className="flex items-center text-accent-cyan font-bold text-lg group-hover:translate-x-2 transition-transform duration-300">
                      Acessar Ferramenta <span className="ml-2">→</span>
                    </div>
                    <div className="text-xs font-medium text-slate-500 bg-slate-800 px-3 py-1.5 rounded-lg">
                      ⚡ Instantâneo
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        )}

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Por que usar nossas ferramentas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.green.500/20%)]">
                <FiLock className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Seguro</h3>
              <p className="text-slate-400 leading-relaxed">
                Tudo funciona no seu navegador. Seus arquivos nunca saem do seu computador.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-softech-blue/20 border border-softech-blue/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.accent-cyan/20%)]">
                <FiZap className="w-8 h-8 text-accent-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rápido e Gratuito</h3>
              <p className="text-slate-400 leading-relaxed">
                Sem cadastros, sem limites, sem taxas. Use quantas vezes quiser.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.purple.500/20%)]">
                <FiTool className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fácil de Usar</h3>
              <p className="text-slate-400 leading-relaxed">
                Interface intuitiva e moderna. Resultados instantâneos com poucos cliques.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}