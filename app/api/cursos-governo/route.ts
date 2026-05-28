import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface CursoGoverno {
  id: string;
  nome: string;
  area_tematica: string;
  competencias: string;
  carga_horaria: string;
  modalidade: string;
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'catalago-de-cursos-EV.Gov.csv');
    
    if (!fs.existsSync(csvPath)) {
      // Fallback com dados estáticos baseados no CSV real
      const cursosEstaticos: CursoGoverno[] = [
        { id: 'gov-1', nome: 'Administração Pública', area_tematica: 'Gestão Pública', competencias: 'Princípios e práticas da administração pública brasileira', carga_horaria: '40h', modalidade: 'Online' },
        { id: 'gov-2', nome: 'Atendimento ao Cidadão', area_tematica: 'Atendimento', competencias: 'Técnicas de atendimento e relacionamento com o público', carga_horaria: '20h', modalidade: 'Online' },
        { id: 'gov-3', nome: 'Gestão de Projetos', area_tematica: 'Gestão', competencias: 'Metodologias e ferramentas para gestão de projetos', carga_horaria: '60h', modalidade: 'Online' },
        { id: 'gov-4', nome: 'Licitações e Contratos', area_tematica: 'Direito Administrativo', competencias: 'Processos licitatórios e gestão de contratos públicos', carga_horaria: '50h', modalidade: 'Online' },
        { id: 'gov-5', nome: 'Ética no Serviço Público', area_tematica: 'Ética', competencias: 'Princípios éticos e conduta no serviço público', carga_horaria: '30h', modalidade: 'Online' },
        { id: 'gov-6', nome: 'Gestão de Pessoas', area_tematica: 'Recursos Humanos', competencias: 'Técnicas de gestão e desenvolvimento de pessoas', carga_horaria: '45h', modalidade: 'Online' },
        { id: 'gov-7', nome: 'Orçamento Público', area_tematica: 'Finanças Públicas', competencias: 'Elaboração e execução do orçamento público', carga_horaria: '55h', modalidade: 'Online' },
        { id: 'gov-8', nome: 'Transparência e Acesso à Informação', area_tematica: 'Transparência', competencias: 'Lei de Acesso à Informação e transparência pública', carga_horaria: '25h', modalidade: 'Online' },
        { id: 'gov-9', nome: 'Planejamento Estratégico', area_tematica: 'Planejamento', competencias: 'Técnicas de planejamento estratégico no setor público', carga_horaria: '40h', modalidade: 'Online' },
        { id: 'gov-10', nome: 'Controle Interno', area_tematica: 'Auditoria', competencias: 'Sistemas de controle interno e auditoria governamental', carga_horaria: '35h', modalidade: 'Online' },
        { id: 'gov-11', nome: 'Gestão de Documentos', area_tematica: 'Arquivologia', competencias: 'Organização e gestão de documentos públicos', carga_horaria: '30h', modalidade: 'Online' },
        { id: 'gov-12', nome: 'Políticas Públicas', area_tematica: 'Políticas Públicas', competencias: 'Formulação e implementação de políticas públicas', carga_horaria: '50h', modalidade: 'Online' }
      ];
      
      return NextResponse.json({
        success: true,
        total: cursosEstaticos.length,
        cursos: cursosEstaticos
      });
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return NextResponse.json(
        { success: false, error: 'CSV vazio ou inválido' },
        { status: 400 }
      );
    }
    
    const cursos: CursoGoverno[] = [];
    
    for (let i = 1; i < Math.min(lines.length, 101); i++) {
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 4) {
        cursos.push({
          id: `gov-${i}`,
          nome: values[0] || 'Curso sem nome',
          area_tematica: values[1] || 'Geral',
          competencias: values[2] || 'Não especificado',
          carga_horaria: values[3] || '0h',
          modalidade: 'Online'
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: cursos.length,
      cursos
    });

  } catch (error) {
    console.error('Erro ao ler CSV:', error);
    return NextResponse.json(
      { success: false, error: `Erro interno: ${error instanceof Error ? error.message : 'Desconhecido'}` },
      { status: 500 }
    );
  }
}