import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CurriculoATS } from '../../ats'; // Ajuste o caminho se necessário

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 45,
    paddingRight: 45,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5, // Melhor respirabilidade na leitura
    color: '#111827', // Slate-900 (Preto mais suave, menos agressivo aos olhos)
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24, // Maior destaque para o nome
    fontFamily: 'Helvetica-Bold',
    marginBottom: 14, // Espaçamento aumentado entre o nome e os contatos
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#000000',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contact: {
    fontSize: 10,
    color: '#475569', // Slate-600 para contatos
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 16, // Mais espaço entre as seções
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#111827',
    borderBottomWidth: 1.5, // Linha um pouco mais grossa...
    borderBottomColor: '#cbd5e1', // ...porém em tom cinza claro (Design moderno)
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 8, // Afasta do conteúdo anterior
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12, // Destaque maior para o Cargo/Curso
    color: '#000000',
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 11,
    color: '#334155', // Cinza escuro para Empresa/Instituição
  },
  itemDate: {
    fontSize: 10,
    color: '#64748b', // Slate-500
    fontFamily: 'Helvetica-Oblique',
  },
  text: {
    fontSize: 11,
    marginBottom: 4,
    textAlign: 'justify',
    color: '#334155',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 6, // Mais recuo para o bullet point
    paddingRight: 10,
  },
  bullet: {
    width: 12,
    fontSize: 11,
    color: '#475569',
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    textAlign: 'justify',
    color: '#334155',
  },
});

interface Props {
  data: CurriculoATS;
}

const ATSResumeDocument: React.FC<Props> = ({ data }) => {
  const { dadosPessoais, resumo, experiencias, formacoes, habilidades } = data;

  // FUNÇÃO DE UX: Transforma "supervisor de faturamento" em "Supervisor De Faturamento"
  const toTitleCase = (str?: string) => {
    if (!str) return '';
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
  };

  // FUNÇÃO: Formata a data e capitaliza o mês (Ex: Ago. de 2025)
  const formatMonth = (m?: string) => {
    if (!m) return '';
    try {
      const [year, month] = m.split('-');
      if (!year || !month) return m;
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const formatted = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
      return toTitleCase(formatted);
    } catch (e) {
      return m;
    }
  };

  const contacts = [
    dadosPessoais.email?.toLowerCase(),
    dadosPessoais.telefone,
    dadosPessoais.linkedin,
    toTitleCase(dadosPessoais.cidadeEstado)
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.name}>{dadosPessoais.nome}</Text>
          <View style={styles.contactContainer}>
            {contacts.map((c, i) => (
              <Text key={i} style={styles.contact}>
                {c}{i < contacts.length - 1 ? '   |   ' : ''}
              </Text>
            ))}
          </View>
        </View>

        {/* RESUMO PROFISSIONAL */}
        {resumo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo Profissional</Text>
            <Text style={styles.text}>{resumo}</Text>
          </View>
        )}

        {/* EXPERIÊNCIA PROFISSIONAL */}
        {experiencias && experiencias.length > 0 && experiencias.some(e => e.cargo || e.empresa) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experiencias.map((exp, idx) => {
              if (!exp.cargo && !exp.empresa) return null;
              const dateStr = exp.dataInicio 
                ? `${formatMonth(exp.dataInicio)}${exp.atual ? ' – Atual' : exp.dataFim ? ` – ${formatMonth(exp.dataFim)}` : ''}`
                : '';
              return (
                <View key={idx} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      {/* Aplica o TitleCase para corrigir erros de digitação do usuário */}
                      <Text style={styles.itemTitle}>{toTitleCase(exp.cargo)}</Text>
                      <Text style={styles.itemSubtitle}>{toTitleCase(exp.empresa)}</Text>
                    </View>
                    <Text style={styles.itemDate}>{dateStr}</Text>
                  </View>
                  {exp.descricao && exp.descricao.map((item, i) => item.trim() ? (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ) : null)}
                </View>
              );
            })}
          </View>
        )}

        {/* FORMAÇÃO ACADÊMICA */}
        {formacoes && formacoes.length > 0 && formacoes.some(f => f.curso || f.instituicao) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
            {formacoes.map((f, idx) => {
              if (!f.curso && !f.instituicao) return null;
              return (
                <View key={idx} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <Text style={styles.itemTitle}>{toTitleCase(f.curso)}</Text>
                      <Text style={styles.itemSubtitle}>{toTitleCase(f.instituicao)}</Text>
                    </View>
                    <Text style={styles.itemDate}>{f.anoConclusao}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* HABILIDADES */}
        {habilidades && habilidades.length > 0 && habilidades.some(h => h.trim()) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades e Competências</Text>
            <Text style={styles.text}>{habilidades.filter(h => h.trim()).join('  •  ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSResumeDocument;