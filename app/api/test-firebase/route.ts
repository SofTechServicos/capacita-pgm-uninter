import { NextResponse } from 'next/server'
import { adminDb } from '../../../lib/firebase-admin'

export async function GET() {
  try {
    // Testar se consegue ler do Firebase
    const testRef = adminDb.collection('pages').limit(1)
    const snapshot = await testRef.get()
    
    if (snapshot.empty) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Nenhum documento encontrado',
        config: {
          projectId: process.env.FIREBASE_PROJECT_ID,
          hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
          hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
        }
      })
    }
    
    const doc = snapshot.docs[0]
    const data = doc.data()
    
    // Testar se consegue escrever
    try {
      await doc.ref.set({
        ...data,
        testUpdate: new Date(),
        testField: 'Firebase Admin funcionando!'
      }, { merge: true })
      
      return NextResponse.json({ 
        status: 'success', 
        message: 'Firebase Admin funcionando!',
        docId: doc.id,
        data: data
      })
    } catch (writeError: any) {
      return NextResponse.json({ 
        status: 'write_error', 
        message: 'Erro ao escrever no Firebase',
        error: writeError?.message || 'Erro desconhecido'
      })
    }
    
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'connection_error', 
      message: 'Erro de conexão com Firebase',
      error: error?.message || 'Erro desconhecido',
      config: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
      }
    })
  }
}