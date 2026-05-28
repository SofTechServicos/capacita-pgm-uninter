import { NextResponse } from 'next/server'
import { adminDb } from '../../../../lib/firebase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const pagesRef = adminDb.collection('pages')
    const snapshot = await pagesRef.where('active', '==', true).get()
    
    // Ordenar manualmente após buscar
    const docs = snapshot.docs.sort((a, b) => {
      const orderA = a.data().order || 0
      const orderB = b.data().order || 0
      return orderA - orderB
    })
    
    const activePages = docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        path: data.path,
        active: data.active,
        type: data.type,
        order: data.order || 0
      }
    })
    
    console.log(`📊 Páginas ativas encontradas: ${activePages.length}`)
    console.log(`📄 Páginas:`, activePages.map(p => `${p.name}(${p.active})`).join(', '))
    
    const response = NextResponse.json(activePages)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    console.error('❌ Erro na API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}