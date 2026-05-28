import Link from 'next/link'
import { FaArrowLeft, FaCheckCircle, FaSearch, FaEdit, FaRocket, FaBullseye, FaChartLine } from 'react-icons/fa'

export default function GuiaCurriculoPage() {
  return (
    <div className="bg-deep-dark text-slate-300 bg-grid-pattern bg-grid-size relative overflow-hidden">
      {/* Efeitos de Luz no Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] bg-green-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-[50vw] h-[50vw] bg-blue-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/80 to-transparent py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/capacita-pgm" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <FaArrowLeft className="mr-2" />
            Voltar para Capacita PGM
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            📄 Guia Estratégico: Como Criar um Currículo de Impacto
          </h1>
          <p className="text-lg opacity-90">
            Maximize suas chances de sucesso em processos seletivos modernos
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introdução */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-500/10 p-3 rounded-full mr-4 border border-green-500/20">
              <span className="text-3xl">🎯</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">O Currículo na Era Digital</h2>
              <p className="text-slate-400">ATS e Recrutadores Humanos</p>
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            Você sabia que a maioria dos currículos hoje é lida primeiro por um robô? Antes de chegar a uma pessoa, seu currículo 
            passa por um filtro automático (chamado ATS). Se o formato estiver errado, você é descartado, não importa o quão bom 
            profissional você seja. Neste guia, vamos te ensinar a criar um currículo que passa no robô e impressiona o recrutador.
          </p>
        </div>

        {/* Resumo em Áudio */}
        <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white rounded-2xl p-8 mb-12 border border-slate-700 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/20">
              <span className="text-2xl">🎙️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Prefere Ouvir? Temos o Resumo em Áudio</h2>
              <p className="opacity-80">Escute os pontos principais enquanto navega ou em movimento</p>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg mb-6">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <span className="text-lg">🎧</span>
                </div>
                <div>
                  <p className="font-medium">Guia de Currículo - Resumo Estratégico</p>
                  <p className="text-sm opacity-70">Duração: ~2 minutos</p>
                </div>
              </div>
              <audio controls className="w-full bg-black/20 rounded-lg">
                <source src="/guias/Guia Como Criar um Currículo de Impacto.m4a" type="audio/mp4" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
            <p className="text-sm text-white/90">
              <strong className="text-white">Conteúdo do áudio:</strong> ATS e robôs de seleção, método CAR para descrever experiências, 
              palavras-chave estratégicas, e as 3 ações imediatas para criar um currículo de impacto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h3 className="font-bold text-red-300 mb-2">❌ Erros Fatais</h3>
              <ul className="text-red-400 space-y-1 text-sm">
                <li>• Templates complexos com tabelas</li>
                <li>• PDFs baseados em imagens</li>
                <li>• Fontes decorativas ou ícones</li>
                <li>• Múltiplas colunas</li>
                <li>• Ausência de palavras-chave</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h3 className="font-bold text-green-300 mb-2">✅ Formato Ideal</h3>
              <ul className="text-green-400 space-y-1 text-sm">
                <li>• Arquivo DOCX ou PDF simples</li>
                <li>• Fontes padrão (Arial, Calibri)</li>
                <li>• Layout limpo e organizado</li>
                <li>• Palavras-chave estratégicas</li>
                <li>• Estrutura cronológica clara</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formatos de Currículo */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4 border border-blue-500/20">
              <FaEdit className="text-2xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Escolha do Formato Estratégico</h2>
              <p className="text-slate-400">Alinhamento com sua trajetória</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="font-bold text-white mb-2">📈 Cronológico Reverso (Recomendado)</h3>
              <p className="text-slate-300 mb-2">Lista experiências da mais recente para a mais antiga</p>
              <div className="bg-blue-500/10 p-3 rounded text-sm border border-blue-500/20">
                <strong>Ideal para:</strong> Carreira estável e linear | <strong>Risco ATS:</strong> Baixo
              </div>
            </div>

            <div className="border-l-4 border-green-400 pl-6">
              <h3 className="font-bold text-white mb-2">🔄 Híbrido/Combinação (Mais Seguro)</h3>
              <p className="text-slate-300 mb-2">Combina habilidades no topo + histórico cronológico</p>
              <div className="bg-green-500/10 p-3 rounded text-sm border border-green-500/20">
                <strong>Ideal para:</strong> Transição de carreira, nichos técnicos | <strong>Risco ATS:</strong> Baixo
              </div>
            </div>

            <div className="border-l-4 border-red-400 pl-6">
              <h3 className="font-bold text-white mb-2">⚠️ Funcional (Evitar)</h3>
              <p className="text-slate-300 mb-2">Foca apenas em habilidades, omite cronologia</p>
              <div className="bg-red-500/10 p-3 rounded text-sm border border-red-500/20">
                <strong>Problema:</strong> ATS rejeita por falta de histórico | <strong>Risco ATS:</strong> Alto
              </div>
            </div>
          </div>
        </div>

        {/* Modelos para Download: removido (substituído pelo Gerador ATS) */}

        {/* Método CAR */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-purple-500/10 p-3 rounded-full mr-4 border border-purple-500/20">
              <FaRocket className="text-2xl text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Método CAR: Transforme Tarefas em Conquistas</h2>
              <p className="text-slate-400">Challenge, Action, Result</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-500/20">
                <span className="text-2xl font-bold text-red-400">C</span>
              </div>
              <h3 className="font-bold text-white mb-2">Challenge</h3>
              <p className="text-sm text-slate-400">Qual problema você resolveu?</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/20">
                <span className="text-2xl font-bold text-blue-400">A</span>
              </div>
              <h3 className="font-bold text-white mb-2">Action</h3>
              <p className="text-sm text-slate-400">Que ações você tomou?</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/20">
                <span className="text-2xl font-bold text-green-400">R</span>
              </div>
              <h3 className="font-bold text-white mb-2">Result</h3>
              <p className="text-sm text-slate-400">Qual foi o resultado quantificado?</p>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="font-bold text-white mb-4">📊 Exemplos de Transformação</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 pl-4">
                <p className="text-red-400 font-medium text-sm">❌ ANTES (Tarefa)</p>
                <p className="text-slate-300">"Trabalhou na equipe de marketing digital"</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-green-400 font-medium text-sm">✅ DEPOIS (CAR)</p>
                <p className="text-slate-300">"Desenvolvi campanha de marketing digital direcionada, resultando em <strong>30% de aumento no tráfego</strong> e <strong>25% nas vendas online</strong> em 3 meses"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Palavras-Chave */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-orange-500/10 p-3 rounded-full mr-4 border border-orange-500/20">
              <FaSearch className="text-2xl text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Otimização de Palavras-Chave</h2>
              <p className="text-slate-400">Decodificando a descrição da vaga</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <h3 className="font-bold text-blue-300 mb-3">🔍 Processo de Decodificação</h3>
              <ol className="text-blue-400 space-y-2 text-sm">
                <li><strong>1.</strong> Copie a descrição da vaga e destaque palavras-chave repetidas</li>
                <li><strong>2.</strong> Separe requisitos obrigatórios (Must-Have) dos preferenciais (Nice-to-Have)</li>
                <li><strong>3.</strong> Espelhe a linguagem exata da empresa no seu currículo</li>
                <li><strong>4.</strong> Posicione palavras-chave no título, resumo e experiências</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-white mb-3">🎯 Tipos de Palavras-Chave</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><strong>Hard Skills:</strong> Python, Excel, Photoshop</li>
                  <li><strong>Soft Skills:</strong> Liderança, Comunicação</li>
                  <li><strong>Jargões:</strong> SEO, CRM, Agile</li>
                  <li><strong>Certificações:</strong> PMP, CPA, AWS</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-3">📍 Onde Posicionar</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• <strong>Título do currículo</strong></li>
                  <li>• <strong>Resumo profissional</strong></li>
                  <li>• <strong>Descrição das experiências</strong></li>
                  <li>• <strong>Seção de qualificações</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Profissional */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-500/10 p-3 rounded-full mr-4 border border-indigo-500/20">
              <FaBullseye className="text-2xl text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Resumo Profissional Otimizado</h2>
              <p className="text-slate-400">Seu pitch de elevador</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-lg border border-slate-700">
              <h3 className="font-bold text-indigo-300 mb-3">💡 Dicas Estratégicas</h3>
              <ul className="text-indigo-400 space-y-2 text-sm">
                <li>• <strong>Use primeira pessoa:</strong> "Eu ajudo" em vez de "Profissional que ajuda"</li>
                <li>• <strong>Conte sua história:</strong> Quem você ajuda + Problemas que resolve + Sua paixão</li>
                <li>• <strong>Inclua palavras-chave:</strong> Saturado com termos da vaga</li>
                <li>• <strong>Seja escaneável:</strong> Parágrafos curtos com espaço em branco</li>
              </ul>
            </div>

            <div className="border border-slate-700 p-4 rounded-lg bg-slate-800/50">
              <h4 className="font-bold text-white mb-2">📝 Exemplo de Resumo Eficaz</h4>
              <p className="text-slate-300 text-sm italic">
                "Analista de Marketing Digital com 3+ anos de experiência em campanhas B2B. Especializado em SEO, Google Ads e automação de marketing, 
                com histórico comprovado de aumentar leads qualificados em 40% e reduzir CAC em 25%. Apaixonado por transformar dados em estratégias 
                que geram resultados mensuráveis para empresas de tecnologia."
              </p>
            </div>
          </div>
        </div>

        {/* Habilidades Tendência 2025 */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-500/10 p-3 rounded-full mr-4 border border-yellow-500/20">
              <FaChartLine className="text-2xl text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Habilidades Mais Demandadas 2025</h2>
              <p className="text-slate-400">Tendências do mercado</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white mb-4">🔧 Hard Skills Críticas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-blue-500/10 p-3 rounded border border-blue-500/20">
                  <span className="text-blue-300 font-medium">Inteligência Artificial (AI)</span>
                  <span className="text-blue-400 text-sm">🔥 Alta demanda</span>
                </div>
                <div className="flex items-center justify-between bg-green-500/10 p-3 rounded border border-green-500/20">
                  <span className="text-green-300 font-medium">Data Analysis</span>
                  <span className="text-green-400 text-sm">📈 Crescendo</span>
                </div>
                <div className="flex items-center justify-between bg-purple-500/10 p-3 rounded border border-purple-500/20">
                  <span className="text-purple-300 font-medium">Cloud Computing</span>
                  <span className="text-purple-400 text-sm">☁️ Essencial</span>
                </div>
                <div className="flex items-center justify-between bg-red-500/10 p-3 rounded border border-red-500/20">
                  <span className="text-red-300 font-medium">Cybersecurity</span>
                  <span className="text-red-400 text-sm">🛡️ Crítica</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">💡 Soft Skills Essenciais</h3>
              <div className="space-y-3">
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="font-medium text-slate-200">Resolução de Problemas</div>
                  <div className="text-slate-400 text-sm">Demonstre com exemplos CAR</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="font-medium text-slate-200">Comunicação Eficaz</div>
                  <div className="text-slate-400 text-sm">Quantifique o impacto</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="font-medium text-slate-200">Adaptabilidade</div>
                  <div className="text-slate-400 text-sm">Mostre flexibilidade</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="font-medium text-slate-200">Liderança</div>
                  <div className="text-slate-400 text-sm">Resultados de equipe</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Final */}
        <div className="bg-gradient-to-r from-green-600/80 to-blue-600/80 text-white rounded-2xl p-8 mb-12 border border-slate-700 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/20">
              <FaBullseye className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Checklist Final de Conformidade</h2>
              <p className="opacity-90">Teste de leitura rápida</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">✅ Verificações Técnicas</h3>
              <ul className="space-y-2 opacity-90 text-sm">
                <li>□ Formato DOCX ou PDF simples</li>
                <li>□ Fonte padrão (Arial, Calibri) 11-12pt</li>
                <li>□ Layout sem tabelas ou colunas</li>
                <li>□ Palavras-chave da vaga no título/resumo</li>
                <li>□ Sem erros ortográficos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">🎯 Verificações de Conteúdo</h3>
              <ul className="space-y-2 opacity-90 text-sm">
                <li>□ Cada experiência usa método CAR</li>
                <li>□ Resultados quantificados com números</li>
                <li>□ Resumo em primeira pessoa</li>
                <li>□ Customizado para esta vaga específica</li>
                <li>□ Passa no teste de 2 minutos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Infográfico Final */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Vença os Robôs, Conquiste a Vaga</h2>
            <p className="text-slate-400">Salve este resumo visual para consulta rápida</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-slate-700">
            <img 
              src="/guias/Guia CURRÍCULO Infográfico I.png" 
              alt="Infográfico: Vença os Robôs, Conquiste a Vaga"
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="flex justify-center">
              <a 
                href="/guias/Guia CURRÍCULO Infográfico I.png" 
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📱 Baixar Infográfico
              </a>
            </div>
          </div>
        </div>

        {/* Recursos Adicionais */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="bg-slate-800 p-3 rounded-full mr-4 border border-slate-700">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Recursos Úteis</h2>
              <p className="text-slate-400">Ferramentas para otimização</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://www.kickresume.com/en/ats-resume-checker/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors border border-blue-500/20"
            >
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <div className="font-medium text-blue-300">ATS Resume Checker</div>
                <div className="text-sm text-blue-400">Teste compatibilidade ATS</div>
              </div>
            </a>
            
            <a 
              href="https://www.jobscan.co/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors border border-green-500/20"
            >
              <span className="text-2xl mr-3">📊</span>
              <div>
                <div className="font-medium text-green-300">Jobscan</div>
                <div className="text-sm text-green-400">Otimização de palavras-chave</div>
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
            Baseado em pesquisas de mercado e melhores práticas de recrutamento moderno.
          </p>
        </div>
      </div>
    </div>
  )
}