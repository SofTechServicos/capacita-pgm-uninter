'use client';

import { useState } from 'react';
import { FiCopy, FiArrowRight, FiArrowLeft, FiTrash2, FiCheck } from 'react-icons/fi';

export default function Base64Converter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!inputText.trim()) return;

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputText)));
        setOutputText(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(inputText)));
        setOutputText(decoded);
      }
    } catch (error) {
      setOutputText('Erro: Texto inválido para decodificação Base64');
    }
  };

  const handleSwapMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    
    // Trocar os textos também
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  const examples = {
    encode: [
      { text: 'Olá, mundo!', description: 'Texto simples' },
      { text: 'SofTech Serviços e Tecnologia', description: 'Nome da empresa' },
      { text: 'https://softechservicos.vercel.app', description: 'URL do site' },
      { text: '{"nome": "João", "idade": 30}', description: 'JSON' }
    ],
    decode: [
      { text: 'T2zDoSwgbXVuZG8h', description: 'Decodificar "Olá, mundo!"' },
      { text: 'U29mVGVjaCBTZXJ2acOnb3MgZSBUZWNub2xvZ2lh', description: 'Nome da empresa' },
      { text: 'aHR0cHM6Ly9zb2Z0ZWNoc2Vydmljb3MudmVyY2VsLmFwcA==', description: 'URL do site' },
      { text: 'eyJub21lIjogIkpvw6NvIiwgImlkYWRlIjogMzB9', description: 'JSON decodificado' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Codificar
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Decodificar
          </button>
        </div>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Texto Original' : 'Texto Base64'}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(inputText)}
                disabled={!inputText}
                className="p-1 text-gray-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                title="Copiar entrada"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button
                onClick={clearAll}
                disabled={!inputText && !outputText}
                className="p-1 text-gray-500 hover:text-red-600 disabled:text-gray-300 transition-colors"
                title="Limpar tudo"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              mode === 'encode' 
                ? 'Digite o texto que deseja codificar...' 
                : 'Cole o texto Base64 que deseja decodificar...'
            }
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          />
          
          <div className="text-xs text-gray-500">
            Caracteres: {inputText.length}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Resultado Base64' : 'Texto Decodificado'}
            </label>
            <button
              onClick={() => copyToClipboard(outputText)}
              disabled={!outputText}
              className="p-1 text-gray-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
              title="Copiar resultado"
            >
              {copied ? <FiCheck className="w-4 h-4 text-green-600" /> : <FiCopy className="w-4 h-4" />}
            </button>
          </div>
          
          <textarea
            value={outputText}
            readOnly
            placeholder="O resultado aparecerá aqui..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
          />
          
          <div className="text-xs text-gray-500">
            Caracteres: {outputText.length}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleConvert}
          disabled={!inputText.trim()}
          className="btn-safe-primary px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {mode === 'encode' ? <FiArrowRight className="w-4 h-4" /> : <FiArrowLeft className="w-4 h-4" />}
          <span>{mode === 'encode' ? 'Codificar' : 'Decodificar'}</span>
        </button>
        
        <button
          onClick={handleSwapMode}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
        >
          <FiArrowRight className="w-4 h-4 transform rotate-90" />
          <span>Trocar Modo</span>
        </button>
      </div>

      {/* Examples */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-3">
          Exemplos para {mode === 'encode' ? 'Codificar' : 'Decodificar'}:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples[mode].map((example, index) => (
            <button
              key={index}
              onClick={() => setInputText(example.text)}
              className="text-left p-3 bg-white rounded border hover:bg-blue-50 transition-colors"
            >
              <div className="font-medium text-sm text-gray-800 mb-1">
                {example.description}
              </div>
              <div className="text-xs text-gray-600 font-mono break-all">
                {example.text.length > 50 ? example.text.substring(0, 50) + '...' : example.text}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Sobre Base64:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Base64 é um método de codificação que converte dados binários em texto ASCII</li>
          <li>• Muito usado para transmitir dados através de protocolos que só suportam texto</li>
          <li>• Comum em emails, URLs de dados, e APIs web</li>
          <li>• O texto codificado fica aproximadamente 33% maior que o original</li>
          <li>• Suporta caracteres UTF-8, incluindo acentos e emojis</li>
        </ul>
      </div>
    </div>
  );
}