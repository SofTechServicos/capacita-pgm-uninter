'use client';

import React from 'react';
import { CurriculoATS } from '../../ats';
import { FileText } from 'lucide-react';

interface Props {
  data: CurriculoATS;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const { dadosPessoais, resumo, experiencias, formacoes, habilidades } = data;

  // FUNÇÃO DE UX: Transforma o texto para Capitalizado
  const toTitleCase = (str?: string) => {
    if (!str) return '';
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
  };

  const formatMonth = (m?: string) => {
    if (!m) return '';
    try {
      const [year, month] = m.split('-');
      if (!year || !month) return m;
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const formatted = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
      return toTitleCase(formatted);
    } catch (e) {
      return m;
    }
  };

  const contacts = [
    dadosPessoais.email?.toLowerCase(),
    dadosPessoais.telefone,
    dadosPessoais.linkedin,
    toTitleCase(dadosPessoais.cidadeEstado)
  ].filter(Boolean);

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
    <div className="bg-white border border-gray-300 rounded-lg p-8 h-full overflow-y-auto font-sans text-slate-700">
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-widest mb-1">
          {dadosPessoais.nome || '[Nome completo]'}
        </h1>
        <div className="flex flex-wrap justify-center items-center text-slate-600 text-xs">
          {contacts.map((c, i) => (
            <React.Fragment key={i}>
              <span>{c}</span>
              {i < contacts.length - 1 && <span className="mx-2 text-slate-400">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Resumo */}
      {resumo?.trim() && (
        <div className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase border-b-[1.5px] border-slate-300 pb-1 mb-2 mt-4">RESUMO PROFISSIONAL</h2>
          <p className="text-slate-700 text-xs leading-relaxed text-justify whitespace-pre-wrap">{resumo}</p>
        </div>
      )}

      {/* Experiência */}
      {experiencias.some(e => e.cargo || e.empresa) && (
        <div className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase border-b-[1.5px] border-slate-300 pb-1 mb-3 mt-4">EXPERIÊNCIA PROFISSIONAL</h2>
          {experiencias.map((exp, idx) => {
            if (!exp.cargo && !exp.empresa) return null;
            const dateStr = exp.dataInicio 
              ? `${formatMonth(exp.dataInicio)}${exp.atual ? ' – Atual' : exp.dataFim ? ` – ${formatMonth(exp.dataFim)}` : ''}`
              : '';
            return (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex-1 pr-4">
                    <span className="font-bold text-gray-900 text-xs">{toTitleCase(exp.cargo) || '[Cargo]'}</span>
                    {exp.empresa && <span className="text-slate-700 text-xs italic ml-1"> {toTitleCase(exp.empresa)}</span>}
                  </div>
                  <span className="text-slate-500 text-[11px] italic whitespace-nowrap">{dateStr}</span>
                </div>
                <ul className="ml-1 space-y-1">
                  {exp.descricao.map((item, i) => (
                    item.trim() && (
                      <li key={i} className="text-slate-700 text-xs flex items-start">
                        <span className="mr-1.5 text-slate-500">•</span>
                        <span className="flex-1 text-justify">{item}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      {/* Formação */}
      {formacoes.some(f => f.curso || f.instituicao) && (
        <div className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase border-b-[1.5px] border-slate-300 pb-1 mb-3 mt-4">FORMAÇÃO ACADÊMICA</h2>
          {formacoes.map((f, idx) => {
            if (!f.curso && !f.instituicao) return null;
            return (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div className="flex-1 pr-4">
                    <span className="font-bold text-gray-900 text-xs">{toTitleCase(f.curso) || '[Curso]'}</span>
                    {f.instituicao && <span className="text-slate-700 text-xs italic ml-1"> {toTitleCase(f.instituicao)}</span>}
                  </div>
                  <span className="text-slate-500 text-[11px] italic whitespace-nowrap">{f.anoConclusao}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Habilidades */}
      {habilidades.some(h => h.trim()) && (
        <div>
          <h2 className="text-[13px] font-bold text-gray-900 uppercase border-b-[1.5px] border-slate-300 pb-1 mb-2 mt-4">HABILIDADES E COMPETÊNCIAS</h2>
          <p className="text-slate-700 text-xs text-justify">{habilidades.filter(h => h.trim()).join('  •  ')}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
