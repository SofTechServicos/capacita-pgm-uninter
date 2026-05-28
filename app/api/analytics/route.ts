import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { rateLimit } from '../../../lib/rate-limit'

const ADMIN_EMAIL = 'softechservicosetecnologia@gmail.com'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clientIP = request.ip || 'unknown'
    if (!rateLimit(`analytics-${clientIP}`, 20, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Simulando dados do Google Analytics
    // Em produção, você integraria com a API do Google Analytics
    const mockData = {
      visitors: {
        today: Math.floor(Math.random() * 100) + 50,
        yesterday: Math.floor(Math.random() * 80) + 40,
        thisWeek: Math.floor(Math.random() * 500) + 300,
        thisMonth: Math.floor(Math.random() * 2000) + 1200
      },
      pageViews: {
        today: Math.floor(Math.random() * 200) + 100,
        yesterday: Math.floor(Math.random() * 150) + 80,
        thisWeek: Math.floor(Math.random() * 1000) + 600,
        thisMonth: Math.floor(Math.random() * 4000) + 2400
      },
      topPages: [
        { page: '/', views: Math.floor(Math.random() * 500) + 200 },
        { page: '/servicos', views: Math.floor(Math.random() * 300) + 150 },
        { page: '/contato', views: Math.floor(Math.random() * 200) + 100 },
        { page: '/beta', views: Math.floor(Math.random() * 150) + 75 },
        { page: '/faq', views: Math.floor(Math.random() * 100) + 50 }
      ],
      devices: {
        mobile: Math.floor(Math.random() * 60) + 40,
        desktop: Math.floor(Math.random() * 40) + 30,
        tablet: Math.floor(Math.random() * 20) + 10
      }
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}