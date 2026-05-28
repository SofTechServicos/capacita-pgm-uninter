import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '../../../../../lib/firebase-admin'
import { sanitizeInput } from '../../../../../lib/validation'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const path = sanitizeInput(decodeURIComponent(params.path))
    
    // Buscar página no Firebase
    const pagesRef = adminDb.collection('pages')
    const snapshot = await pagesRef.where('path', '==', path).get()
    
    if (snapshot.empty) {
      // Se não existe no Firebase, permitir acesso (página padrão)
      return NextResponse.json({ active: true })
    }
    
    const pageData = snapshot.docs[0].data()
    return NextResponse.json({ active: pageData.active })
    
  } catch (error) {
    console.error('Error checking page status:', error)
    // Em caso de erro, permitir acesso
    return NextResponse.json({ active: true })
  }
}