import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CurriculoATS, DadosPessoais, Experiencia, Formacao } from '../../../types/ats';
import ATSResumeDocument from './ATSResumeDocument';
import ErrorBoundary from './ErrorBoundary';
import { Download, Plus, Trash2, Book, AlertTriangle } from 'lucide-react';
import Tooltip from './Tooltip';
import toast from 'react-hot-toast';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { 
    ssr: false, 
    loading: () => <button className="flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed"><Download size={18} /> Carregando...</button>
  }
);

interface Props {
  onDataChange?: (data: CurriculoATS) => void;
}

const emptyExperience: Experiencia = {
  cargo: '',
  empresa: '',
  dataInicio: '',
  dataFim: '',
  atual: false,
  descricao: [''],
};

const emptyEducation: Formacao = {
  curso: '',
  instituicao: '',
  anoConclusao: '',
};

const ResumeForm: React.FC<Props> = ({ onDataChange }) => {
  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>({
    nome: '',
    email: '',
    telefone: '',
    linkedin: '',
    cidadeEstado: '',
  });
  const [resumo, setResumo] = useState('');
  const [experiencias, setExperiencias] = useState<Experiencia[]>([emptyExperience]);
  const [formacoes, setFormacoes] = useState<Formacao[]>([emptyEducation]);
  const [habilidades, setHabilidades] = useState<string[]>(['']);
  const [supportsMonth, setSupportsMonth] = useState(true);

  const atualData: CurriculoATS = {
    dadosPessoais,
    resumo,
    experiencias,
    formacoes,
    habilidades: habilidades.filter(h => h.trim()),
  };

  const handleChange = () => {
    onDataChange && onDataChange(atualData);
  };

  useEffect(() => {
    onDataChange && onDataChange({
      dadosPessoais,
      resumo,
      experiencias,
      formacoes,
      habilidades: habilidades.filter(h => h.trim()),
    });
    // Detect support for input[type="month"] in the browser
    try {
      const inp = document.createElement('input');
      inp.setAttribute('type', 'month');
      setSupportsMonth(inp.type === 'month');
    } catch (e) {
      setSupportsMonth(false);
    }
  }, [dadosPessoais, resumo, experiencias, formacoes, habilidades, onDataChange]);

  // handlers for dynamic lists
  const updateExperience = (idx: number, field: keyof Experiencia, value: any) => {
    const list = [...experiencias];
    (list[idx] as any)[field] = value;
    setExperiencias(list);
    handleChange();
  };

  const updateExperienceDescription = (expIdx: number, descIdx: number, value: string) => {
    const list = [...experiencias];
    list[expIdx].descricao[descIdx] = value;
    setExperiencias(list);
    handleChange();
  };

  const addExperience = () => {
    setExperiencias(prev => {
      const next = [...prev, emptyExperience];
      return next;
    });
    handleChange();
  };

  const removeExperience = (idx: number) => {
    setExperiencias(prev => prev.filter((_, i) => i !== idx));
    handleChange();
  };

  const updateFormacao = (idx: number, field: keyof Formacao, value: any) => {
    const list = [...formacoes];
    (list[idx] as any)[field] = value;
    setFormacoes(list);
    handleChange();
  };

  const addFormacao = () => {
    setFormacoes(prev => [...prev, emptyEducation]);
    handleChange();
  };

  const removeFormacao = (idx: number) => {
    setFormacoes(prev => prev.filter((_, i) => i !== idx));
    handleChange();
  };

  const updateHabilidade = (idx: number, value: string) => {
    const list = [...habilidades];
    list[idx] = value;
    setHabilidades(list);
    handleChange();
  };

  const addHabilidade = () => {
    setHabilidades(prev => [...prev, '']);
    handleChange();
  };

  const removeHabilidade = (idx: number) => {
    setHabilidades(prev => prev.filter((_, i) => i !== idx));
    handleChange();
  };

  const getFileName = () => {
    if (dadosPessoais.nome.trim()) {
      return `Curriculo_${dadosPessoais.nome.trim().replace(/\s+/g, '_')}.pdf`;
    }
    return 'curriculo-ats.pdf';
  };

  const hasMinimumData = () => {
    return dadosPessoais.nome.trim() !== '' && dadosPessoais.email.trim() !== '';
  };

  return (
    <div className="space-y-6">
      <section className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-bold text-[#2563eb] flex items-center gap-2">
          1. Dados Pessoais
          <Tooltip text="Informações de contato que aparecem no topo do seu currículo. Nome e Email são obrigatórios.">
            <span className="text-gray-400">ℹ</span>
          </Tooltip>
        </h2>
        
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
              value={dadosPessoais.nome}
              onChange={e => {
                setDadosPessoais({ ...dadosPessoais, nome: e.target.value });
                handleChange();
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="seu.email@example.com"
              className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
              value={dadosPessoais.email}
              onChange={e => {
                setDadosPessoais({ ...dadosPessoais, email: e.target.value });
                handleChange();
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
              value={dadosPessoais.telefone}
              onChange={e => {
                setDadosPessoais({ ...dadosPessoais, telefone: e.target.value });
                handleChange();
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="text"
              placeholder="linkedin.com/in/seu-perfil"
              className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
              value={dadosPessoais.linkedin}
              onChange={e => {
                setDadosPessoais({ ...dadosPessoais, linkedin: e.target.value });
                handleChange();
              }}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade/Estado</label>
            <input
              type="text"
              placeholder="São Paulo, SP"
              className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
              value={dadosPessoais.cidadeEstado}
              onChange={e => {
                setDadosPessoais({ ...dadosPessoais, cidadeEstado: e.target.value });
                handleChange();
              }}
            />
          </div>
        </div>
      </section>

      <section className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-bold text-[#2563eb] flex items-center gap-2">
          2. Resumo Profissional
          <Tooltip text="Escreva 3-4 linhas sobre seu perfil. Foque em resultados e impacto, não apenas em funções desempenhadas.">
            <span className="text-gray-400">ℹ</span>
          </Tooltip>
        </h2>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mt-2 focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
          rows={3}
          value={resumo}
          onChange={e => {
            setResumo(e.target.value);
            handleChange();
          }}
          placeholder="Ex: Desenvolvedor full-stack com 5 anos de experiência em React e Node.js. Especializado em arquitetura escalável e performance web."
        />
      </section>

      <section className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2563eb] flex items-center gap-2">
            3. Experiência Profissional
            <Tooltip text="Adicione suas experiências em ordem cronológica inversa (mais recente primeiro). Descreva resultados e métricas quando possível.">
              <span className="text-gray-400">ℹ</span>
            </Tooltip>
          </h2>
          <button 
            onClick={addExperience}
            className="flex items-center gap-1 bg-[#2563eb] text-white px-3 py-1 rounded text-sm hover:bg-[#1d4ed8] transition"
            type="button"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {experiencias.map((exp, idx) => (
          <div key={idx} className="mb-4 border border-gray-200 p-4 rounded bg-gray-50 relative group">
            {experiencias.length > 1 && (
              <button
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded"
                onClick={() => removeExperience(idx)}
                aria-label="Remover experiência"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  placeholder="Ex: Desenvolvedor Senior"
                  className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                  value={exp.cargo}
                  onChange={e => updateExperience(idx, 'cargo', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  placeholder="Ex: TechCorp Brasil"
                  className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                  value={exp.empresa}
                  onChange={e => updateExperience(idx, 'empresa', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data início</label>
                {supportsMonth ? (
                  <input
                    type="month"
                    placeholder="Ex: 2020-01"
                    className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                    value={exp.dataInicio}
                    onChange={e => updateExperience(idx, 'dataInicio', e.target.value)}
                  />
                ) : (
                  <div className="flex gap-2">
                    <select
                      className="border border-gray-300 rounded p-2 text-sm w-1/2"
                      value={exp.dataInicio ? exp.dataInicio.split('-')[1] : ''}
                      onChange={e => {
                        const year = exp.dataInicio ? exp.dataInicio.split('-')[0] : new Date().getFullYear();
                        const month = e.target.value.padStart(2, '0');
                        updateExperience(idx, 'dataInicio', `${year}-${month}`);
                      }}
                    >
                      <option value="">Mês</option>
                      {[...Array(12)].map((_, m) => {
                        const mm = String(m + 1).padStart(2, '0');
                        return (
                          <option key={mm} value={mm}>{mm}</option>
                        );
                      })}
                    </select>
                    <input
                      type="number"
                      className="border border-gray-300 rounded p-2 text-sm w-1/2"
                      placeholder="Ano"
                      value={exp.dataInicio ? exp.dataInicio.split('-')[0] : ''}
                      onChange={e => {
                        const year = e.target.value;
                        const month = exp.dataInicio ? exp.dataInicio.split('-')[1] || '01' : '01';
                        updateExperience(idx, 'dataInicio', `${year}-${month}`);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data fim</label>
                  {supportsMonth ? (
                    <input
                      type="month"
                      placeholder="Ex: 2023-06"
                      className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                      value={exp.dataFim || ''}
                      onChange={e => updateExperience(idx, 'dataFim', e.target.value)}
                      disabled={!!(exp as any).atual}
                    />
                  ) : (
                    <div className="flex gap-2">
                      <select
                        className="border border-gray-300 rounded p-2 text-sm w-1/2"
                        value={exp.dataFim ? exp.dataFim.split('-')[1] : ''}
                        onChange={e => {
                          const year = exp.dataFim ? exp.dataFim.split('-')[0] : new Date().getFullYear();
                          const month = e.target.value.padStart(2, '0');
                          updateExperience(idx, 'dataFim', `${year}-${month}`);
                        }}
                        disabled={!!(exp as any).atual}
                      >
                        <option value="">Mês</option>
                        {[...Array(12)].map((_, m) => {
                          const mm = String(m + 1).padStart(2, '0');
                          return (
                            <option key={mm} value={mm}>{mm}</option>
                          );
                        })}
                      </select>
                      <input
                        type="number"
                        className="border border-gray-300 rounded p-2 text-sm w-1/2"
                        placeholder="Ano"
                        value={exp.dataFim ? exp.dataFim.split('-')[0] : ''}
                        onChange={e => {
                          const year = e.target.value;
                          const month = exp.dataFim ? exp.dataFim.split('-')[1] || '01' : '01';
                          updateExperience(idx, 'dataFim', `${year}-${month}`);
                        }}
                        disabled={!!(exp as any).atual}
                      />
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!(exp as any).atual}
                    onChange={e => {
                      const list = [...experiencias];
                      (list[idx] as any).atual = e.target.checked;
                      if (e.target.checked) (list[idx] as any).dataFim = '';
                      setExperiencias(list);
                      handleChange();
                    }}
                  />
                  Atual
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição das responsabilidades
                <Tooltip text="Use bullet points claros. Mencione números, percentuais e resultados alcançados.">
                  <span className="text-gray-400 ml-1">ℹ</span>
                </Tooltip>
              </label>

              {exp.descricao.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <textarea
                    className="border border-gray-300 rounded p-2 flex-1 text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                    rows={2}
                    placeholder={`Ponto ${i + 1}: Ex: Aumentei performance em 40% implementando cache...`}
                    value={item}
                    onChange={e => updateExperienceDescription(idx, i, e.target.value)}
                  />
                  {exp.descricao.length > 1 && (
                    <button
                      className="text-red-500 hover:bg-red-50 rounded p-1 transition"
                      onClick={() => {
                        const list = [...experiencias];
                        list[idx].descricao.splice(i, 1);
                        setExperiencias(list);
                        handleChange();
                      }}
                      aria-label="Remover ponto"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}

              <button
                className="text-sm text-[#2563eb] flex items-center gap-1 mt-1 hover:text-[#1d4ed8]"
                onClick={() => {
                  const list = [...experiencias];
                  list[idx].descricao.push('');
                  setExperiencias(list);
                  handleChange();
                }}
              >
                <Plus size={14} /> Adicionar ponto
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2563eb] flex items-center gap-2">
            4. Formação
            <Tooltip text="Escreva o nome exato do curso e instituição. Inclua certificados e cursos relevantes.">
              <span className="text-gray-400">ℹ</span>
            </Tooltip>
          </h2>
          <button 
            onClick={addFormacao}
            className="flex items-center gap-1 bg-[#2563eb] text-white px-3 py-1 rounded text-sm hover:bg-[#1d4ed8] transition"
            type="button"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {formacoes.map((f, idx) => (
          <div key={idx} className="mb-4 border border-gray-200 p-4 rounded bg-gray-50 relative group">
            {formacoes.length > 1 && (
              <button
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded"
                onClick={() => removeFormacao(idx)}
                aria-label="Remover formação"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                <input
                  type="text"
                  placeholder="Ex: Bacharelado em Engenharia de Software"
                  className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                  value={f.curso}
                  onChange={e => updateFormacao(idx, 'curso', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                <input
                  type="text"
                  placeholder="Ex: Universidade de São Paulo"
                  className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                  value={f.instituicao}
                  onChange={e => updateFormacao(idx, 'instituicao', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano de conclusão</label>
                <input
                  type="text"
                  placeholder="Ex: 2020"
                  className="border border-gray-300 rounded p-2 w-full text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                  value={f.anoConclusao}
                  onChange={e => updateFormacao(idx, 'anoConclusao', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2563eb] flex items-center gap-2">
            5. Habilidades
            <Tooltip text="Adicione skills técnicas e comportamentais. Priorize as mais relevantes para a vaga.">
              <span className="text-gray-400">ℹ</span>
            </Tooltip>
          </h2>
        </div>

        <div className="space-y-2 mb-3">
          {habilidades.map((h, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <input
                type="text"
                placeholder="Ex: React, Node.js, etc"
                className="border border-gray-300 rounded p-2 flex-1 text-sm focus:ring-2 focus:ring-[#2563eb] focus:outline-none"
                value={h}
                onChange={e => updateHabilidade(idx, e.target.value)}
              />
              {habilidades.length > 1 && (
                <button
                  className="text-red-500 hover:bg-red-50 rounded p-1 transition mt-1"
                  onClick={() => removeHabilidade(idx)}
                  aria-label="Remover habilidade"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button 
          className="flex items-center gap-1 bg-[#2563eb] text-white px-3 py-1 rounded text-sm hover:bg-[#1d4ed8] transition"
          onClick={addHabilidade}
          type="button"
        >
          <Plus size={16} /> Adicionar Habilidade
        </button>
      </section>

      <div className="flex gap-4 items-center mt-8 border-t border-gray-200 pt-6">
        {hasMinimumData() && (
          <ErrorBoundary
            fallback={
              <button
                disabled
                className="flex items-center gap-2 bg-red-100 text-red-700 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
              >
                <AlertTriangle size={18} /> Ops! Erro ao gerar o PDF.
              </button>
            }
          >
            <PDFDownloadLink
              document={<ATSResumeDocument data={atualData} />}
              fileName={getFileName()}
              style={{ textDecoration: 'none' }}
              onClick={() => {
                toast.success('Sucesso! Seu currículo ATS está pronto.', {
                  duration: 3000,
                  position: 'bottom-center',
                });
              }}
            >
              {({ loading }) => (
                <button
                  className="flex items-center gap-2 bg-[#7c3aed] text-white px-6 py-2 rounded-lg hover:bg-[#6b21a8] transition font-medium shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Baixar PDF
                    </>
                  )}
                </button>
              )}
            </PDFDownloadLink>
          </ErrorBoundary>
        )}

        {!hasMinimumData() && (
          <button
            disabled
            className="flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
            title="Preencha nome e email para habilitar"
          >
            <Download size={18} /> Baixar PDF
          </button>
        )}

        <Link href="/capacita-pgm" className="flex items-center gap-2 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
          <Book size={18} /> Voltar para Cursos
        </Link>
      </div>
    </div>
  );
};

export default ResumeForm;
