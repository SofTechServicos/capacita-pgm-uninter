import DiagnosticoRapido from '../../components/DiagnosticoRapido'
import BuildsRecomendadas from '../../components/BuildsRecomendadas'
import LinksRapidos from '../../components/LinksRapidos'

export const metadata = {
  title: 'Consultor SOFTECH - Diagnóstico e Recomendações',
  description: 'Ferramenta completa para diagnóstico de problemas, builds recomendadas e links úteis da SOFTECH',
}

export default function ConsultorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Consultor
        </h1>

        <div className="space-y-16">
          <DiagnosticoRapido />
          <BuildsRecomendadas />
          <LinksRapidos />
        </div>
      </div>
    </div>
  )
}