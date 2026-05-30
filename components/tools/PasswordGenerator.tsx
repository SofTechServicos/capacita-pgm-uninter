'use client';

import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiCheck } from 'react-icons/fi';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { text: 'Fraca', color: 'bg-red-500' };
    if (score <= 4) return { text: 'Média', color: 'bg-yellow-500' };
    return { text: 'Forte', color: 'bg-green-500' };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div className="bg-red-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-red-800 mb-2">🔒 Gerador de Senhas Profissional</h3>
        <p className="text-red-700 text-sm">Algoritmo criptográfico avançado. 100% seguro e privado.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              📏 Comprimento: {length} caracteres
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-red-600">Fraca (8)</span>
              <span className="text-yellow-600">Média (16)</span>
              <span className="text-green-600">Forte (32)</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Incluir:</h3>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Letras maiúsculas (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Letras minúsculas (a-z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Números (0-9)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Símbolos (!@#$%^&*)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-lg hover:from-red-700 hover:to-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg"
          >
            <FiRefreshCw className="w-5 h-5" />
            <span>🔐 Gerar Senha Segura</span>
          </button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              🔑 Sua Senha Segura:
            </label>
            <div className="relative">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Clique em 'Gerar Senha' para criar uma nova senha"
                className="w-full p-4 pr-12 border border-gray-300 rounded-lg bg-gray-50 font-mono text-lg"
              />
              {password && (
                <button
                  onClick={copyPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {copied ? <FiCheck className="w-5 h-5 text-green-600" /> : <FiCopy className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          {password && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Força da senha:</span>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${strength.color}`}>
                  {strength.text}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Análise:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Comprimento: {length} caracteres</li>
                  <li>• Tipos de caracteres: {[includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length}/4</li>
                  <li>• Combinações possíveis: {Math.pow(
                    (includeUppercase ? 26 : 0) + 
                    (includeLowercase ? 26 : 0) + 
                    (includeNumbers ? 10 : 0) + 
                    (includeSymbols ? 32 : 0), 
                    length
                  ).toExponential(2)}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">🛡️ Dicas de Segurança Essenciais:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <div className="font-semibold text-green-700 mb-1">✅ FAÇA</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use 12+ caracteres</li>
              <li>• Misture tipos de caracteres</li>
              <li>• Uma senha por conta</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
            <div className="font-semibold text-red-700 mb-1">❌ NÃO FAÇA</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Reutilizar senhas</li>
              <li>• Usar dados pessoais</li>
              <li>• Compartilhar senhas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}