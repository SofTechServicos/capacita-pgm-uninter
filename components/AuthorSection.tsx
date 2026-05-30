interface AuthorSectionProps {
  author: string;
  className?: string;
}

export default function AuthorSection({ author, className = '' }: AuthorSectionProps) {
  // Configurações específicas por autor
  const authorConfig = {
    'Elio Queiroz': {
      title: 'Análise de Processos e Melhoria Contínua | Qualidade e Suporte | Cursando Gestão de TI e AWS Cloud',
      description: 'Processos & Qualidade | Melhoria Contínua | TI em formação (Gestão + AWS Cloud)',
      linkedInUrl: 'https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=elio-queiroz-a22391141'
    }
  };

  const config = authorConfig[author as keyof typeof authorConfig] || {
    title: 'Análise de Processos e Melhoria Contínua | Qualidade e Suporte | Cursando Gestão de TI e AWS Cloud',
    description: 'Processos & Qualidade | Melhoria Contínua | TI em formação (Gestão + AWS Cloud)',
    linkedInUrl: 'https://www.linkedin.com/company/softech-servicos-tecnologia'
  };

  return (
    <div className={`bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6 ${className}`}>
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Sobre o autor
          </h3>
          <h4 className="text-xl font-bold text-accent-cyan mb-2">
            {author}
          </h4>
          <p className="text-sm font-medium text-slate-300 mb-2">
            {config.title}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            {config.description}
          </p>
        </div>
        
        <div className="pt-2">
          <a
            href={config.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Conectar no LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}