'use client'

import { useState, useEffect } from 'react'
import { FiPlay, FiSquare, FiRefreshCw, FiMessageCircle, FiWifi, FiWifiOff } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface WhatsAppStatus {
  status: 'stopped' | 'starting' | 'qr_ready' | 'connected'
  isRunning: boolean
  qrCode?: string
}

export default function WhatsAppControl() {
  const [status, setStatus] = useState<WhatsAppStatus>({ status: 'stopped', isRunning: false })
  const [loading, setLoading] = useState(false)

  const fetchStatus = async () => {
    try {
      console.log('🔍 Buscando status do WhatsApp...')
      const response = await fetch('/api/whatsapp')
      console.log('📡 Resposta da API:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Dados recebidos:', data)
        setStatus(data)
      } else {
        console.error('❌ Erro na resposta:', response.status)
      }
    } catch (error) {
      console.error('❌ Erro ao buscar status:', error)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 2000)
    return () => clearInterval(interval)
  }, [])

  const controlBot = async (action: 'start' | 'stop' | 'restart') => {
    console.log(`🎮 Ação solicitada: ${action}`)
    setLoading(true)
    
    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      console.log(`📡 Resposta POST: ${response.status}`)
      const data = await response.json()
      console.log('📊 Dados da resposta:', data)
      
      if (response.ok) {
        toast.success(data.message)
        setTimeout(fetchStatus, 1000) // Aguardar 1s antes de buscar status
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error('❌ Erro na operação:', error)
      toast.error('Erro na operação')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = () => {
    switch (status.status) {
      case 'connected': return 'text-green-600'
      case 'qr_ready': return 'text-yellow-600'
      case 'starting': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusText = () => {
    switch (status.status) {
      case 'connected': return 'Conectado'
      case 'qr_ready': return 'QR Code Pronto'
      case 'starting': return 'Iniciando...'
      default: return 'Desconectado'
    }
  }

  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiMessageCircle className="text-green-400" />
          Bot WhatsApp
        </h2>
        <div className="flex items-center gap-2">
          {status.status === 'connected' ? (
            <FiWifi className="text-green-400" />
          ) : (
            <FiWifiOff className="text-slate-400" />
          )}
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg text-center border border-slate-700">
          <div className="text-2xl font-bold text-white mb-1">
            {status.isRunning ? '🟢' : '🔴'}
          </div>
          <div className="text-sm text-slate-300">Status do Processo</div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg text-center border border-slate-700">
          <div className="text-2xl font-bold text-white mb-1">
            {status.status === 'connected' ? '✅' : '⏳'}
          </div>
          <div className="text-sm text-slate-300">Conexão WhatsApp</div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg text-center border border-slate-700">
          <div className="text-2xl font-bold text-white mb-1">🤖</div>
          <div className="text-sm text-slate-300">Assistente Virtual</div>
        </div>
      </div>

      {status.status === 'qr_ready' && status.qrCode && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-lg mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-300">📱</span>
            <strong className="text-yellow-200">Escaneie o QR Code</strong>
          </div>
          <div className="bg-white p-4 rounded-lg inline-block border-2 border-slate-300">
            <img 
              src={status.qrCode} 
              alt="QR Code WhatsApp" 
              className="w-64 h-64 mx-auto block"
              onError={(e) => console.error('Erro ao carregar QR:', e)}
              onLoad={() => console.log('✅ QR Code carregado com sucesso')}
            />
          </div>
          <p className="text-yellow-300 text-sm mt-4">
            Abra o WhatsApp no celular → Menu (3 pontos) → Aparelhos conectados → Conectar um aparelho
          </p>
        </div>
      )}

      {status.status === 'qr_ready' && !status.qrCode && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-300">📱</span>
            <strong className="text-yellow-200">Gerando QR Code...</strong>
          </div>
          <p className="text-yellow-300 text-sm">
            Aguarde alguns segundos para o QR Code aparecer.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => controlBot('start')}
          disabled={loading || status.isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlay />
          Iniciar Bot
        </button>

        <button
          onClick={() => controlBot('stop')}
          disabled={loading || !status.isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSquare />
          Parar Bot
        </button>

        <button
          onClick={() => controlBot('restart')}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-softech-blue text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          Reiniciar
        </button>
      </div>

      <div className="mt-6 p-4 bg-softech-blue/20 rounded-lg border border-softech-blue/30">
        <h3 className="font-medium text-accent-cyan mb-2">ℹ️ Como usar:</h3>
        <ul className="text-slate-300 text-sm space-y-1">
          <li>• <strong>Iniciar:</strong> Liga o bot e gera QR Code</li>
          <li>• <strong>Parar:</strong> Desliga completamente o bot</li>
          <li>• <strong>Reiniciar:</strong> Gera novo QR Code para reconectar</li>
        </ul>
      </div>
    </div>
  )
}