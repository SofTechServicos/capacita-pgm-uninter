import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { generateCSRFToken } from '../../../lib/csrf'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = generateCSRFToken()
    
    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}