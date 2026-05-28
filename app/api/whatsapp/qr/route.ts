import { NextResponse } from 'next/server'

let qrCodeData: string | null = null

export async function GET() {
  return NextResponse.json({ qrCode: qrCodeData })
}

export async function POST(request: Request) {
  const { qrCode } = await request.json()
  qrCodeData = qrCode
  return NextResponse.json({ success: true })
}

export async function DELETE() {
  qrCodeData = null
  return NextResponse.json({ success: true })
}