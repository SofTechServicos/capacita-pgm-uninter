# 🎓 Capacita PGM - Projeto Extensionista (UNINTER)

> **Nota Acadêmica:** Este repositório contém o código-fonte referente ao módulo **Capacita PGM**, extraído do ecossistema comercial da *SofTech Serviços e Tecnologia*. Este isolamento foi realizado exclusivamente para fins de avaliação da **Atividade Extensionista II** do curso de Gestão da Tecnologia da Informação (UNINTER).

🔗 **Acesso à Aplicação em Produção:** [https://softechservicos.vercel.app/capacita-pgm](https://softechservicos.vercel.app/capacita-pgm)

---

## 🎯 Visão Geral do Projeto
O **Capacita PGM** é um hub tecnológico de capacitação focado no desenvolvimento profissional da comunidade de Paragominas - PA. A plataforma atua em três frentes principais:
1. **Educação Continuada:** Curadoria centralizada de cursos online gratuitos (Fundação Bradesco, Escola Virtual Gov e FGV).
2. **Empregabilidade:** Automação na criação de documentos através de um **Gerador de Currículos ATS** gratuito e mobile-first.
3. **Empreendedorismo:** Guias interativos para formalização de MEI e letramento digital.

### 🌍 Alinhamento ODS (Objetivos de Desenvolvimento Sustentável - ONU)
* 📚 **ODS 04:** Educação de Qualidade
* 💼 **ODS 08:** Trabalho Decente e Crescimento Econômico
* ⚖️ **ODS 10:** Redução das Desigualdades
* 🏙️ **ODS 11:** Cidades e Comunidades Sustentáveis

---

## 🚀 Tecnologias Utilizadas

**Frontend & UI:**
* [Next.js 14](https://nextjs.org/) (App Router)
* [TypeScript](https://www.typescriptlang.org/) (Tipagem estática)
* [Tailwind CSS](https://tailwindcss.com/) (Estilização responsiva)

**Core Funcional (PDF & Dados):**
* `@react-pdf/renderer` (Geração de PDF avançada 100% Client-Side)
* Parseamento de CSV e APIs dinâmicas para catálogo de cursos.

**Infraestrutura & Analytics:**
* Firebase / Firestore Analytics (Coleta de métricas e geolocalização)
* Hospedagem Serverless Edge na Vercel

---

## ⚙️ Funcionalidades e Estrutura do Sistema

A arquitetura do projeto foi desenvolvida utilizando as melhores práticas de Engenharia de Software, priorizando a experiência em dispositivos móveis (Mobile-First):

* 📄 **`/app/gerador`**: Módulo core de automação. Contém o `GeradorClientPage.tsx`, `ResumeForm.tsx` (interface em abas para mobile e split-view para PC) e `ATSResumeDocument.tsx` (motor de renderização do currículo).
* 📊 **`/app/api/capacita-pgm`**: APIs customizadas (`route.ts`) para gestão de métricas e consumo dinâmico de catálogos governamentais.
* 🧩 **`/components`**: Ampla biblioteca de componentes isolados, incluindo ferramentas de conversão, `FeedbackWidget.tsx` para notas dos usuários, e `GeoAnalytics.tsx` para métricas georreferenciadas do uso na região.
* 📚 **`/app/guias`**: Sistema de navegação interativa com conteúdos ricos em áudio e texto (MEI, Ferramentas Digitais).

---

## 📈 Impacto e Métricas (KPIs)
Para validar a eficácia social da Atividade Extensionista, o sistema conta com rastreamento autônomo (via componentes como `ImpactMetrics.tsx` e `AcademicReport.tsx`). O sistema coleta de forma anônima:
- Taxa de conversão do Gerador de Currículos.
- Cliques de saída para os cursos da Fundação Bradesco e Gov.br.
- Avaliação de usabilidade (CSAT) via widget.

---

## 👨‍💻 Autor & Desenvolvedor

**Elio Alves Queiroz Junior**  
*Graduando em Gestão da Tecnologia da Informação - UNINTER*  
*RU: 930051*

[LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/SofTechServicos)