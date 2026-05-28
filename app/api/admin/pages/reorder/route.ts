import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { adminDb } from '../../../../../lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || session.user.email !== 'softechservicosetecnologia@gmail.com') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { pages } = await request.json()
    
    const batch = adminDb.batch()
    
    for (const page of pages) {
      const pageRef = adminDb.collection('pages').doc(page.id)
      batch.update(pageRef, { order: page.order })
    }
    
    await batch.commit()
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao reordenar páginas:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}