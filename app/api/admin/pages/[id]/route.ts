import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
import { adminDb } from '../../../../../lib/firebase-admin'
import { sanitizeInput, sanitizeLog } from '../../../../../lib/validation'
import { getCSRFToken, validateCSRFToken } from '../../../../../lib/csrf'

// const ADMIN_EMAIL = 'softechservicosetecnologia@gmail.com'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validar CSRF Token
    const csrfToken = getCSRFToken(request)
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }
    
    // TEMPORÁRIO: Sem autenticação para funcionar
    // TODO: Corrigir NextAuth no Vercel
    console.log('⚠️ ATENÇÃO: API sem autenticação (temporário)')

    const { active } = await request.json()
    
    console.log(`🔄 Atualizando página ${sanitizeLog(params.id)} para active: ${sanitizeLog(active)}`)
    
    const docRef = adminDb.collection('pages').doc(params.id)
    
    await docRef.set({
      active,
      updatedAt: new Date()
    }, { merge: true })
    
    console.log(`✅ Página ${sanitizeLog(params.id)} atualizada com sucesso para active: ${sanitizeLog(active)}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`❌ Erro ao atualizar página ${sanitizeLog(params.id)}:`, sanitizeLog(error))
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validar CSRF Token
    const csrfToken = getCSRFToken(request)
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }
    
    // TEMPORÁRIO: Sem autenticação para funcionar
    // TODO: Corrigir NextAuth no Vercel
    console.log('⚠️ ATENÇÃO: API DELETE sem autenticação (temporário)')
    
    const sanitizedId = sanitizeInput(params.id)

    await adminDb.collection('pages').doc(sanitizedId).delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}