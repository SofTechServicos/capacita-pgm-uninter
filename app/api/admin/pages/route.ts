import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { adminDb } from '../../../../lib/firebase-admin'
import { validatePageData, sanitizeInput, sanitizeLog } from '../../../../lib/validation'
import { rateLimit } from '../../../../lib/rate-limit'
import { getCSRFToken } from '../../../../lib/csrf'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'softechservicosetecnologia@gmail.com'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clientIP = request.ip || 'unknown'
    if (!rateLimit(`admin-get-${clientIP}`, 30, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const pagesRef = adminDb.collection('pages')
    const snapshot = await pagesRef.get()
    
    // Ordenar manualmente
    const docs = snapshot.docs.sort((a, b) => {
      const orderA = a.data().order || 0
      const orderB = b.data().order || 0
      return orderA - orderB
    })
    
    const pages = docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(pages)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validar CSRF Token
    const csrfToken = getCSRFToken(request)
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }
    
    const session = await getServerSession()
    
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clientIP = request.ip || 'unknown'
    if (!rateLimit(`admin-post-${clientIP}`, 10, 60000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const rawData = await request.json()
    const validatedData = validatePageData(rawData)
    
    // Obter próximo número de ordem
    const lastPageSnapshot = await adminDb.collection('pages').orderBy('order', 'desc').limit(1).get()
    const nextOrder = lastPageSnapshot.empty ? 1 : (lastPageSnapshot.docs[0].data().order || 0) + 1
    
    const pageData = {
      name: sanitizeInput(validatedData.name),
      path: sanitizeInput(validatedData.path),
      active: rawData.active ?? true,
      type: validatedData.type,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await adminDb.collection('pages').add(pageData)
    
    return NextResponse.json({ id: docRef.id, ...pageData })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}