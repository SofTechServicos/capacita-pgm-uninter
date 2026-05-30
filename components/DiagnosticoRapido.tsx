'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DiagnosticoNode {
  question?: string
  options?: Array<{
    text: string
    next: string
  }>
  solution?: string
}

const diagnosticoTree: Record<string, DiagnosticoNode> = {
  'start': {
    question: 'Qual é o principal sintoma do seu computador?',
    options: [
      { text: 'O PC não liga', next: 'naoLiga' },
      { text: 'O PC está muito lento', next: 'pcLento' },
      { text: 'Estou vendo uma Tela Azul', next: 'telaAzul' },
      { text: 'Problemas com internet', next: 'internet' }
    ]
  },
  'naoLiga': {
    question: 'Ele faz algum barulho ou acende alguma luz ao apertar o botão de ligar?',
    options: [
      { text: 'Não, está completamente morto', next: 'solucaoEnergia' },
      { text: 'Sim, ele faz bipes', next: 'solucaoBipes' },
      { text: 'Sim, as ventoinhas giram, mas não dá vídeo', next: 'solucaoSemVideo' }
    ]
  },
  'pcLento': {
    question: 'Quando o PC fica mais lento?',
    options: [
      { text: 'Sempre, desde que liga', next: 'solucaoLentoSempre' },
      { text: 'Apenas ao abrir programas', next: 'solucaoLentoProgramas' },
      { text: 'Navegando na internet', next: 'solucaoLentoInternet' }
    ]
  },
  'telaAzul': {
    question: 'Com que frequência aparece a tela azul?',
    options: [
      { text: 'Sempre que ligo o PC', next: 'solucaoTelaAzulSempre' },
      { text: 'Ocasionalmente, sem padrão', next: 'solucaoTelaAzulOcasional' },
      { text: 'Ao usar programas específicos', next: 'solucaoTelaAzulProgramas' }
    ]
  },
  'internet': {
    question: 'Qual é o problema específico com a internet?',
    options: [
      { text: 'Internet muito lenta', next: 'solucaoInternetLenta' },
      { text: 'Não conecta ao Wi-Fi', next: 'solucaoWifi' },
      { text: 'Conecta mas não navega', next: 'solucaoConectaSemNavegar' }
    ]
  },
  // Soluções
  'solucaoEnergia': {
    solution: 'O problema pode ser a fonte de alimentação ou o cabo de energia. Verifique se o cabo está bem conectado na tomada e no PC. Tente usar outra tomada. Se não resolver, a fonte pode precisar ser substituída.'
  },
  'solucaoBipes': {
    solution: 'Os bipes indicam problemas de hardware. Conte quantos bipes são emitidos e consulte o manual da placa-mãe. Geralmente indica problemas na memória RAM ou placa de vídeo. Tente retirar e recolocar a memória RAM.'
  },
  'solucaoSemVideo': {
    solution: 'Se as ventoinhas giram mas não há vídeo, pode ser problema na placa de vídeo, cabo do monitor ou memória RAM. Verifique se o cabo do monitor está bem conectado e tente retirar e recolocar a memória RAM.'
  },
  'solucaoLentoSempre': {
    solution: 'PC lento desde a inicialização pode indicar HD com problemas, pouca memória RAM ou muitos programas iniciando junto com o Windows. Considere fazer uma limpeza do sistema e verificar o HD.'
  },
  'solucaoLentoProgramas': {
    solution: 'Lentidão ao abrir programas geralmente indica falta de memória RAM ou HD fragmentado. Feche programas desnecessários e considere aumentar a memória RAM.'
  },
  'solucaoLentoInternet': {
    solution: 'Lentidão na internet pode ser problema no navegador com muitas extensões, vírus ou problema na conexão. Tente usar outro navegador e faça uma verificação de vírus.'
  },
  'solucaoTelaAzulSempre': {
    solution: 'Tela azul constante indica problema grave de hardware ou driver. Pode ser memória RAM defeituosa, HD com problemas ou driver incompatível. É recomendado fazer um teste de memória.'
  },
  'solucaoTelaAzulOcasional': {
    solution: 'Telas azuis ocasionais podem ser causadas por superaquecimento, drivers desatualizados ou problemas de memória. Verifique a temperatura do PC e atualize os drivers.'
  },
  'solucaoTelaAzulProgramas': {
    solution: 'Se a tela azul aparece com programas específicos, pode ser incompatibilidade de software ou driver. Tente atualizar o programa problemático e os drivers do sistema.'
  },
  'solucaoInternetLenta': {
    solution: 'Internet lenta pode ser problema no provedor, muitos dispositivos conectados ou configuração do roteador. Teste a velocidade em speedtest.net e reinicie o roteador.'
  },
  'solucaoWifi': {
    solution: 'Problemas de Wi-Fi podem ser senha incorreta, driver da placa de rede desatualizado ou problema no roteador. Verifique se outros dispositivos conectam normalmente.'
  },
  'solucaoConectaSemNavegar': {
    solution: 'Se conecta mas não navega, pode ser problema de DNS ou configuração de rede. Tente usar DNS público (8.8.8.8) ou execute o comando "ipconfig /flushdns" no prompt de comando.'
  }
}

export default function DiagnosticoRapido() {
  const [currentNode, setCurrentNode] = useState('start')

  const handleOptionClick = (next: string) => {
    setCurrentNode(next)
  }

  const handleReset = () => {
    setCurrentNode('start')
  }

  const currentData = diagnosticoTree[currentNode]

  return (
    <section className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Diagnóstico Rápido
      </h2>
      
      <div className="max-w-3xl mx-auto">
        {currentData.question && (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-8">
              {currentData.question}
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {currentData.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.next)}
                  className="bg-softech-blue hover:brightness-110 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 text-left"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentData.solution && (
          <div className="text-center">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">
                Possível Solução:
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentData.solution}
              </p>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-6">
              <p className="text-slate-300 mb-4">
                Não se sente confortável para fazer isso ou o problema persiste?
                <br />
                <strong>Deixe que um especialista resolva.</strong>
              </p>
              <Link
                href="/contato"
                className="inline-block bg-green-600 hover:brightness-110 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Falar com a SOFTECH
              </Link>
            </div>
            
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Fazer Novo Diagnóstico
            </button>
          </div>
        )}
      </div>
    </section>
  )
}