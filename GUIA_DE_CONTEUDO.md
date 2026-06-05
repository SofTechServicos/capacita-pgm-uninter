# Guia de Conteúdo e Contribuição

Este guia documenta o padrão arquitetural para criar ou editar conteúdos (Cursos, Ferramentas e Guias) no frontend do Capacita PGM (`capacita-pgm-uninter`).

---

## 1. Como adicionar novos Cursos (Escola Virtual.Gov / FGV)

Os cursos exibidos na página inicial são gerenciados em arrays constantes dentro de `app/page.tsx` (para os cursos da FGV) e via API simulada `app/api/cursos-governo/route.ts` (para a EVG).

Para adicionar um novo curso da FGV:
1. Abra `app/page.tsx`.
2. Localize a constante `cursosFGV`.
3. Adicione um novo objeto JSON:
```typescript
{
  titulo: "Nome do Novo Curso",
  descricao: "Breve descrição de até 2 linhas focada em conversão.",
  link: "URL_COMPLETA_DO_CURSO",
  categoria: "Ex: Finanças, Tecnologia, Cidadania Digital"
}
```

## 2. Como criar uma nova Guia Interativa

As guias (ex: `/guias/curriculo`) são páginas Server Components altamente otimizadas para SEO. Para criar uma nova guia (ex: "Guia de Inteligência Artificial"):

1. Crie uma pasta em `app/guias/inteligencia-artificial/`.
2. Crie o arquivo `page.tsx` dentro da pasta.
3. Importe os elementos de base (incluindo o Tracker):
```tsx
import Link from 'next/link';
import GuiaTracker from '../../../components/GuiaTracker';

export default function GuiaIA() {
  return (
    <div className="min-h-screen bg-deep-dark text-slate-300">
      {/* O Tracker é obrigatório para as métricas aparecerem no Painel Admin */}
      <GuiaTracker guideName="Inteligência Artificial" />
      
      {/* O resto do HTML da página... */}
    </div>
  );
}
```

### Regras de Ouro para Componentes dentro de Guias:
- **Áudios:** Use a tag nativa `<audio controls>`. Para garantir que o painel consiga registrar o nome do áudio corretamente, coloque o título do áudio dentro de um `<p>` logo acima da tag de áudio, ou deixe o tracker capturar o nome da Guia como fallback.
- **Vídeos YouTube:** Para que o rastreamento por clique (CORS hack) funcione, o seu `<iframe>` **DEVE** estar dentro de uma `<div>` com classe relativa e padding-bottom.
```tsx
<div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
  <iframe src="..." title="Meu Vídeo" className="absolute top-0 left-0 w-full h-full"></iframe>
</div>
```
- **Downloads:** O botão de download deve ser uma tag `<a>` com o atributo `download`.
```tsx
<a href="/arquivos/pdf.pdf" download className="bg-green-600...">Baixar PDF</a>
```

## 3. Padrão Visual (Tailwind UI)
- Fundo principal: `bg-deep-dark` (Dark mode focado em conversão).
- Textos padrão: `text-slate-300` (melhor legibilidade que branco puro).
- Botões Call-to-Action primários: `bg-green-600 hover:bg-green-500` (destaque verde Softech).
- Botões secundários: `bg-softech-blue` (cor da marca institucional).
- Cards (Glassmorphism): `bg-slate-900/70 backdrop-blur-md border border-slate-700`.
