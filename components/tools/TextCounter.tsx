'use client';

import { useState, useMemo } from 'react';
import { FiCopy, FiTrash2 } from 'react-icons/fi';

export default function TextCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    // Tempo de leitura (média de 200 palavras por minuto)
    const readingTime = Math.ceil(words / 200);
    
    // Tempo de fala (média de 150 palavras por minuto)
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
      sentences,
      readingTime,
      speakingTime
    };
  }, [text]);

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setText('');
  };

  const formatText = (type: string) => {
    switch (type) {
      case 'uppercase':
        setText(text.toUpperCase());
        break;
      case 'lowercase':
        setText(text.toLowerCase());
        break;
      case 'capitalize':
        setText(text.replace(/\b\w/g, l => l.toUpperCase()));
        break;
      case 'sentence':
        setText(text.replace(/(^\w|\.\s+\w)/gm, l => l.toUpperCase()));
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Digite ou cole seu texto:
            </label>
            <div className="flex space-x-2">
              <button
                onClick={copyText}
                disabled={!text}
                className="p-2 text-gray-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                title="Copiar texto"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button
                onClick={clearText}
                disabled={!text}
                className="p-2 text-gray-500 hover:text-red-600 disabled:text-gray-300 transition-colors"
                title="Limpar texto"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole ou digite seu texto aqui para análise..."
            className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          {/* Format Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => formatText('uppercase')}
              disabled={!text}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            >
              MAIÚSCULAS
            </button>
            <button
              onClick={() => formatText('lowercase')}
              disabled={!text}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            >
              minúsculas
            </button>
            <button
              onClick={() => formatText('capitalize')}
              disabled={!text}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            >
              Primeira Letra Maiúscula
            </button>
            <button
              onClick={() => formatText('sentence')}
              disabled={!text}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            >
              Formato de Frase
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Estatísticas</h3>
          
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.characters.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Caracteres</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{stats.charactersNoSpaces.toLocaleString()}</div>
              <div className="text-sm text-green-700">Caracteres (sem espaços)</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.words.toLocaleString()}</div>
              <div className="text-sm text-purple-700">Palavras</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.lines}</div>
                <div className="text-xs text-gray-500">Linhas</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.paragraphs}</div>
                <div className="text-xs text-gray-500">Parágrafos</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.sentences}</div>
                <div className="text-xs text-gray-500">Frases</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.readingTime}</div>
                <div className="text-xs text-gray-500">Min. leitura</div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-lg font-bold text-orange-600">{stats.speakingTime} min</div>
              <div className="text-sm text-orange-700">Tempo de fala estimado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-2">Informações úteis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Tempo de leitura:</strong> Baseado em 200 palavras por minuto (velocidade média de leitura)
          </div>
          <div>
            <strong>Tempo de fala:</strong> Baseado em 150 palavras por minuto (velocidade média de apresentação)
          </div>
          <div>
            <strong>Caracteres com espaços:</strong> Inclui todos os caracteres, incluindo espaços e quebras de linha
          </div>
          <div>
            <strong>Caracteres sem espaços:</strong> Conta apenas letras, números e símbolos
          </div>
        </div>
      </div>
    </div>
  );
}