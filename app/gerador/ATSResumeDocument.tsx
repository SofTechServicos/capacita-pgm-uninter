import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CurriculoATS } from '../../types/ats';

// Helvetica is default for @react-pdf/renderer, no need to register

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textDecoration: 'underline',
  },
  text: {
    marginBottom: 2,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
    fontSize: 10,
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
      const d = new Date(m + '-01');
      return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(d);
    } catch (e) {
      return m;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header with name and contacts */}
        <View style={styles.header}>
          <Text style={styles.name}>{dadosPessoais.nome}</Text>
          <Text style={styles.contact}>{dadosPessoais.email}</Text>
          {dadosPessoais.telefone && <Text style={styles.contact}>{dadosPessoais.telefone}</Text>}
          {dadosPessoais.linkedin && <Text style={styles.contact}>{dadosPessoais.linkedin}</Text>}
          {dadosPessoais.cidadeEstado && <Text style={styles.contact}>{dadosPessoais.cidadeEstado}</Text>}
        </View>

        {resumo && (
          <View>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <Text style={styles.text}>{resumo}</Text>
          </View>
        )}

        {experiencias.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experiencias.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>{exp.cargo}</Text> - {exp.empresa}
                </Text>
                <Text style={styles.text}>
                  {exp.dataInicio && `${formatMonth(exp.dataInicio)}${(exp as any).atual ? ' – Atual' : exp.dataFim ? ` – ${formatMonth(exp.dataFim)}` : ''}`}
                </Text>
                {exp.descricao.map((item, i) => (
                  <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {formacoes.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Formação</Text>
            {formacoes.map((f, idx) => (
              <Text key={idx} style={styles.text}>
                {f.curso} – {f.instituicao} ({f.anoConclusao})
              </Text>
            ))}
          </View>
        )}

        {habilidades.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <Text style={styles.text}>{habilidades.join(', ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSResumeDocument;
