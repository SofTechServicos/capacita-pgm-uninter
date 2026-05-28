import Link from 'next/link'
import { FaArrowLeft, FaRocket, FaShieldAlt, FaChartLine, FaCog, FaUsers, FaCloud, FaLock } from 'react-icons/fa'

export default function GuiaFerramentasDigitaisPage() {
  return (
    <div className="bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size relative overflow-hidden">
      {/* Efeitos de Luz no Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-softech-blue/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/80 to-transparent py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/capacita-pgm" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <FaArrowLeft className="mr-2" />
            Voltar para Capacita PGM
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            🚀 Guia: Ferramentas Digitais para seu Negócio 2025-2026
          </h1>
          <p className="text-lg opacity-90">
            Transforme sua PME com tecnologia inteligente e acessível
          </p>
        </div>
      </div>

      {/* Resumo em Áudio */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12">
        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white rounded-2xl p-8 border border-slate-700 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/20">
              <span className="text-2xl">🎙️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Estratégia Digital em Áudio</h2>
              <p className="opacity-90">Escute o resumo estratégico enquanto decide suas ferramentas</p>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <span className="text-lg">🎧</span>
                </div>
                <div>
                  <p className="font-medium">Ferramentas Digitais - Visão Estratégica 2025-2026</p>
                  <p className="text-sm opacity-70">Duração: ~2 minutos</p>
                </div>
              </div>
              <audio controls className="w-full bg-black/20 rounded-lg">
                <source src="/guias/Guia Ferramentas Digitais para seu Negócio.m4a" type="audio/mp4" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
            <p className="text-sm text-white/90">
              <strong className="text-white">Conteúdo do áudio:</strong> Cenário 2025-2026, IA para PMEs, ERP vs planilhas, 
              CRM essencial, cibersegurança como diferencial e roadmap de implementação.
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Recomendações Rápidas */}
        <div className="bg-gradient-to-r from-green-600/80 to-blue-600/80 text-white rounded-2xl p-8 mb-12 border border-slate-700 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">⚡ Sem tempo para ler tudo?</h2>
            <p className="text-lg opacity-90 mb-6">
              Comece por aqui - Recomendações da SOFTECH:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="font-bold mb-2">📊 Para organizar as finanças:</h3>
              <p className="text-sm opacity-90 mb-3">Recomendamos o <strong>Conta Azul</strong>. É um sistema completo e seguro.</p>
              <a href="https://contaazul.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                Conhecer Conta Azul
              </a>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="font-bold mb-2">👥 Para gerenciar clientes:</h3>
              <p className="text-sm opacity-90 mb-3">Comece com o <strong>HubSpot CRM Gratuito</strong>.</p>
              <a href="https://hubspot.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                Conhecer HubSpot
              </a>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="font-bold mb-2">📋 Para organizar projetos:</h3>
              <p className="text-sm opacity-90 mb-3">O <strong>Trello</strong> é a ferramenta mais fácil para começar.</p>
              <a href="https://trello.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                Conhecer Trello
              </a>
            </div>
          </div>
        </div>

        {/* Contexto Estratégico */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4 border border-blue-500/20">
              <FaChartLine className="text-2xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">O Cenário Estratégico 2025-2026</h2>
              <p className="text-slate-400">Tendências e imperativos de negócio</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <h3 className="font-bold text-blue-300 mb-3">💡 Novo Paradigma Tecnológico</h3>
              <p className="text-blue-400 mb-4">
                A tecnologia deixou de ser experimental e deve focar na <strong>consolidação de retornos claros</strong>. 
                PMEs precisam priorizar soluções que comprovem redução de custos e aumento de produtividade.
              </p>
              <ul className="text-blue-400 space-y-2 text-sm">
                <li>• <strong>78% das empresas brasileiras</strong> planejam aumentar investimentos em IA até 2025</li>
                <li>• <strong>33% das PMEs</strong> pretendem substituir seus ERPs até 2026</li>
                <li>• <strong>Foco em eficiência:</strong> ROI mensurável é obrigatório</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-500/10 p-4 rounded-lg text-center border border-green-500/20">
                <span className="text-2xl mb-2 block">🌱</span>
                <h4 className="font-bold text-green-300">Agrotech</h4>
                <p className="text-green-400 text-sm">IoT, blockchain e agricultura de precisão</p>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-lg text-center border border-purple-500/20">
                <span className="text-2xl mb-2 block">🏥</span>
                <h4 className="font-bold text-purple-300">Saúde Digital</h4>
                <p className="text-purple-400 text-sm">Telemedicina e bem-estar</p>
              </div>
              <div className="bg-orange-500/10 p-4 rounded-lg text-center border border-orange-500/20">
                <span className="text-2xl mb-2 block">🛍️</span>
                <h4 className="font-bold text-orange-300">Varejo 4.0</h4>
                <p className="text-orange-400 text-sm">Experiência e comunidade</p>
              </div>
            </div>
          </div>
        </div>

        {/* IA e Automação */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-purple-500/10 p-3 rounded-full mr-4 border border-purple-500/20">
              <FaRocket className="text-2xl text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Inteligência Artificial e Automação</h2>
              <p className="text-slate-400">GenAI & RPA para PMEs</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-slate-700">
              <h3 className="font-bold text-purple-300 mb-3">🤖 Estado da Arte da IA em 2025</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Estatísticas Brasileiras</h4>
                  <ul className="text-purple-400 space-y-1 text-sm">
                    <li>• 72% das empresas já usam IA</li>
                    <li>• 95% avançaram em estratégias de IA</li>
                    <li>• 48% reportam ROI positivo</li>
                    <li>• 77% usam IA para análise de dados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Benefícios da GenAI</h4>
                  <ul className="text-purple-400 space-y-1 text-sm">
                    <li>• +40% eficiência na criação de conteúdo</li>
                    <li>• +90% automação de fluxo de trabalho</li>
                    <li>• Geração de código e tradução</li>
                    <li>• Análise preditiva avançada</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-yellow-500/20 bg-yellow-500/10 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-300 mb-2">⚠️ Desafios de Implementação</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-yellow-400">Precisão dos Dados (45%)</strong>
                  <p className="text-yellow-500">Viés e qualidade dos dados</p>
                </div>
                <div>
                  <strong className="text-yellow-400">Dados Insuficientes (42%)</strong>
                  <p className="text-yellow-500">Falta de dados proprietários</p>
                </div>
                <div>
                  <strong className="text-yellow-400">Falta de Expertise (42%)</strong>
                  <p className="text-yellow-500">Equipe sem experiência em IA</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h3 className="font-bold text-white mb-4">📊 Fórmula ROI em Automação</h3>
              <div className="bg-slate-900 p-4 rounded border border-slate-700 text-center">
                <p className="text-lg font-mono text-slate-200">
                  ROI = ((Benefícios - Custos) / Custos) × 100
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Exemplo: R$ 100.000 em benefícios - R$ 60.000 em custos = <strong>66,67% ROI</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ERP e Finanças */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-500/10 p-3 rounded-full mr-4 border border-green-500/20">
              <FaCog className="text-2xl text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">ERP e Finanças na Nuvem</h2>
              <p className="text-slate-400">Fundamentos de gestão moderna</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
              <h3 className="font-bold text-green-300 mb-3">☁️ O Imperativo da Modernização</h3>
              <p className="text-green-400 mb-4">
                <strong>33,31% das empresas brasileiras</strong> pretendem adquirir ou substituir seus ERPs até 2026. 
                A migração para nuvem garante segurança, atualizações automáticas e acesso remoto.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="border border-slate-700 p-3 text-left text-white">Funcionalidade</th>
                    <th className="border border-slate-700 p-3 text-center text-white">Conta Azul</th>
                    <th className="border border-slate-700 p-3 text-center text-white">Omie</th>
                    <th className="border border-slate-700 p-3 text-left text-white">Benefício Estratégico</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr>
                    <td className="border border-slate-700 p-3 font-medium">Hospedagem Cloud</td>
                    <td className="border border-slate-700 p-3 text-center">✅ AWS</td>
                    <td className="border border-slate-700 p-3 text-center">✅ Cloud</td>
                    <td className="border border-slate-700 p-3">Acesso remoto e conformidade LGPD</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="border border-slate-700 p-3 font-medium">Nota Fiscal (NFSe)</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3">Conformidade fiscal automática</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 p-3 font-medium">Conciliação Bancária</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3">Redução de erros e economia de tempo</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="border border-slate-700 p-3 font-medium">Relatórios em Tempo Real</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3 text-center">✅</td>
                    <td className="border border-slate-700 p-3">Transparência financeira instantânea</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CRM e Marketing */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-orange-500/10 p-3 rounded-full mr-4 border border-orange-500/20">
              <FaUsers className="text-2xl text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">CRM, Vendas e Marketing Digital</h2>
              <p className="text-slate-400">Impulsionando a receita</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-500/10 p-6 rounded-lg mb-6 border border-orange-500/20">
              <h3 className="font-bold text-orange-300 mb-3">🤔 Qual CRM escolher?</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">✅ Escolha HubSpot se:</h4>
                  <ul className="text-orange-400 text-sm space-y-1">
                    <li>• Você precisa de uma solução completa (marketing + vendas)</li>
                    <li>• Planeja crescer e integrar equipes</li>
                    <li>• Quer começar gratuitamente</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">✅ Escolha Pipedrive se:</h4>
                  <ul className="text-orange-400 text-sm space-y-1">
                    <li>• Quer uma ferramenta 100% focada em organizar vendas</li>
                    <li>• Prefere simplicidade e facilidade de uso</li>
                    <li>• Já tem outras ferramentas de marketing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-400 pl-6">
                <h3 className="font-bold text-blue-300 mb-2">🔵 HubSpot</h3>
                <div className="bg-blue-500/10 p-3 rounded text-sm border border-blue-500/20">
                  <strong>Preço:</strong> Gratuito para começar<br/>
                  <strong>Diferencial:</strong> +1.000 integrações nativas<br/>
                  <strong>Melhor para:</strong> Estratégia inbound completa
                </div>
              </div>

              <div className="border-l-4 border-green-400 pl-6">
                <h3 className="font-bold text-green-300 mb-2">🟢 Pipedrive</h3>
                <div className="bg-green-500/10 p-3 rounded text-sm border border-green-500/20">
                  <strong>Preço:</strong> Starter $14/mês/usuário<br/>
                  <strong>Diferencial:</strong> Interface ultra-intuitiva<br/>
                  <strong>Melhor para:</strong> Foco puro em vendas
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-lg border border-slate-700">
              <h3 className="font-bold text-orange-300 mb-3">🎯 Marketing com GenAI</h3>
              <ul className="text-orange-400 space-y-2 text-sm">
                <li>• <strong>Criação de conteúdo:</strong> Artigos, blogs e e-mails automatizados</li>
                <li>• <strong>Personas inteligentes:</strong> Ferramentas como Delve AI para insights</li>
                <li>• <strong>SEO otimizado:</strong> Conteúdo adaptado para pesquisas com IA</li>
                <li>• <strong>+90% automação:</strong> Fluxos de trabalho de marketing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Produtividade e Colaboração */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-500/10 p-3 rounded-full mr-4 border border-indigo-500/20">
              <FaCloud className="text-2xl text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Produtividade no Modelo Híbrido</h2>
              <p className="text-slate-400">Colaboração e gestão de talentos</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-700 text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="border border-slate-700 p-3 text-left text-white">Ferramenta</th>
                    <th className="border border-slate-700 p-3 text-left text-white">Função Principal</th>
                    <th className="border border-slate-700 p-3 text-left text-white">Ideal Para</th>
                    <th className="border border-slate-700 p-3 text-left text-white">Diferencial 2025</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr>
                    <td className="border border-slate-700 p-3 font-medium">Microsoft Teams</td>
                    <td className="border border-slate-700 p-3">Comunicação Unificada</td>
                    <td className="border border-slate-700 p-3">Colaboração Empresarial</td>
                    <td className="border border-slate-700 p-3">270M usuários, integração completa</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="border border-slate-700 p-3 font-medium">Asana</td>
                    <td className="border border-slate-700 p-3">Gestão de Projetos</td>
                    <td className="border border-slate-700 p-3">Marketing e Operações</td>
                    <td className="border border-slate-700 p-3">Líder Gartner + IA integrada</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 p-3 font-medium">Notion</td>
                    <td className="border border-slate-700 p-3">Workspace Tudo-em-Um</td>
                    <td className="border border-slate-700 p-3">Startups e Educação</td>
                    <td className="border border-slate-700 p-3">IA para documentação</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="border border-slate-700 p-3 font-medium">Trello</td>
                    <td className="border border-slate-700 p-3">Kanban Visual</td>
                    <td className="border border-slate-700 p-3">Projetos Simples</td>
                    <td className="border border-slate-700 p-3">Versão gratuita robusta</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-indigo-500/10 p-6 rounded-lg border border-indigo-500/20">
              <h3 className="font-bold text-indigo-300 mb-3">👥 Gestão de Talentos (HR Tech)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-indigo-400 mb-2">Engajamento e Feedback</h4>
                  <ul className="text-indigo-400 space-y-1 text-sm">
                    <li>• Feedz: Feedback contínuo</li>
                    <li>• MarQ: Gamificação</li>
                    <li>• Deskbee: Gestão híbrida</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-400 mb-2">Ciclo Completo</h4>
                  <ul className="text-indigo-400 space-y-1 text-sm">
                    <li>• BambooHR: Administração</li>
                    <li>• Bizneo HR: Modular</li>
                    <li>• SAP SuccessFactors: Enterprise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cibersegurança */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-red-500/10 p-3 rounded-full mr-4 border border-red-500/20">
              <FaShieldAlt className="text-2xl text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Cibersegurança e Conformidade</h2>
              <p className="text-slate-400">O diferencial competitivo de 2026</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
              <h3 className="font-bold text-red-300 mb-3">🚨 Riscos para PMEs</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">💰</span>
                  <h4 className="font-bold text-red-400">Impacto Financeiro</h4>
                  <p className="text-red-500 text-sm">Custos de investigação e recuperação</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl mb-2 block">📉</span>
                  <h4 className="font-bold text-red-400">Dano Reputacional</h4>
                  <p className="text-red-500 text-sm">Perda de confiança dos clientes</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl mb-2 block">⚖️</span>
                  <h4 className="font-bold text-red-400">Multas Regulatórias</h4>
                  <p className="text-red-500 text-sm">LGPD e conformidade</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
              <h3 className="font-bold text-green-300 mb-3">🛡️ Soluções Inteligentes</h3>
              <ul className="text-green-400 space-y-2 text-sm">
                <li>• <strong>IA e Machine Learning:</strong> Detecção de comportamentos anômalos</li>
                <li>• <strong>Auto XDR:</strong> Resposta automática a ameaças</li>
                <li>• <strong>+50% das empresas</strong> planejam implementar segurança com IA</li>
                <li>• <strong>Diferencial competitivo:</strong> Segurança como argumento de venda</li>
              </ul>
            </div>

            <div className="border border-blue-500/20 bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-bold text-blue-300 mb-2">📋 Checklist LGPD 2025</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">Preparação Técnica</h5>
                  <ul className="text-blue-400 space-y-1">
                    <li>□ Plano de resposta a incidentes</li>
                    <li>□ Canais de comunicação ANPD</li>
                    <li>□ Proteção de ambientes cloud</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">Monitoramento</h5>
                  <ul className="text-blue-400 space-y-1">
                    <li>□ Acompanhamento regulatório</li>
                    <li>□ Gestão de consentimento</li>
                    <li>□ Criptografia de dados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infográfico Final */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Roadmap Digital para PMEs: Sua Estratégia 2025-2026</h2>
            <p className="text-slate-400">Visão macro de como todas as peças se conectam</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-slate-700">
            <img 
              src="/guias/Guia FERRAMENTAS DIGITAIS Infográfico I.png" 
              alt="Infográfico: Roadmap Digital PMEs"
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="flex justify-center">
              <a 
                href="/guias/Guia FERRAMENTAS DIGITAIS Infográfico I.png" 
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📱 Baixar Infográfico
              </a>
            </div>
          </div>
        </div>

        {/* Roadmap de Implementação */}
        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white rounded-2xl p-8 mb-12 border border-slate-700 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/20">
              <FaLock className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Roadmap de Implementação 2025-2026</h2>
              <p className="opacity-90">Seu plano de transformação digital</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">🎯 Fase 1: 2025 (Eficiência e Conformidade)</h3>
              <div className="space-y-3 opacity-90">
                <div className="flex items-start">
                  <span className="text-yellow-300 mr-2">1.</span>
                  <div>
                    <strong>ERP/Financeiro:</strong> Migração completa para nuvem (Omie/Conta Azul)
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-300 mr-2">2.</span>
                  <div>
                    <strong>CRM:</strong> Implementação HubSpot ou Pipedrive
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-300 mr-2">3.</span>
                  <div>
                    <strong>Segurança:</strong> Auto XDR e conformidade LGPD
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">🚀 Fase 2: 2026 (Escalabilidade e Inovação)</h3>
              <div className="space-y-3 opacity-90">
                <div className="flex items-start">
                  <span className="text-green-300 mr-2">1.</span>
                  <div>
                    <strong>Automação:</strong> RPA + Process Intelligence
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-300 mr-2">2.</span>
                  <div>
                    <strong>HR Tech:</strong> Gestão híbrida e feedback contínuo
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-300 mr-2">3.</span>
                  <div>
                    <strong>IA Setorial:</strong> IoT, blockchain, telemedicina
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-black/20 rounded-lg border border-white/20">
            <h4 className="font-bold mb-2">💡 Três Ações Imediatas</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm opacity-90">
              <div>
                <strong>1. Process Intelligence</strong><br/>
                Mapear processos antes de automatizar
              </div>
              <div>
                <strong>2. Governança de IA</strong><br/>
                Treinamento e políticas responsáveis
              </div>
              <div>
                <strong>3. Core Digital</strong><br/>
                ERP moderno como base de dados
              </div>
            </div>
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
            Baseado em pesquisas de mercado e tendências tecnológicas 2025-2026.
          </p>
        </div>
      </div>
    </div>
  )
}