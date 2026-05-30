'use client';

import { useState, useRef } from 'react';
import { FiDownload, FiCopy } from 'react-icons/fi';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    
    try {
      // Usando API pública do QR Server
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
      setQrCode(qrUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">🚀 Gerador QR Code Profissional</h3>
        <p className="text-blue-700 text-sm">Gratuito, instantâneo e 100% seguro. Funciona offline no seu navegador.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              📝 Digite seu texto, URL ou WhatsApp:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Exemplo: https://meusite.com ou Olá! Escaneie para ver minha mensagem"
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              📏 Tamanho: {size}x{size}px
            </label>
            <input
              type="range"
              min="150"
              max="400"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Pequeno</span>
              <span>Médio</span>
              <span>Grande</span>
            </div>
          </div>

          <button
            onClick={generateQR}
            disabled={!text.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg"
          >
            ⚡ Gerar QR Code Instantâneo
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {qrCode ? (
            <>
              <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                <img 
                  src={qrCode} 
                  alt="QR Code gerado" 
                  className="max-w-full h-auto"
                />
              </div>
              <button
                onClick={downloadQR}
                className="flex items-center space-x-2 badge-safe-green py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                <span>Baixar PNG</span>
              </button>
            </>
          ) : (
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
              QR Code aparecerá aqui
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">💡 Exemplos Mais Usados (clique para testar):</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setText('https://wa.me/5591980202752?text=Ol%C3%A1%2C%20vim%20pelo%20QR%20Code!')}
            className="text-left p-4 bg-white rounded-lg border-2 hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
          >
            <div className="font-semibold text-green-700">📱 WhatsApp</div>
            <div className="text-sm text-gray-600">Link direto para conversa</div>
          </button>
          <button
            onClick={() => setText('https://softechservicos.vercel.app')}
            className="text-left p-4 bg-white rounded-lg border-2 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
          >
            <div className="font-semibold text-blue-700">🌐 Site/URL</div>
            <div className="text-sm text-gray-600">Link para website</div>
          </button>
          <button
            onClick={() => setText('Parabéns! Você escaneou o QR Code corretamente! 🎉')}
            className="text-left p-4 bg-white rounded-lg border-2 hover:border-purple-500 hover:bg-purple-50 transition-all shadow-sm"
          >
            <div className="font-semibold text-purple-700">📝 Mensagem</div>
            <div className="text-sm text-gray-600">Texto personalizado</div>
          </button>
          <button
            onClick={() => setText('WIFI:T:WPA;S:MinhaRede;P:minhasenha123;H:false;;')}
            className="text-left p-4 bg-white rounded-lg border-2 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm"
          >
            <div className="font-semibold text-orange-700">📶 WiFi</div>
            <div className="text-sm text-gray-600">Conexão automática</div>
          </button>
        </div>
      </div>
    </div>
  );
}