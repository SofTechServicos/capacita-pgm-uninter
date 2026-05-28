import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const visitorData = await request.json();
    
    // Salvar no Firestore
    await adminDb.collection('analytics').add({
      ...visitorData,
      createdAt: new Date()
    });
    
    console.log('📍 Visita salva no Firebase:', {
      cidade: visitorData.geo.city,
      regiao: visitorData.geo.region,
      pais: visitorData.geo.country,
      dispositivo: visitorData.device.type,
      pagina: visitorData.page
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar analytics:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb.collection('analytics').get();
    const analytics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const now = Date.now();
    const today = new Date().toDateString();
    const thisWeek = now - (7 * 24 * 60 * 60 * 1000);
    const thisMonth = now - (30 * 24 * 60 * 60 * 1000);

    const groupBy = (array: any[], path: string) => {
      const result: { [key: string]: number } = {};
      array.forEach(item => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], item) || 'Unknown';
        result[value] = (result[value] || 0) + 1;
      });
      return Object.entries(result)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([name, count]) => ({ name, count }));
    };

    const stats = {
      total: analytics.length,
      today: analytics.filter((v: any) => new Date(v.timestamp).toDateString() === today).length,
      thisWeek: analytics.filter((v: any) => v.timestamp > thisWeek).length,
      thisMonth: analytics.filter((v: any) => v.timestamp > thisMonth).length,
      byCountry: groupBy(analytics, 'geo.country'),
      byRegion: groupBy(analytics, 'geo.region'),
      byCity: groupBy(analytics, 'geo.city'),
      byDevice: groupBy(analytics, 'device.type'),
      byOS: groupBy(analytics, 'device.os'),
      byBrowser: groupBy(analytics, 'device.browser'),
      byPage: groupBy(analytics, 'page'),
      locations: analytics.map((v: any) => ({
        lat: v.geo?.latitude || 0,
        lng: v.geo?.longitude || 0,
        city: v.geo?.city || 'Unknown',
        region: v.geo?.region || 'Unknown',
        country: v.geo?.country || 'Unknown',
        timestamp: v.timestamp
      }))
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Erro ao buscar analytics:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}