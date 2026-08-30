# Solar Capital — Site (React)

Site institucional da Solar Capital. React + Vite + Tailwind v4, roteado
por `react-router`. Layout baseado no design do Figma; dados e gráficos
migrados do site HTML anterior (`../4. Site/`).

## Rodando localmente

Precisa de [Node.js](https://nodejs.org) 18+ instalado.

```bash
npm install
npm run dev      # servidor local em http://localhost:5173
npm run build    # gera a pasta dist/ pronta para publicar
npm run preview  # serve a build de produção localmente, para conferir
```

## Estrutura

```
src/
  components/   Header, Footer, Layout, SolarLogo, ReturnChart, PortfolioChart
  pages/        Home, Sobre, Solucoes, Fundos, FundoDetalhe, Contato
  data/funds.ts Dados dos 4 fundos — GERADO, não editar à mão (ver abaixo)
  hooks/        usePageTitle (título da aba por página)
public/
  logo/         Símbolos e lockups oficiais (Brand Book v3)
  video/        Vídeo do hero
  documentos/   Regulamentos em PDF
scripts/
  convert-funds.cjs   Gera src/data/funds.ts a partir do site HTML
```

## Atualizando os dados dos fundos

`src/data/funds.ts` é gerado automaticamente a partir de
`../4. Site/js/funds-data.js` (a mesma fonte usada pelo site HTML) —
**não edite esse arquivo na mão**. Para atualizar com um novo mês:

1. Rode o pipeline de dados do site HTML (`4. Site/dados-fundos/`) como
   já é feito hoje, pra regenerar `funds-data.js` com o relatório novo.
2. Rode `node scripts/convert-funds.cjs` aqui dentro.
3. Confira o resultado (`npx tsc --noEmit` e `npm run build`) e suba.

## Pendências conhecidas

- ~~Redes sociais placeholder~~ — resolvido: LinkedIn real
  (`linkedin.com/company/solar-capital-adm`) no rodapé e no Contato; ícone
  de WhatsApp removido (sem número de atendimento definido ainda).
- ~~Vídeo do hero pesado~~ — resolvido: cortado o início parado e recomprimido
  de 89 MB para ~36 MB (`public/video/hero-solar-web.mp4`).
- **Formulário de contato usa `mailto:` de propósito** — abre o cliente de
  e-mail do visitante com os dados preenchidos, em vez de um back-end.
  Decisão consciente enquanto não há servidor; não é uma pendência a
  resolver, é a solução aceita por ora.
