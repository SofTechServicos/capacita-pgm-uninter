'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiImage } from 'react-icons/fi';

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [quality, setQuality] = useState(0.9);
  const [format, setFormat] = useState('jpeg');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
        setOriginalImage(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const processImage = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      
      const processedDataUrl = canvas.toDataURL(`image/${format}`, quality);
      setProcessedImage(processedDataUrl);
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `resized-image.${format}`;
    link.click();
  };

  const resetImage = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setWidth(800);
    setHeight(600);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Upload Section */}
      {!originalImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Selecione uma imagem
          </h3>
          <p className="text-gray-500 mb-4">
            Suporte para JPG, PNG, WebP até 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-safe-primary px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiUpload className="w-4 h-4" />
            <span>Escolher Arquivo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Imagem Original</h3>
              <p className="text-sm text-gray-600">
                Dimensões: {originalDimensions.width} × {originalDimensions.height}px
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Configurações</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Largura (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Manter proporção</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formato
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              {format === 'jpeg' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualidade: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={processImage}
                  className="flex-1 btn-safe-primary py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Processar Imagem
                </button>
                <button
                  onClick={resetImage}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Nova Imagem
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Visualização</h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Original</h4>
                <img
                  src={originalImage}
                  alt="Original"
                  className="max-w-full h-auto rounded border"
                  style={{ maxHeight: '200px' }}
                />
              </div>

              {processedImage && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Processada</h4>
                    <button
                      onClick={downloadImage}
                      className="flex items-center space-x-1 text-sm badge-safe-green px-3 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      <FiDownload className="w-3 h-3" />
                      <span>Baixar</span>
                    </button>
                  </div>
                  <img
                    src={processedImage}
                    alt="Processada"
                    className="max-w-full h-auto rounded border"
                    style={{ maxHeight: '200px' }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Nova dimensão: {width} × {height}px
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Dicas:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use JPEG para fotos com muitas cores</li>
          <li>• Use PNG para imagens com transparência ou poucas cores</li>
          <li>• WebP oferece melhor compressão, mas nem todos os navegadores suportam</li>
          <li>• Mantenha a proporção ativada para evitar distorção</li>
        </ul>
      </div>
    </div>
  );
}