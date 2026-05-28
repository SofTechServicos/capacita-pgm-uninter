import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaCheckCircle, FaCalendarAlt, FaMoneyBillWave, FaUsers, FaFileAlt } from 'react-icons/fa'

export default function GuiaMEIPage() {
  return (
    <div className="bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size relative overflow-hidden">
      {/* Efeitos de Luz no Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-softech-blue/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/80 to-transparent py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/capacita-pgm" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <FaArrowLeft className="mr-2" />
            Voltar para Capacita PGM
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            🏢 Guia Completo: O que é o MEI e Como se Formalizar
          </h1>
          <p className="text-lg opacity-90">
            Tudo que você precisa saber para se tornar um Microempreendedor Individual
          </p>
        </div>
      </div>

      {/* Links Rápidos */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12">
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">🚀 Já está decidido?</h2>
            <p className="text-lg opacity-90 mb-6">
              Acesse os links oficiais aqui e formalize seu MEI agora mesmo:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-softech-blue hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
              >
                <span>🏢</span>
                Portal Oficial do MEI
              </a>
              <a 
                href="https://www.gov.br/pt-br/servicos/criar-sua-conta-meu-gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-700/50 backdrop-blur-sm text-slate-200 font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all duration-300 border border-slate-600"
              >
                <span>🔑</span>
                Criar Conta GOV.BR
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introdução */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4 border border-blue-500/20">
              <span className="text-3xl">💼</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">O que é o MEI?</h2>
              <p className="text-slate-400">Microempreendedor Individual</p>
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            O Microempreendedor Individual (MEI) é uma categoria empresarial criada para formalizar trabalhadores autônomos no Brasil. 
            É um regime tributário simplificado que permite ao empreendedor ter um CNPJ, emitir notas fiscais e ter acesso a benefícios previdenciários.
          </p>
        </div>

        {/* Resumo em Áudio */}
        <div className="bg-gradient-to-r from-green-600/80 to-blue-600/80 text-white rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-6">
            <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/20">
              <span className="text-2xl">🎙️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Raio-X do MEI em Áudio</h2>
              <p className="opacity-80">Escute o essencial sobre o MEI enquanto navega</p>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg mb-6">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <span className="text-lg">🎧</span>
                </div>
                <div>
                  <p className="font-medium">Guia MEI - Tudo que Você Precisa Saber</p>
                  <p className="text-sm opacity-70">Duração: ~2 minutos</p>
                </div>
              </div>
              <audio controls className="w-full bg-black/20 rounded-lg">
                <source src="/guias/Guia O que é o MEI e Como se Formalizar.m4a" type="audio/mp4" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
            <p className="text-sm text-white/90">
              <strong className="text-white">Conteúdo do áudio:</strong> O que é o MEI, vantagens, requisitos, processo de formalização, 
              custos mensais, obrigações e benefícios previdenciários.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h3 className="font-bold text-green-300 mb-2">✅ Principais Vantagens</h3>
              <ul className="text-green-400 space-y-1 text-sm">
                <li>• Formalização gratuita e online</li>
                <li>• CNPJ imediato</li>
                <li>• Tributação simplificada</li>
                <li>• Benefícios previdenciários</li>
                <li>• Emissão de notas fiscais</li>
              </ul>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h3 className="font-bold text-blue-300 mb-2">📋 Requisitos Básicos</h3>
              <ul className="text-blue-400 space-y-1 text-sm">
                <li>• Faturamento até R$ 81.000/ano</li>
                <li>• Máximo 1 funcionário</li>
                <li>• Atividade na lista permitida</li>
                <li>• Não ser sócio de outra empresa</li>
                <li>• Conta Gov.br Prata/Ouro</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vídeo Tutorial */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-red-500/10 p-3 rounded-full mr-4 border border-red-500/20">
              <span className="text-2xl">🎥</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Vídeo Tutorial Oficial</h2>
              <p className="text-slate-400">SEBRAE explica como abrir seu MEI</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/y7OVwLCd0ag" 
                title="Como Abrir MEI - Passo a Passo Completo - Sebrae" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Dica:</strong> Assista ao vídeo oficial do SEBRAE para acompanhar visualmente todo o processo de abertura do MEI. 
              É mais fácil seguir as instruções quando você vê na prática!
            </p>
          </div>
        </div>

        {/* Processo de Formalização */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-purple-500/10 p-3 rounded-full mr-4 border border-purple-500/20">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Como se Formalizar</h2>
              <p className="text-slate-400">Passo a passo completo</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-softech-blue text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-bold text-white mb-2">Acesse o Portal do Empreendedor</h3>
                <p className="text-slate-300 mb-2">Entre no site oficial: <strong>www.gov.br/empresas-e-negocios</strong></p>
                <p className="text-slate-400 text-sm">Clique em "FORMALIZE-SE" e faça login com sua conta Gov.br</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-softech-blue text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-bold text-white mb-2">Preencha seus Dados</h3>
                <p className="text-slate-300 mb-2">Informe dados pessoais, nome empresarial e capital social (mín. R$ 1,00)</p>
                <p className="text-slate-400 text-sm">Tenha em mãos: CPF, RG, comprovante de residência</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-softech-blue text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-bold text-white mb-2">Escolha sua Atividade</h3>
                <p className="text-slate-300 mb-2">Selecione 1 atividade principal e até 15 secundárias</p>
                <p className="text-slate-400 text-sm">Consulte a lista oficial de atividades permitidas (CNAE)</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-softech-blue text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mr-4 mt-1">4</div>
              <div>
                <h3 className="font-bold text-white mb-2">Confirme e Finalize</h3>
                <p className="text-slate-300 mb-2">Revise todos os dados e confirme as declarações</p>
                <p className="text-slate-400 text-sm">Receba imediatamente o CCMEI com seu CNPJ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Obrigações e Custos */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-500/10 p-3 rounded-full mr-4 border border-green-500/20">
              <FaMoneyBillWave className="text-2xl text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Custos e Obrigações</h2>
              <p className="text-slate-400">Valores atualizados para 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">R$ 76,90</div>
              <div className="text-sm text-blue-300 font-medium">Comércio/Indústria</div>
              <div className="text-xs text-blue-500 mt-1">INSS + ICMS</div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">R$ 80,90</div>
              <div className="text-sm text-green-300 font-medium">Serviços</div>
              <div className="text-xs text-green-500 mt-1">INSS + ISS</div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">R$ 81,90</div>
              <div className="text-sm text-purple-300 font-medium">Mista</div>
              <div className="text-xs text-purple-500 mt-1">INSS + ICMS + ISS</div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="text-yellow-400 mr-2" />
              <h3 className="font-bold text-yellow-300">Obrigações Importantes</h3>
            </div>
            <ul className="text-yellow-400 space-y-1 text-sm">
              <li>• <strong>DAS-MEI:</strong> Pagamento até o dia 20 de cada mês</li>
              <li>• <strong>DASN-SIMEI:</strong> Declaração anual até 31 de maio</li>
              <li>• <strong>Nota Fiscal:</strong> Emitir quando solicitada pelo cliente</li>
            </ul>
          </div>
        </div>

        {/* Benefícios Previdenciários */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-orange-500/10 p-3 rounded-full mr-4 border border-orange-500/20">
              <span className="text-3xl">🛡️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Benefícios Previdenciários</h2>
              <p className="text-slate-400">Direitos garantidos pelo INSS</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white mb-3">✅ Benefícios Garantidos</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-sm">Aposentadoria por Idade</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-sm">Auxílio por Incapacidade</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-sm">Salário-Maternidade</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-sm">Pensão por Morte (dependentes)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-3">⏰ Períodos de Carência</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• <strong>Aposentadoria:</strong> 15-20 anos</li>
                <li>• <strong>Auxílio Incapacidade:</strong> 12 meses</li>
                <li>• <strong>Salário-Maternidade:</strong> 10 meses</li>
                <li>• <strong>Pensão por Morte:</strong> Sem carência</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Infográfico Final */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Raio-X do MEI: O Essencial para 2025</h2>
            <p className="text-slate-400">Sua "cola" visual com tudo sobre o MEI</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-slate-700">
            <img 
              src="/guias/Guia MEI Infográfico I.png" 
              alt="Infográfico: Raio-X do MEI 2025"
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="flex justify-center">
              <a 
                href="/guias/Guia MEI Infográfico I.png" 
                download
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                📱 Baixar Infográfico
              </a>
            </div>
          </div>
        </div>

        {/* Links Úteis */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="bg-slate-800 p-3 rounded-full mr-4 border border-slate-700">
              <FaFileAlt className="text-2xl text-slate-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Links Úteis</h2>
              <p className="text-slate-400">Portais oficiais para formalização</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors border border-blue-500/20"
            >
              <span className="text-2xl mr-3">🌐</span>
              <div>
                <div className="font-medium text-blue-300">Portal do Empreendedor</div>
                <div className="text-sm text-blue-400">Formalização oficial</div>
              </div>
            </a>
            
            <a 
              href="https://servicos.acesso.gov.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors border border-green-500/20"
            >
              <span className="text-2xl mr-3">🔐</span>
              <div>
                <div className="font-medium text-green-300">Conta Gov.br</div>
                <div className="text-sm text-green-400">Criar conta de acesso</div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-slate-900/60 border border-slate-700 rounded-lg">
          <p className="text-slate-300 mb-2">
            <strong>Elaborado por:</strong> SofTech Serviços e Tecnologia
          </p>
          <p className="text-slate-400 text-sm">
            Capacita PGM - Paragominas/PA | {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Este guia tem caráter informativo. Para situações específicas, consulte um contador especializado.
          </p>
        </div>
      </div>
    </div>
  )
}