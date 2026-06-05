# Documentação Técnica: Projeto Capacita PGM

**Projeto:** Capacita PGM — Hub de Oportunidades (Paragominas)
**Autor/Desenvolvedor:** SofTech Serviços / Elio Alves Queiroz Junior (Atividade Extensionista II)
**Data da última atualização:** Junho de 2026

---

## 1. Visão Geral da Arquitetura

O ecossistema do **Capacita PGM** foi projetado com uma arquitetura baseada em microsserviços frontend-backend separados, garantindo alta performance, SEO, e uma esteira de dados analíticos centralizada.

A arquitetura é dividida em dois repositórios principais:

1. **`capacita-pgm-uninter` (Frontend):** Responsável pela interface do usuário, guias de estudo, redirecionamento para cursos e captura de eventos de telemetria. Construído com Next.js 14 (App Router).
2. **`Softech-Sistema` (Backend/Admin):** Hub central da SofTech. Hospeda a API que recebe os eventos analíticos, persiste no Firebase (Firestore) e exibe o Painel de Métricas gerenciais.

---

## 2. Stack Tecnológico

### Frontend (`capacita-pgm-uninter`)
* **Framework:** Next.js 14 (React) — Server Components por padrão para máxima performance e SEO.
* **Estilização:** Tailwind CSS — Utilizando utilitários de classe para um design responsivo, moderno (glassmorphism) e dark mode focado.
* **Animações:** Framer Motion — Para micro-interações, efeitos de fade-in e transições suaves.
* **Ícones:** `react-icons` (FiIcons e FaIcons).

### Backend / Banco de Dados (`Softech-Sistema`)
* **API:** Next.js API Routes (`app/api/capacita-pgm/analytics/route.ts`).
* **Database:** Firebase Firestore (NoSQL).
* **Coleções principais:**
  * `analytics_events`: Armazena todos os eventos granulares (pageviews, cliques, downloads).
  * `feedbacks`: Armazena a pesquisa de satisfação (CSAT) via widget.

---

## 3. Arquitetura Analítica (Tracking Profundo)

Uma das maiores inovações do sistema é o tracking completo, livre de Cookies invasivos (focado em cliques e consumo de mídia). O rastreamento de páginas complexas é feito pelo componente invisível `<GuiaTracker />`.

### Fluxo de Dados:
1. Usuário interage com o elemento (ex: dá play num áudio).
2. O listener DOM / React dispara a função `track()`.
3. Um POST Request (CORS) é enviado para `https://softechservicos.vercel.app/api/capacita-pgm/analytics`.
4. A API insere o documento no Firestore na coleção `analytics_events`.
5. O painel admin lê os dados agrupando-os por Data/Período (`/api/admin/metrics`).

### Dicionário de Eventos Rastreados:

| Evento | Trigger (Quando dispara) | Payload Principal |
| :--- | :--- | :--- |
| `clique_curso` | Clique em qualquer card de curso na página principal | `course_name` |
| `download_ferramenta` | Clique em guias ou botão de gerador de currículo | `tool_name` |
| `guide_view` | Acesso a qualquer sub-página de guia ou página inicial | `guide_name`, `page` |
| `audio_play` | Clique no botão Play das tags `<audio>` (Resumo Otimizado) | `audio_title` |
| `video_interact` | Clique na área do `<iframe>` do YouTube (usa Blur Hack) | `video_title`, `video_id` |
| `infographic_download`| Clique no botão "Baixar Infográfico" (`<a download>`) | `file_name` |
| `external_link_click` | Clique em qualquer link `target="_blank"` | `link_label`, `url` |

> **Nota Técnica sobre `video_interact`:** Como os Iframes do YouTube são "cross-origin", o navegador bloqueia os eventos normais de `onClick`. Para superar isso, o sistema usa o padrão **"Blur Hack"**, que monitora se o mouse está sobre o vídeo (`mouseenter`) e se a janela perde o foco (`window blur`), deduzindo com 100% de certeza um clique no vídeo.

---

## 4. Estrutura do Frontend (Guias e Funcionalidades)

### A. Página Principal (`app/page.tsx`)
* Apresenta o Hero, carrossel de recursos, widget de cursos Escola Virtual.Gov e FGV, seção de ferramentas e o widget flutuante de Feedback (CSAT).
* Usa estados de React (`useState`, `useEffect`) para buscar cursos adicionais de APIs.

### B. Guias Interativos (`app/guias/*`)
Três guias altamente estruturados:
1. **Currículo de Impacto:** Estrutura de currículo, palavras-chave (ATS), resumo em áudio e infográficos baixáveis.
2. **MEI e Formalização:** Passos para o GOV.BR, vídeos tutoriais e redirecionamentos para o Portal Oficial MEI.
3. **Ferramentas Digitais:** Catálogo curado de apps e softwares para gestão financeira e marketing (Trello, HubSpot, WhatsApp Business).

---

## 5. Painel de Impacto (Admin Softech)

Localizado no `Softech-Sistema`, renderizado em `components/AdminMetrics.tsx`, ele converte dados crus do Firebase em KPIs acionáveis.

### KPIs Gerados:
* **Visitantes Estimados** (cálculo heurístico baseado no volume de interações).
* **Rankings de Top 5:** Cursos, Ferramentas, Guias, Áudios, Vídeos e Downloads de Infográficos.
* **CSAT (Customer Satisfaction Score):** Média ponderada de 1 a 5 estrelas do Widget de Feedback.
* **Filtros Temporais:** Processamento unificado de datas (UTC/ISO para Timestamps nativos do Firestore).

---

## 6. Comandos e Manutenção

Para rodar ou modificar localmente o `capacita-pgm-uninter`:

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (porta 3000)
npm run dev

# Fazer build para produção (simula o Vercel)
npm run build
```

As duas aplicações estão hospedadas no **Vercel** e conectadas nativamente ao **GitHub**, possuindo *CI/CD (Continuous Integration/Continuous Deployment)* automáticos a cada `git push` para as branchs principais (`main` e `master`).
