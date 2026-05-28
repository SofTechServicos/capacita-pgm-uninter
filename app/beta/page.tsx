'use client'

import { FiCheckCircle } from 'react-icons/fi'
import { usePageStatus } from '../../hooks/usePageStatus'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function BetaPage() {
  const { isActive, loading } = usePageStatus('/beta')
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isActive) {
      router.push('/')
    }
  }, [isActive, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  if (!isActive) {
    return null
  }
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Seção 1: Título Principal */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Seja um dos Primeiros a Experimentar a Inovação Softech
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            A Softech está em busca de parceiros visionários em Paragominas que queiram resolver seus desafios tecnológicos com soluções de ponta e, ao mesmo tempo, ajudar a moldar o futuro dos nossos serviços.
          </p>
        </section>

        {/* Seção 2: "O Que Você Ganha?" */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Como Cliente-Beta, Você Terá Acesso a:
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <FiCheckCircle className="text-green-600 mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <strong>Descontos Exclusivos:</strong> Acesso a serviços selecionados com um desconto de 50% a 100%.
                </div>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="text-green-600 mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <strong>Atendimento Prioritário:</strong> Seu projeto será acompanhado pessoalmente por nosso Arquiteto de Soluções.
                </div>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="text-green-600 mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <strong>Impacto Real no Futuro:</strong> Seu feedback será fundamental para aprimorarmos nossos processos e tecnologias.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 3: "A Nossa Parceria" */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nossa Parceria de Valor Mútuo
          </h2>
          <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg">
              Acreditamos em uma relação de transparência e benefício mútuo. Em troca dessas condições especiais, pedimos apenas o seu compromisso em fornecer um <strong>feedback detalhado</strong> sobre o serviço e um <strong>depoimento genuíno</strong> sobre sua experiência, que poderemos compartilhar para que outras pessoas conheçam a qualidade do nosso trabalho.
            </p>
          </div>
        </section>

        {/* Seção 4: Formulário de Candidatura */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preencha sua Candidatura Abaixo
          </h2>
          <div className="w-full max-w-6xl mx-auto mt-8 p-2 sm:p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="relative overflow-hidden" style={{ paddingTop: '125%' }}>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdT3qAVLd_eaDq86H4qpF70MvDQT0x2xc-ekQd1G8A0MvCcQQ/viewform?embedded=true" 
                className="absolute top-0 left-0 w-full h-full border-0"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}