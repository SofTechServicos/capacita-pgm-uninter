'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Componente {
  tipo: string
  nome: string
  linkAfiliado: string
}

interface Build {
  id: string
  nomeBuild: string
  precoTotalEstimado: number
  descricao: string
  ativo: boolean
  ordem: number
  componentes: Componente[]
}

export default function BuildsRecomendadas() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const buildsRef = collection(db, 'builds')
        const q = query(
          buildsRef,
          where('ativo', '==', true),
          orderBy('ordem', 'asc')
        )
        
        const querySnapshot = await getDocs(q)
        const buildsData: Build[] = []
        
        querySnapshot.forEach((doc) => {
          buildsData.push({
            id: doc.id,
            ...doc.data()
          } as Build)
        })
        
        setBuilds(buildsData)
      } catch (err) {
        console.error('Erro ao buscar builds:', err)
        setError('Erro ao carregar builds recomendadas')
      } finally {
        setLoading(false)
      }
    }

    fetchBuilds()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

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

  if (loading) {
    return (
      <section className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Builds Recomendadas
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-softech-blue"></div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Builds Recomendadas
        </h2>
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Builds Recomendadas
      </h2>
      
      {builds.length === 0 ? (
        <div className="text-center text-slate-300">
          <p>Nenhuma build disponível no momento.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {builds.map((build, index) => (
            <motion.div variants={itemVariants} key={build.id} className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-6 hover:border-accent-cyan/50 hover:shadow-[0_0_20px_theme(colors.accent-cyan/15%)] transition-all duration-300 flex flex-col transform hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {build.nomeBuild}
                </h3>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-400 mb-4">
                  {formatPrice(build.precoTotalEstimado)}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {build.descricao}
                </p>
              </div>
              
              <div className="mb-6 flex-grow">
                <h4 className="font-semibold text-white mb-3">Componentes:</h4>
                <ul className="space-y-2">
                  {build.componentes.map((componente, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium text-slate-400">
                        {componente.tipo}:
                      </span>{' '}
                      <a
                        href={componente.linkAfiliado}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-softech-blue hover:text-blue-800 hover:underline"
                      >
                        {componente.nome}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <Link
                  href="/contato"
                  className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  Contrate a SOFTECH para Montagem e Otimização
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}