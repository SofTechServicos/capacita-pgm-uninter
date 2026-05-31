'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { CurriculoATS } from '../../ats';

export const GeradorClientPage = () => {
  const [data, setData] = useState<CurriculoATS>({
    dadosPessoais: { nome: '', email: '', telefone: '', linkedin: '', cidadeEstado: '' },
    resumo: '',
    experiencias: [{ cargo: '', empresa: '', dataInicio: '', dataFim: '', atual: false, descricao: [''] }],
    formacoes: [{ curso: '', instituicao: '', anoConclusao: '' }],
    habilidades: [''],
  });

  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  return (
    <main className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Início</Link>
        {' > '}
        <Link href="/capacita-pgm" className="hover:text-gray-800">Capacita PGM</Link>
        {' > '}
        <span className="text-gray-800 font-medium">Gerador de Currículo</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Gerador de Currículo ATS
        </h1>
        <p className="text-gray-600 text-lg">
          Crie seu currículo otimizado para robôs de RH em segundos. Padrão Harvard/ATS.
        </p>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden mb-6">
        <div className="flex gap-2 border-b border-gray-300">
          <button
            onClick={() => setMobileTab('form')}
            className={`px-4 py-3 font-medium transition ${
              mobileTab === 'form'
                ? 'border-b-2 border-[#7c3aed] text-[#7c3aed]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            1. Preencher
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`px-4 py-3 font-medium transition ${
              mobileTab === 'preview'
                ? 'border-b-2 border-[#7c3aed] text-[#7c3aed]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            2. Revisar
          </button>
        </div>
      </div>

      {/* Desktop: Split Layout | Mobile: Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className={`${mobileTab === 'form' || typeof window === 'undefined' ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-6">
            <ResumeForm onDataChange={setData} />
          </div>
        </div>

        {/* Preview Column */}
        <div className={`${mobileTab === 'preview' || typeof window === 'undefined' ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-6 h-screen overflow-hidden">
            <div className="hidden md:block text-xs text-gray-500 mb-3 px-4">
              <strong>Prévia em tempo real:</strong> Veja como seu currículo ficará enquanto preenche
            </div>
            <ResumePreview data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
