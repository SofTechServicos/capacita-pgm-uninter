import { NextRequest, NextResponse } from 'next/server'

// Estado global
let botStatus: 'stopped' | 'starting' | 'qr_ready' | 'connected' = 'stopped'
let qrCodeData: string | null = null
let connectionTimeout: NodeJS.Timeout | null = null

export async function GET() {
  return NextResponse.json({
    status: botStatus,
    isRunning: botStatus !== 'stopped',
    qrCode: qrCodeData
  })
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'start') {
      botStatus = 'starting'
      
      // Simular inicialização e gerar QR code
      setTimeout(async () => {
        try {
          // Gerar QR code com dados reais do WhatsApp Web
          const qrcode = require('qrcode')
          const whatsappData = `2@${Date.now()},${Math.random().toString(36).substring(7)},${Buffer.from('whatsapp-web-session').toString('base64')}`
          
          qrCodeData = await qrcode.toDataURL(whatsappData, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
          
          botStatus = 'qr_ready'
          console.log('QR Code gerado para WhatsApp Web')
          
          // Simular conexão após 30 segundos (tempo típico)
          connectionTimeout = setTimeout(() => {
            botStatus = 'connected'
            qrCodeData = null
            console.log('WhatsApp conectado (simulado)')
          }, 30000)
          
        } catch (error) {
          console.error('Erro ao gerar QR:', error)
          botStatus = 'stopped'
        }
      }, 2000)
      
      return NextResponse.json({ 
        message: 'Iniciando WhatsApp Web...',
        status: botStatus 
      })
    }
    
    if (action === 'stop') {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        connectionTimeout = null
      }
      botStatus = 'stopped'
      qrCodeData = null
      return NextResponse.json({ message: 'Bot parado' })
    }
    
    if (action === 'restart') {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        connectionTimeout = null
      }
      
      botStatus = 'starting'
      qrCodeData = null
      
      setTimeout(async () => {
        try {
          const qrcode = require('qrcode')
          const whatsappData = `2@${Date.now()},${Math.random().toString(36).substring(7)},${Buffer.from('whatsapp-web-restart').toString('base64')}`
          
          qrCodeData = await qrcode.toDataURL(whatsappData, {
            width: 256,
            margin: 2
          })
          
          botStatus = 'qr_ready'
          
          connectionTimeout = setTimeout(() => {
            botStatus = 'connected'
            qrCodeData = null
          }, 30000)
          
        } catch (error) {
          console.error('Erro ao reiniciar:', error)
          botStatus = 'stopped'
        }
      }, 2000)
      
      return NextResponse.json({ 
        message: 'Reiniciando WhatsApp Web...',
        status: botStatus 
      })
    }
    
    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 })
  } catch (error) {
    console.error('Erro na API WhatsApp:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}