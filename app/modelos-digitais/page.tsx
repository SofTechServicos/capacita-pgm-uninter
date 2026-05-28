'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaDownload, FaFileExcel, FaFileWord, FaEye } from 'react-icons/fa'

interface ModeloDigital {
  id: string
  nome: string
  categoria: string
  descricao: string
  tipo: 'excel' | 'word'
  preco: number
  arquivo: string
}

// Dados dos modelos disponíveis (baseado nos arquivos encontrados)
const modelosDisponiveis: ModeloDigital[] = [
  {
    id: 'fluxo-caixa',
    nome: 'Fluxo de Caixa Simples',
    categoria: 'Planilhas Financeiras',
    descricao: 'Planilha completa para controle de fluxo de caixa mensal, com categorização de receitas e despesas.',
    tipo: 'excel',
    preco: 25.00,
    arquivo: 'Fluxo_de_Caixa_Simples.xlsx'
  },
  {
    id: 'carta-apresentacao',
    nome: 'Carta de Apresentação Profissional',
    categoria: 'Documentos Profissionais',
    descricao: 'Modelo editável de carta de apresentação para acompanhar currículos e candidaturas.',
    tipo: 'word',
    preco: 15.00,
    arquivo: 'Modelo - Carta de Apresentação Profissional (Editável).docx'
  },
  {
    id: 'contrato-locacao',
    nome: 'Contrato de Locação Residencial',
    categoria: 'Contratos',
    descricao: 'Contrato completo para locação de imóveis residenciais, com todas as cláusulas necessárias.',
    tipo: 'word',
    preco: 30.00,
    arquivo: 'Modelo - Contrato de Locação Residencial (Editável).docx'
  },
  {
    id: 'contrato-servicos',
    nome: 'Contrato de Prestação de Serviços',
    categoria: 'Contratos',
    descricao: 'Modelo de contrato para prestação de serviços diversos, totalmente editável.',
    tipo: 'word',
    preco: 25.00,
    arquivo: 'Modelo - Contrato de Prestação de Serviços (Editável).docx'
  },
  {
    id: 'contrato-kitnet',
    nome: 'Contrato Simplificado de Locação de Kitnet',
    categoria: 'Contratos',
    descricao: 'Contrato específico para locação de kitnets e quitinetes, com termos simplificados.',
    tipo: 'word',
    preco: 20.00,
    arquivo: 'Modelo - Contrato Simplificado de Locação de Kitnet (Editável).docx'
  },
  {
    id: 'declaracao-simples',
    nome: 'Declaração Simples',
    categoria: 'Documentos Oficiais',
    descricao: 'Modelo de declaração simples para diversas finalidades, totalmente personalizável.',
    tipo: 'word',
    preco: 10.00,
    arquivo: 'Modelo - Declaração Simples (Editável).docx'
  },
  {
    id: 'termo-autorizacao',
    nome: 'Termo de Autorização de Uso de Imagem, Voz e Nome',
    categoria: 'Documentos Oficiais',
    descricao: 'Termo completo para autorização de uso de imagem, voz e nome para eventos e publicações.',
    tipo: 'word',
    preco: 20.00,
    arquivo: 'Modelo - Termo de Autorização de Uso de Imagem, Voz e Nome (Editável).docx'
  }
]

export default function ModelosDigitaisPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [revealedPrices, setRevealedPrices] = useState<Set<string>>(new Set())

  const categorias = ['todas', ...Array.from(new Set(modelosDisponiveis.map(m => m.categoria)))]

  const modelosFiltrados = modelosDisponiveis.filter(modelo => {
    const matchesSearch = modelo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         modelo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'todas' || modelo.categoria === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleDownload = (modelo: ModeloDigital, comAssistencia: boolean = false) => {
    const preco = comAssistencia ? modelo.preco + 30 : modelo.preco
    const tipoCompra = comAssistencia ? 'com 1h de assistência' : 'apenas o modelo'
    const mensagem = `Olá! Gostaria de adquirir o modelo digital: *${modelo.nome}*\n\nDescrição: ${modelo.descricao}\n\nTipo: ${modelo.tipo.toUpperCase()}\nCategoria: ${modelo.categoria}\nPreço: R$ ${preco.toFixed(2).replace('.', ',')} (${tipoCompra})\n\nPoderia me ajudar com a compra?`
    
    const url = `https://wa.me/5591980202752?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const togglePriceReveal = (modeloId: string) => {
    setRevealedPrices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(modeloId)) {
        newSet.delete(modeloId)
      } else {
        newSet.add(modeloId)
      }
      return newSet
    })
  }

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
            Nossa Biblioteca de Modelos Digitais
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-softech-blue to-accent-cyan mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Economize tempo e garanta profissionalismo com nossos modelos de planilhas e documentos. 
            Desenvolvidos para otimizar sua rotina pessoal e profissional. Baixe, edite e use imediatamente!
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          {/* Busca */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
            />
          </div>

          {/* Filtro por categoria */}
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
            >
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria === 'todas' ? 'Todas as Categorias' : categoria}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Grid de Modelos */}
        {modelosFiltrados.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-slate-400 text-lg">
              {searchTerm || selectedCategory !== 'todas' 
                ? 'Nenhum modelo encontrado com os critérios de busca.' 
                : 'Nenhum modelo digital disponível no momento. Volte em breve!'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modelosFiltrados.map((modelo) => (
              <motion.div variants={itemVariants} key={modelo.id} className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl shadow-xl hover:shadow-[0_0_25px_theme(colors.accent-cyan/15%)] transition-all duration-300 hover:border-accent-cyan/50 flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  {/* Ícone do tipo de arquivo */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-softech-blue/20 border border-softech-blue/30 shadow-inner">
                    {modelo.tipo === 'excel' ? (
                      <FaFileExcel className="text-green-400 text-3xl" />
                    ) : (
                      <FaFileWord className="text-accent-cyan text-3xl" />
                    )}
                  </div>

                  {/* Informações do modelo */}
                  <div className="text-center mb-6 flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {modelo.nome}
                    </h3>
                    <span className="inline-block bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full mb-4">
                      {modelo.categoria}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {modelo.descricao}
                    </p>
                  </div>

                  {/* Preço e botão */}
                  <div className="border-t border-slate-700 pt-6 mt-auto">
                    {!revealedPrices.has(modelo.id) ? (
                      <div className="mb-4">
                        <button
                          onClick={() => togglePriceReveal(modelo.id)}
                          className="w-full bg-gradient-to-r from-softech-blue to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:brightness-110 transition-all duration-300 flex items-center justify-center group shadow-lg"
                        >
                          <FaEye className="mr-2 group-hover:scale-110 transition-transform" />
                          Clique para Ver o Preço
                        </button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-accent-cyan">
                              R$ {modelo.preco.toFixed(2).replace('.', ',')}
                            </span>
                            <p className="text-xs text-slate-400">Apenas o modelo</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-semibold text-green-400">
                              R$ {(modelo.preco + 30).toFixed(2).replace('.', ',')}
                            </span>
                            <p className="text-xs text-slate-400">Com 1h de assistência</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {revealedPrices.has(modelo.id) && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        <button
                          onClick={() => handleDownload(modelo, false)}
                          className="w-full bg-softech-blue text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all text-sm flex items-center justify-center"
                        >
                          <FaDownload className="mr-2" />
                          Comprar Modelo
                        </button>
                        <button
                          onClick={() => handleDownload(modelo, true)}
                          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all text-sm flex items-center justify-center"
                        >
                          Comprar com Assistência
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Informações adicionais */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Como Funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-softech-blue/20 border border-softech-blue/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.accent-cyan/20%)]">
                <span className="text-accent-cyan font-bold text-2xl">1</span>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Escolha seu Modelo</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Navegue por nossa biblioteca e encontre o modelo ideal para sua necessidade.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-softech-blue/20 border border-softech-blue/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.accent-cyan/20%)]">
                <span className="text-accent-cyan font-bold text-2xl">2</span>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Solicite via WhatsApp</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Clique em "Comprar" para gerar uma mensagem automática. Realize o pagamento seguro via PIX.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-softech-blue/20 border border-softech-blue/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_theme(colors.accent-cyan/20%)]">
                <span className="text-accent-cyan font-bold text-2xl">3</span>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Receba e Use</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Após a confirmação, você recebe o arquivo por e-mail ou WhatsApp. Edite e use quantas vezes quiser!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}