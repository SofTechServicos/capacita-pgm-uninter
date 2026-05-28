import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const mockAnalytics = {
    summary: {
      totalVisitors: 247,
      courseAccesses: 89,
      toolDownloads: 34,
      avgTimeOnPage: 4.2,
      feedbackCount: 12,
      avgRating: 4.6
    },
    topCourses: [
      { course: 'Excel 2016 (básico ao avançado)', institution: 'Fundação Bradesco', accesses: 23 },
      { course: 'Educação Financeira Pessoal', institution: 'Escola Virtual Gov', accesses: 18 },
      { course: 'Comunicação Escrita e Oral', institution: 'Fundação Bradesco', accesses: 15 }
    ],
    impactMetrics: {
      odsAlignment: {
        'ODS 4 - Educação de Qualidade': '30+ cursos gratuitos',
        'ODS 8 - Trabalho Decente': 'Kit de ferramentas para empregabilidade',
        'ODS 10 - Redução das Desigualdades': 'Acesso democrático à capacitação'
      }
    }
  };

  return NextResponse.json({
    success: true,
    data: mockAnalytics,
    generatedAt: new Date().toISOString()
  });
}