'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiToggleLeft, FiToggleRight, FiPlus, FiTrash2, FiLogOut, FiUsers, FiEye, FiMonitor, FiSmartphone, FiTablet, FiDownload, FiCalendar, FiZap, FiLink } from 'react-icons/fi'
import AdminMetrics from '../../components/AdminMetrics'
import GeoAnalytics from '../../components/GeoAnalytics'
import WhatsAppControl from '../../components/WhatsAppControl'
import toast from 'react-hot-toast'

interface Page {
  id: string
  name: string
  path: string
  active: boolean
  type: 'page' | 'section' | 'promotional'
  order?: number
}

interface Analytics {
  visitors: { total: number };
  pageViews: { total: number };
  topPages: Array<{ page: string; views: number }>
  devices: {
    mobile: number
    desktop: number
    tablet: number
  }
  geo: {
    topCountries: Array<{ country: string; visitors: number }>;
    topCities: Array<{ city: string; country: string; visitors: number }>;
  }
  topReferrers: Array<{ referrer: string; visitors: number }>;
  dailyVisitors: Array<{ date: string; visitors: number }>;
}

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [newPage, setNewPage] = useState({ name: '', path: '', type: 'page' as 'page' | 'section' | 'promotional' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'pages' | 'analytics' | 'whatsapp'>('pages')
  const [csrfToken, setCsrfToken] = useState<string>('')
  const [dateRange, setDateRange] = useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 29); // Default to last 30 days
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    };
  });

  const setDatePreset = (preset: '7d' | '30d' | 'month') => {
    const endDate = new Date();
    const startDate = new Date();
    if (preset === '7d') {
      startDate.setDate(endDate.getDate() - 6);
    } else if (preset === '30d') {
      startDate.setDate(endDate.getDate() - 29);
    } else if (preset === 'month') {
      startDate.setDate(1);
    }
    
    const newRange = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    };

    setDateRange(newRange);
    handleDateFilter(newRange.start, newRange.end);
  }

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user?.email || session.user.email !== 'softechservicosetecnologia@gmail.com') {
      router.push('/auth/signin')
      return
    }

    fetchPages()
    fetchAnalytics(dateRange.start, dateRange.end)
    generateCSRFToken()
  }, [session, status, router]) // Removed dateRange to avoid re-fetching on every date change, will use a button

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
    } catch (error) {
      toast.error('Erro ao carregar páginas')
    } finally {
      setLoading(false)
    }
  }

  const generateCSRFToken = async () => {
    try {
      const response = await fetch('/api/csrf-token')
      if (response.ok) {
        const { token } = await response.json()
        setCsrfToken(token)
      }
    } catch (error) {
      console.error('Erro ao gerar CSRF token:', error)
    }
  }

  const fetchAnalytics = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics?start=${start}&end=${end}`)
      if (response.ok) {
        const data = await response.json()
        // Garante que a estrutura de dados seja sempre consistente, mesmo que a API retorne dados parciais.
        setAnalytics({
          visitors: { total: data.visitors?.total || 0 },
          pageViews: { total: data.pageViews?.total || 0 },
          topPages: data.topPages || [],
          devices: data.devices || { mobile: 0, desktop: 0, tablet: 0 },
          geo: data.geo || { topCountries: [], topCities: [] },
          topReferrers: data.topReferrers || [],
          dailyVisitors: data.dailyVisitors || [],
        })
      } else {
        // Em caso de falha na API (ex: 404, 500), limpa os dados para evitar erros.
        setAnalytics(null)
        toast.error('Falha ao carregar dados de analytics.')
      }
    } catch (error) {
      toast.error('Erro ao carregar analytics')
      // Também limpa os dados em caso de erro de rede.
      setAnalytics(null)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  const handleDateFilter = (start = dateRange.start, end = dateRange.end) => {
    setAnalyticsLoading(true);
    fetchAnalytics(start, end);
  };

  const togglePage = async (id: string, active: boolean) => {
    console.log(`🔄 togglePage chamado: ID=${id}, active=${active} -> ${!active}`)
    
    try {
      const url = `/api/admin/pages/${id}`
      console.log(`📡 Fazendo PUT para: ${url}`)
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({ active: !active })
      })
      
      console.log(`📊 Resposta da API: ${response.status}`)

      if (response.ok) {
        // Atualizar lista local
        setPages(pages.map(page => 
          page.id === id ? { ...page, active: !active } : page
        ))
        
        // Disparar evento para atualizar Header
        console.log('📡 Disparando evento pages-updated...')
        window.dispatchEvent(new CustomEvent('pages-updated'))
        
        // Disparar evento no localStorage para sincronizar entre abas
        localStorage.setItem('pages-updated', Date.now().toString())
        
        toast.success(`Página ${!active ? 'ativada' : 'desativada'}`)
        console.log('🔄 Página atualizada, evento disparado')
      } else {
        console.error('❌ Erro na resposta:', await response.text())
        toast.error('Erro ao atualizar página')
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error)
      toast.error('Erro ao atualizar página')
    }
  }

  const addPage = async () => {
    if (!newPage.name || !newPage.path) {
      toast.error('Preencha todos os campos')
      return
    }

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(newPage)
      })

      if (response.ok) {
        const data = await response.json()
        setPages([...pages, data])
        setNewPage({ name: '', path: '', type: 'page' })
        setShowAddForm(false)
        toast.success('Página adicionada')
      }
    } catch (error) {
      toast.error('Erro ao adicionar página')
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta página?')) return

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken
        }
      })

      if (response.ok) {
        setPages(pages.filter(page => page.id !== id))
        toast.success('Página deletada')
      }
    } catch (error) {
      toast.error('Erro ao deletar página')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-deep-dark text-slate-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <FiLogOut className="mr-2" />
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('pages')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pages'
                    ? 'border-softech-blue text-softech-blue'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                Gerenciar Páginas
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-softech-blue text-softech-blue'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'whatsapp'
                    ? 'border-softech-blue text-softech-blue'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                WhatsApp Bot
              </button>
            </nav>
          </div>
        </div>

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Gerenciar Páginas do Site</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FiPlus className="mr-2" />
                Adicionar Página
              </button>
            </div>

            {showAddForm && (
              <div className="mb-6 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nome da página"
                    value={newPage.name}
                    onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                    className="px-3 py-2 border border-slate-600 bg-slate-900 text-slate-200 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Caminho (ex: /beta)"
                    value={newPage.path}
                    onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
                    className="px-3 py-2 border border-slate-600 bg-slate-900 text-slate-200 rounded"
                  />
                  <select
                    value={newPage.type}
                    onChange={(e) => setNewPage({ ...newPage, type: e.target.value as any })}
                    className="px-3 py-2 border border-slate-600 bg-slate-900 text-slate-200 rounded"
                  >
                    <option value="page">Página</option>
                    <option value="section">Seção</option>
                    <option value="promotional">Promocional</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addPage}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {pages
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((page, index) => (
                <div 
                  key={page.id} 
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', index.toString())
                    e.currentTarget.style.opacity = '0.5'
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault()
                    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
                    const dropIndex = index
                    
                    if (dragIndex === dropIndex) return
                    
                    const sortedPages = pages.sort((a, b) => (a.order || 0) - (b.order || 0))
                    const newPages = [...sortedPages]
                    const [draggedPage] = newPages.splice(dragIndex, 1)
                    newPages.splice(dropIndex, 0, draggedPage)
                    
                    const updatedPages = newPages.map((p, i) => ({ ...p, order: i + 1 }))
                    setPages(updatedPages)
                    
                    try {
                      await fetch('/api/admin/pages/reorder', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
                        body: JSON.stringify({ pages: updatedPages.map(p => ({ id: p.id, order: p.order })) })
                      })
                      toast.success('Ordem atualizada')
                      window.dispatchEvent(new CustomEvent('pages-updated'))
                    } catch (error) {
                      toast.error('Erro ao atualizar ordem')
                    }
                  }}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg cursor-move hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4h14a1 1 0 010 2H3a1 1 0 010-2zM3 9h14a1 1 0 010 2H3a1 1 0 010-2zM3 14h14a1 1 0 010 2H3a1 1 0 010-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{page.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-400">{page.path}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          page.type === 'promotional' ? 'bg-yellow-500/10 text-yellow-300' :
                          page.type === 'section' ? 'bg-green-500/10 text-green-300' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {page.type === 'promotional' ? 'Promocional' :
                           page.type === 'section' ? 'Seção' : 'Página'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => togglePage(page.id, page.active)}
                      className={`flex items-center ${page.active ? 'text-green-500' : 'text-slate-500'}`}
                    >
                      {page.active ? <FiToggleRight size={24} /> : <FiToggleLeft size={24} />}
                      <span className="ml-2">{page.active ? 'Ativa' : 'Inativa'}</span>
                    </button>
                    <button
                      onClick={() => deletePage(page.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 pb-16">
            {/* Filtro de Data */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-lg shadow-lg space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-slate-400" />
                  <label htmlFor="startDate" className="text-sm font-medium">De:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="px-3 py-1.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-md text-sm focus:ring-softech-blue focus:border-softech-blue"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">Até:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="px-3 py-1.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-md text-sm focus:ring-softech-blue focus:border-softech-blue"
                  />
                </div>
                <button
                  onClick={() => handleDateFilter()}
                  disabled={analyticsLoading}
                  className="w-full sm:w-auto px-5 py-2 bg-softech-blue text-white rounded-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {analyticsLoading ? 'Carregando...' : 'Aplicar Filtro'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDatePreset('7d')} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">Últimos 7 dias</button>
                <button onClick={() => setDatePreset('30d')} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">Últimos 30 dias</button>
                <button onClick={() => setDatePreset('month')} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">Este Mês</button>
              </div>
            </div>

            {/* Capacita PGM Analytics */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">📊 Analytics Capacita PGM</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const reportData = {
                        projeto: 'Capacita PGM',
                        disciplina: 'Atividade Extensionista I',
                        curso: 'CST em Gestão da Tecnologia da Informação',
                        aluno: 'ELIO ALVES QUEIROZ JUNIOR',
                        ru: '930051',
                        data: new Date().toLocaleDateString('pt-BR')
                      };
                      
                      const reportText = `
RELATÓRIO ACADÊMICO - CAPACITA PGM
=====================================

IDENTIFICAÇÃO
Título: ${reportData.projeto}
Disciplina: ${reportData.disciplina}
Curso: ${reportData.curso}
Aluno: ${reportData.aluno}
RU: ${reportData.ru}
Data: ${reportData.data}

URL DO PROJETO
https://softechservicos.vercel.app/capacita-pgm

OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL
- ODS 4: Educação de Qualidade (30+ cursos gratuitos)
- ODS 8: Trabalho Decente (Kit de ferramentas profissionais)
- ODS 10: Redução das Desigualdades (Acesso democrático)
- ODS 11: Cidades Sustentáveis (Desenvolvimento local)

IMPACTO QUANTITATIVO
- Cursos disponibilizados: 30+
- Instituições parceiras: 3 (Bradesco, FGV, Gov)
- Horas de conteúdo: 500+
- Ferramentas profissionais: 4

TECNOLOGIAS IMPLEMENTADAS
- Frontend: Next.js 14 + TypeScript
- Estilização: Tailwind CSS
- Analytics: Sistema próprio
- Deploy: Vercel

COMPROVAÇÃO DE FUNCIONALIDADE
✅ Projeto online e funcional
✅ Sistema de analytics implementado
✅ Widget de feedback operacional
✅ Métricas de impacto mensuráveis
✅ Alinhamento com ODS demonstrado

Relatório gerado em ${new Date().toLocaleString('pt-BR')}
                      `;
                      
                      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Relatorio_Academico_Capacita_PGM_${new Date().toISOString().split('T')[0]}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
                  >
                    📄 Relatório Acadêmico
                  </button>
                </div>
              </div>
              
              <AdminMetrics />
            </div>

            {/* Geolocalização */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-6">🌍 Analytics Geográficos</h2>
              {analyticsLoading ? (
                <div className="text-center py-8 text-slate-400">Carregando mapa...</div>
              ) : analytics?.geo ? (
                <GeoAnalytics geoData={analytics.geo} />
              ) : (
                <div className="text-center py-8 text-slate-500">Dados geográficos não disponíveis.</div>
              )}
            </div>

            {/* Insights e Referrers */}
            {analyticsLoading ? (
              <div className="text-center py-8 text-slate-400">Carregando insights...</div>
            ) : analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Insights */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <FiZap className="mr-3 text-yellow-400" />
                    Insights Automáticos
                  </h2>
                  <AnalyticsInsights analytics={analytics} />
                </div>

                {/* Top Referrers */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <FiLink className="mr-3 text-cyan-400" />
                    Principais Fontes de Tráfego
                  </h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {analytics.topReferrers.length > 0 ? (
                      analytics.topReferrers.map((ref, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-slate-300 truncate" title={ref.referrer}>
                            {ref.referrer || '(direto)'}
                          </span>
                          <span className="font-medium text-cyan-400">{ref.visitors.toLocaleString('pt-BR')}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">Nenhuma fonte de tráfego registrada no período.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Gerais do Site */}
            {analyticsLoading ? (
              <div className="text-center py-8 text-slate-400">Carregando analytics gerais...</div>
            ) : analytics && (
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">📈 Analytics Gerais do Site</h2>
                    <p className="text-sm font-normal text-slate-400 mt-1">
                      Exibindo dados de {new Date(dateRange.start + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} a {new Date(dateRange.end + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (!analytics) return;

                      const generateInsightsForReport = (analytics: Analytics): string[] => {
                        if (!analytics) return [];
                        const insights = [];
                        if (analytics.topPages.length > 0) {
                          const topPage = analytics.topPages[0];
                          insights.push(`- Sua página mais popular é a '${topPage.page}' com ${topPage.views.toLocaleString('pt-BR')} visualizações. Considere adicionar um call-to-action (CTA) mais proeminente nela para engajar seus visitantes.`);
                        }
                        if (analytics.devices.mobile > 60) {
                          insights.push(`- A maioria dos seus visitantes (${analytics.devices.mobile}%) acessa pelo celular. A experiência mobile do seu site é crucial para o sucesso.`);
                        } else if (analytics.devices.desktop > 60) {
                          insights.push(`- A maioria dos seus visitantes (${analytics.devices.desktop}%) acessa pelo desktop. Foque em uma experiência de tela grande rica e funcional.`);
                        }
                        if (analytics.topReferrers.length > 0) {
                          const topReferrer = analytics.topReferrers[0].referrer;
                          if (topReferrer && topReferrer !== 'direct' && !topReferrer.includes('localhost')) {
                            insights.push(`- Sua principal fonte de tráfego é '${topReferrer}'. Invista mais em canais similares para atrair mais visitantes.`);
                          }
                        }
                        if (analytics.dailyVisitors.length > 1) {
                          const firstDay = analytics.dailyVisitors[0].visitors;
                          const lastDay = analytics.dailyVisitors[analytics.dailyVisitors.length - 1].visitors;
                          if (lastDay > firstDay * 1.1) {
                            insights.push(`- O tráfego de visitantes nos últimos dias está com uma tendência de alta. Continue com as estratégias atuais!`);
                          }
                        }
                        if (insights.length === 0) {
                          return ["- Não há insights suficientes para gerar uma análise automática."];
                        }
                        return insights;
                      }

                      const reportData = {
                        projeto: 'Softech - Serviços & Tecnologia',
                        periodo: `De ${new Date(dateRange.start + 'T00:00:00').toLocaleDateString('pt-BR')} a ${new Date(dateRange.end + 'T00:00:00').toLocaleDateString('pt-BR')}`,
                        dataGeracao: new Date().toLocaleString('pt-BR'),
                        analytics: analytics,
                      };

                      let reportText = `
RELATÓRIO DE ANALYTICS - SOFTECH
=====================================

Período de Análise: ${reportData.periodo}
Data de Geração: ${reportData.dataGeracao}

-- RESUMO GERAL --
Total de Visitantes Únicos: ${reportData.analytics.visitors.total.toLocaleString('pt-BR')}
Total de Visualizações de Página: ${reportData.analytics.pageViews.total.toLocaleString('pt-BR')}

-- PÁGINAS MAIS ACESSADAS --
${reportData.analytics.topPages.map(p => `- ${p.page}: ${p.views.toLocaleString('pt-BR')} visualizações`).join('\n')}

-- PRINCIPAIS FONTES DE TRÁFEGO --
${reportData.analytics.topReferrers.map(r => `- ${r.referrer || '(direto)'}: ${r.visitors.toLocaleString('pt-BR')} visitantes`).join('\n')}

-- DISTRIBUIÇÃO POR DISPOSITIVO --
- Desktop: ${reportData.analytics.devices.desktop}%
- Mobile: ${reportData.analytics.devices.mobile}%
- Tablet: ${reportData.analytics.devices.tablet}%

-- DISTRIBUIÇÃO GEOGRÁFICA --
Principais Países:
${reportData.analytics.geo.topCountries.map(c => `- ${c.country}: ${c.visitors.toLocaleString('pt-BR')} visitantes`).join('\n')}

Principais Cidades:
${reportData.analytics.geo.topCities.map(c => `- ${c.city}, ${c.country}: ${c.visitors.toLocaleString('pt-BR')} visitantes`).join('\n')}

-- ANÁLISE E INSIGHTS AUTOMÁTICOS --
${generateInsightsForReport(reportData.analytics).join('\n')}

-- FIM DO RELATÓRIO --
`;
                      const blob = new Blob([reportText.trim()], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Relatorio_Analytics_Softech_${dateRange.start}_a_${dateRange.end}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <FiDownload />
                    Gerar Relatório de Analytics
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiUsers className="text-blue-400 text-2xl mr-3" />
                      <div>
                        <p className="text-sm text-slate-400">Visitantes no Período</p>
                        <p className="text-2xl font-bold text-blue-400">{analytics.visitors.total?.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiEye className="text-green-400 text-2xl mr-3" />
                      <div>
                        <p className="text-sm text-slate-400">Visualizações no Período</p>
                        <p className="text-2xl font-bold text-green-400">{analytics.pageViews.total?.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg min-h-[250px]">
                    <h3 className="text-lg font-semibold mb-4 text-white">Páginas Mais Visitadas</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {analytics.topPages.map((page, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">{page.page}</span>
                          <span className="font-medium text-blue-400">{page.views?.toLocaleString('pt-BR')} views</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-white">Dispositivos</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiSmartphone className="text-blue-400 mr-2" />
                          <span className="text-slate-300">Mobile</span>
                        </div>
                        <span className="font-medium text-blue-400">{analytics.devices.mobile}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiMonitor className="text-green-400 mr-2" />
                          <span className="text-slate-300">Desktop</span>
                        </div>
                        <span className="font-medium text-green-400">{analytics.devices.desktop}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiTablet className="text-purple-400 mr-2" />
                          <span className="text-slate-300">Tablet</span>
                        </div>
                        <span className="font-medium text-purple-400">{analytics.devices.tablet}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* WhatsApp Bot Tab */}
        {activeTab === 'whatsapp' && (
          <WhatsAppControl />
        )}
      </div>
    </div>
  )
}

function AnalyticsInsights({ analytics }: { analytics: Analytics | null }) {
  if (!analytics) return <p className="text-slate-400">Carregando insights...</p>;

  const insights = [];

  // Insight 1: Top page
  if (analytics.topPages.length > 0) {
    const topPage = analytics.topPages[0];
    insights.push(`Sua página mais popular é a **${topPage.page}** com ${topPage.views.toLocaleString('pt-BR')} visualizações. Considere adicionar um call-to-action (CTA) mais proeminente nela para engajar seus visitantes.`);
  }

  // Insight 2: Device usage
  if (analytics.devices.mobile > 60) {
    insights.push(`A maioria dos seus visitantes (${analytics.devices.mobile}%) acessa pelo **celular**. A experiência mobile do seu site é crucial para o sucesso.`);
  } else if (analytics.devices.desktop > 60) {
    insights.push(`A maioria dos seus visitantes (${analytics.devices.desktop}%) acessa pelo **desktop**. Foque em uma experiência de tela grande rica e funcional.`);
  }

  // Insight 3: Top Referrer
  if (analytics.topReferrers.length > 0) {
    const topReferrer = analytics.topReferrers[0].referrer;
    if (topReferrer && topReferrer !== 'direct' && !topReferrer.includes('localhost')) {
      insights.push(`Sua principal fonte de tráfego é **${topReferrer}**. Invista mais em canais similares para atrair mais visitantes.`);
    }
  }

  if (insights.length === 0) {
    return <p className="text-slate-400">Não há insights suficientes para gerar uma análise automática. Colete mais dados.</p>;
  }

  const renderInsight = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
      <p>
        {parts.map((part, i) =>
          i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
        )}
      </p>
    );
  };

  return (
    <ul className="space-y-4 text-slate-300">
      {insights.map((insight, index) => (
        <li key={index} className="flex items-start">
          <FiZap className="text-yellow-400 mr-3 mt-1 flex-shrink-0" />
          {renderInsight(insight)}
        </li>
      ))}
    </ul>
  );
}

function DailyVisitorsChart({ data }: { data: Array<{ date: string; visitors: number }> }) {
  if (!data || data.length < 2) {
    return <p className="text-slate-500 text-center py-8">Não há dados suficientes para exibir o gráfico.</p>;
  }

  const chartHeight = 200;
  const chartWidth = 600;
  const maxValue = Math.max(...data.map(d => d.visitors), 0);

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (d.visitors / (maxValue || 1)) * chartHeight * 0.9 - (chartHeight * 0.05);
    return `${x},${y}`;
  }).join(' ');

  const firstDate = new Date(data[0].date + 'T00:00:00');
  const lastDate = new Date(data[data.length - 1].date + 'T00:00:00');

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="text-softech-blue/40" stopColor="currentColor" />
            <stop offset="100%" className="text-softech-blue/0" stopColor="currentColor" />
          </linearGradient>
        </defs>
        <path d={`M0,${chartHeight} ${points} ${chartWidth},${chartHeight} Z`} fill="url(#chartGradient)" />
        <polyline fill="none" stroke="var(--color-softech-blue)" strokeWidth="2" points={points} />
        <text x={chartWidth - 10} y="15" textAnchor="end" fill="currentColor" className="text-xs text-slate-400">
          Pico: {maxValue.toLocaleString('pt-BR')}
        </text>
      </svg>
      <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
        <span>{firstDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
        <span>{lastDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
      </div>
    </div>
  );
}