'use client';

import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const conversions = {
  length: {
    name: 'Comprimento',
    units: {
      mm: { name: 'Milímetros', factor: 1 },
      cm: { name: 'Centímetros', factor: 10 },
      m: { name: 'Metros', factor: 1000 },
      km: { name: 'Quilômetros', factor: 1000000 },
      in: { name: 'Polegadas', factor: 25.4 },
      ft: { name: 'Pés', factor: 304.8 },
      yd: { name: 'Jardas', factor: 914.4 },
      mi: { name: 'Milhas', factor: 1609344 }
    }
  },
  weight: {
    name: 'Peso',
    units: {
      mg: { name: 'Miligramas', factor: 1 },
      g: { name: 'Gramas', factor: 1000 },
      kg: { name: 'Quilogramas', factor: 1000000 },
      oz: { name: 'Onças', factor: 28349.5 },
      lb: { name: 'Libras', factor: 453592 },
      t: { name: 'Toneladas', factor: 1000000000 }
    }
  },
  temperature: {
    name: 'Temperatura',
    units: {
      c: { name: 'Celsius', factor: 1 },
      f: { name: 'Fahrenheit', factor: 1 },
      k: { name: 'Kelvin', factor: 1 }
    }
  },
  area: {
    name: 'Área',
    units: {
      mm2: { name: 'mm²', factor: 1 },
      cm2: { name: 'cm²', factor: 100 },
      m2: { name: 'm²', factor: 1000000 },
      km2: { name: 'km²', factor: 1000000000000 },
      in2: { name: 'pol²', factor: 645.16 },
      ft2: { name: 'pé²', factor: 92903 },
      ha: { name: 'Hectares', factor: 10000000000 }
    }
  },
  volume: {
    name: 'Volume',
    units: {
      ml: { name: 'Mililitros', factor: 1 },
      l: { name: 'Litros', factor: 1000 },
      m3: { name: 'm³', factor: 1000000 },
      gal: { name: 'Galões (US)', factor: 3785.41 },
      qt: { name: 'Quartos (US)', factor: 946.353 },
      pt: { name: 'Pints (US)', factor: 473.176 },
      cup: { name: 'Xícaras (US)', factor: 236.588 }
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const convertValue = (value: string, from: string, to: string, cat: string) => {
    if (!value || isNaN(Number(value))) return '';

    const num = Number(value);
    const categoryData = conversions[cat as keyof typeof conversions];

    if (cat === 'temperature') {
      // Conversões especiais para temperatura
      let celsius: number;
      
      // Converter para Celsius primeiro
      switch (from) {
        case 'c':
          celsius = num;
          break;
        case 'f':
          celsius = (num - 32) * 5/9;
          break;
        case 'k':
          celsius = num - 273.15;
          break;
        default:
          celsius = num;
      }

      // Converter de Celsius para a unidade desejada
      let result: number;
      switch (to) {
        case 'c':
          result = celsius;
          break;
        case 'f':
          result = celsius * 9/5 + 32;
          break;
        case 'k':
          result = celsius + 273.15;
          break;
        default:
          result = celsius;
      }

      return result.toFixed(2);
    } else {
      // Conversões normais usando fatores
      const fromFactor = (categoryData.units as any)[from]?.factor || 1;
      const toFactor = (categoryData.units as any)[to]?.factor || 1;
      
      const result = (num * fromFactor) / toFactor;
      return result.toFixed(6).replace(/\.?0+$/, '');
    }
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    const converted = convertValue(value, fromUnit, toUnit, category);
    setToValue(converted);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    const converted = convertValue(value, toUnit, fromUnit, category);
    setFromValue(converted);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory as keyof typeof conversions].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('1');
    setToValue('');
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  // Atualizar conversão quando as unidades mudarem
  useEffect(() => {
    if (fromValue) {
      const converted = convertValue(fromValue, fromUnit, toUnit, category);
      setToValue(converted);
    }
  }, [fromUnit, toUnit, category, fromValue]);

  const currentCategory = conversions[category as keyof typeof conversions];

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categoria de Conversão
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(conversions).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                category === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="bg-white border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* From */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              De:
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(currentCategory.units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromValueChange(e.target.value)}
              placeholder="Digite o valor"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              title="Trocar unidades"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* To */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Para:
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(currentCategory.units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={toValue}
              onChange={(e) => handleToValueChange(e.target.value)}
              placeholder="Resultado"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-blue-50"
            />
          </div>
        </div>

        {/* Result Display */}
        {fromValue && toValue && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="text-center">
              <span className="text-lg">
                <strong>{fromValue}</strong> {(currentCategory.units as any)[fromUnit]?.name}
              </span>
              <span className="mx-3 text-gray-500">=</span>
              <span className="text-lg text-green-600">
                <strong>{toValue}</strong> {(currentCategory.units as any)[toUnit]?.name}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Conversions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-3">Conversões Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {category === 'length' && (
            <>
              <div className="bg-white p-3 rounded border">1 metro = 100 centímetros</div>
              <div className="bg-white p-3 rounded border">1 quilômetro = 1000 metros</div>
              <div className="bg-white p-3 rounded border">1 polegada = 2.54 centímetros</div>
              <div className="bg-white p-3 rounded border">1 pé = 30.48 centímetros</div>
            </>
          )}
          {category === 'weight' && (
            <>
              <div className="bg-white p-3 rounded border">1 quilograma = 1000 gramas</div>
              <div className="bg-white p-3 rounded border">1 tonelada = 1000 quilogramas</div>
              <div className="bg-white p-3 rounded border">1 libra = 453.59 gramas</div>
              <div className="bg-white p-3 rounded border">1 onça = 28.35 gramas</div>
            </>
          )}
          {category === 'temperature' && (
            <>
              <div className="bg-white p-3 rounded border">0°C = 32°F = 273.15K</div>
              <div className="bg-white p-3 rounded border">100°C = 212°F = 373.15K</div>
              <div className="bg-white p-3 rounded border">Fórmula C→F: (C × 9/5) + 32</div>
              <div className="bg-white p-3 rounded border">Fórmula F→C: (F - 32) × 5/9</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}