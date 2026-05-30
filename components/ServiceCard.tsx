import Image from 'next/image'

interface ServiceCardProps {
  nome: string
  descricao: string
  valor: number | null
  imagem: string
}

export default function ServiceCard({ nome, descricao, valor, imagem }: ServiceCardProps) {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden hover:border-accent-cyan/30 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={imagem}
          alt={nome}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2">
          {nome}
        </h3>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed flex-grow">
          {descricao}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-softech-blue">
            {valor ? `R$ ${valor.toFixed(2).replace('.', ',')}` : 'Sob Consulta'}
          </span>
          <a
            href="https://wa.me/5593981154627"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-colors text-sm"
          >
            Solicitar
          </a>
        </div>
      </div>
    </div>
  )
}