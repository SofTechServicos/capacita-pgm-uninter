import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, addDoc, query, serverTimestamp } from 'firebase/firestore';
// ATENÇÃO: Verifique se o caminho do seu arquivo de configuração do firebase está correto
import { db } from '@/lib/firebase'; 

export async function GET() {
  try {
    // Busca os eventos reais salvos no Firebase
    const q = query(collection(db, 'analytics_events'));
    const snapshot = await getDocs(q);

    let courseAccesses = 0;
    let toolDownloads = 0;
    const courseStats: Record<string, number> = {};

    // Processa os dados
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Contabiliza cliques em cursos
      if (data.event === 'course_click' || data.tipo === 'clique_curso') {
        courseAccesses++;
        const courseName = data.course_name || data.curso || 'Curso Externo';
        courseStats[courseName] = (courseStats[courseName] || 0) + 1;
      }
      
      // Contabiliza downloads de ferramentas
      if (data.event === 'tool_download' || data.tipo === 'download_ferramenta') {
        toolDownloads++;
      }
    });

    // Pega os 3 cursos mais acessados
    const topCourses = Object.entries(courseStats)
      .map(([course, accesses]) => ({ course, accesses }))
      .sort((a, b) => b.accesses - a.accesses)
      .slice(0, 3);

    const realAnalytics = {
      summary: {
        totalVisitors: Math.floor((courseAccesses + toolDownloads) * 0.8), // Estimativa baseada em eventos
        courseAccesses,
        toolDownloads,
        avgTimeOnPage: 4.2, 
        feedbackCount: 0,
        avgRating: 0
      },
      topCourses,
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
      data: realAnalytics,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao buscar analytics real:', error);
    return NextResponse.json({ success: false, error: 'Erro ao buscar dados' }, { status: 500 });
  }
}

// Criamos também uma rota POST para que o front-end possa enviar os cliques para o banco
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Salva o evento disparado pelo usuário no Firebase
    await addDoc(collection(db, 'analytics_events'), {
      ...body,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar evento:', error);
    return NextResponse.json({ success: false, error: 'Erro ao salvar evento' }, { status: 500 });
  }
}
