import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CurriculoATS } from '../../ats';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000000',
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contact: {
    fontSize: 10,
    color: '#333333',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 11,
  },
  itemDate: {
    fontSize: 10,
    color: '#333333',
  },
  text: {
    fontSize: 11,
    marginBottom: 3,
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
    paddingRight: 8,
  },
  bullet: {
    width: 10,
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    textAlign: 'justify',
  },
});

interface Props {
  data: CurriculoATS;
}

const ATSResumeDocument: React.FC<Props> = ({ data }) => {
  const { dadosPessoais, resumo, experiencias, formacoes, habilidades } = data;

  const formatMonth = (m?: string) => {
    if (!m) return '';
    try {
      const [year, month] = m.split('-');
      if (!year || !month) return m;
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const formatted = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    } catch (e) {
      return m;
    }
  };

  const contacts = [
    dadosPessoais.email,
    dadosPessoais.telefone,
    dadosPessoais.linkedin,
    dadosPessoais.cidadeEstado
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{dadosPessoais.nome}</Text>
          <View style={styles.contactContainer}>
            {contacts.map((c, i) => (
              <Text key={i} style={styles.contact}>
                {c}{i < contacts.length - 1 ? '  |  ' : ''}
              </Text>
            ))}
          </View>
        </View>

        {resumo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo Profissional</Text>
            <Text style={styles.text}>{resumo}</Text>
          </View>
        )}

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
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemTitle}>{exp.cargo}</Text>
                      <Text style={styles.itemSubtitle}>{exp.empresa}</Text>
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

        {formacoes && formacoes.length > 0 && formacoes.some(f => f.curso || f.instituicao) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
            {formacoes.map((f, idx) => {
              if (!f.curso && !f.instituicao) return null;
              return (
                <View key={idx} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemTitle}>{f.curso}</Text>
                      <Text style={styles.itemSubtitle}>{f.instituicao}</Text>
                    </View>
                    <Text style={styles.itemDate}>{f.anoConclusao}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {habilidades && habilidades.length > 0 && habilidades.some(h => h.trim()) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades e Competências</Text>
            <Text style={styles.text}>{habilidades.filter(h => h.trim()).join(' • ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSResumeDocument;
