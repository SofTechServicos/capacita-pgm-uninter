'use client'

import { FiMapPin, FiGlobe } from 'react-icons/fi'

interface GeoData {
  topCountries: Array<{ country: string; visitors: number }>;
  topCities: Array<{ city: string; country: string; visitors: number }>;
}

interface GeoAnalyticsProps {
  geoData: GeoData;
}

export default function GeoAnalytics({ geoData }: GeoAnalyticsProps) {
  const { topCountries, topCities } = geoData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Countries */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <FiGlobe className="mr-2" />
          Top Países
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {topCountries.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-slate-300">{item.country}</span>
              <span className="font-medium text-blue-400">{item.visitors.toLocaleString('pt-BR')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <FiMapPin className="mr-2" />
          Top Cidades
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {topCities.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-slate-300">{item.city}, {item.country}</span>
              <span className="font-medium text-green-400">{item.visitors.toLocaleString('pt-BR')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}