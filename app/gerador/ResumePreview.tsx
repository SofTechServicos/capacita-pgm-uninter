'use client';

import React from 'react';
import { CurriculoATS } from '../../ats';
import { FileText } from 'lucide-react';

interface Props {
  data: CurriculoATS;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const { dadosPessoais, resumo, experiencias, formacoes, habilidades } = data;

  const formatMonth = (m?: string) => {
    if (!m) return '';
    try {
      // expected 'YYYY-MM'
      const d = new Date(m + '-01');
      return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(d);
    } catch (e) {
      return m;
    }
  };

  const hasContent = Object.values(dadosPessoais).some(v => v.trim() !== '') || 
                     resumo?.trim() !== '' || 
                     experiencias.some(e => e.cargo || e.empresa) ||
                     formacoes.some(f => f.curso || f.instituicao) ||
                     habilidades.some(h => h.trim() !== '');

  if (!hasContent) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">Seu currículo aparecerá aqui</h3>
          <p className="mt-1 text-sm">
            Preencha os campos para ver a pré-visualização em tempo real.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-8 h-full overflow-y-auto font-serif text-sm">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900">{dadosPessoais.nome || '[Nome completo]'}</h1>
        <div className="mt-2 text-gray-700 space-y-0.5">
          {dadosPessoais.email && <p>{dadosPessoais.email}</p>}
          {dadosPessoais.telefone && <p>{dadosPessoais.telefone}</p>}
          {dadosPessoais.linkedin && <p>{dadosPessoais.linkedin}</p>}
          {dadosPessoais.cidadeEstado && <p>{dadosPessoais.cidadeEstado}</p>}
        </div>
      </div>

      {/* Resumo */}
      {resumo?.trim() && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">RESUMO</h2>
          <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap">{resumo}</p>
        </div>
      )}

      {/* Experiência */}
      {experiencias.some(e => e.cargo || e.empresa) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">EXPERIÊNCIA PROFISSIONAL</h2>
          {experiencias.map((exp, idx) => (
            (exp.cargo || exp.empresa) && (
              <div key={idx} className="mb-3">
                <p className="text-gray-900 text-xs">
                  <span className="font-bold">{exp.cargo || '[Cargo]'}</span>
                  {exp.empresa && ` – ${exp.empresa}`}
                  {exp.dataInicio && (() => {
                    const start = formatMonth(exp.dataInicio);
                    const end = (exp as any).atual ? 'Atual' : (exp.dataFim ? formatMonth(exp.dataFim) : '');
                    return ` (${start}${end ? ` – ${end}` : ''})`;
                  })()}
                </p>
                <ul className="ml-3 mt-1 space-y-0.5">
                  {exp.descricao.map((item, i) => (
                    item.trim() && (
                      <li key={i} className="text-gray-700 text-xs">• {item}</li>
                    )
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}

      {/* Formação */}
      {formacoes.some(f => f.curso || f.instituicao) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">FORMAÇÃO</h2>
          {formacoes.map((f, idx) => (
            (f.curso || f.instituicao) && (
              <p key={idx} className="text-gray-700 text-xs mb-1">
                <span className="font-semibold">{f.curso || '[Curso]'}</span>
                {f.instituicao && ` – ${f.instituicao}`}
                {f.anoConclusao && ` (${f.anoConclusao})`}
              </p>
            )
          ))}
        </div>
      )}

      {/* Habilidades */}
      {habilidades.some(h => h.trim()) && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">HABILIDADES</h2>
          <p className="text-gray-700 text-xs">{habilidades.filter(h => h.trim()).join(' • ')}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
