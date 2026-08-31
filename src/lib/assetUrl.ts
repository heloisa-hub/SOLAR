/**
 * Prefixa um caminho absoluto de asset público (ex: "/logo/x.png") com o
 * base path configurado no Vite (import.meta.env.BASE_URL). Necessário
 * porque literais de string como "/logo/x.png" não são reescritos pelo
 * Vite em tempo de build — só imports/refs processados pelo bundler são.
 * Sem isso, o site quebra ao ser publicado num subcaminho (ex: GitHub
 * Pages em /SOLAR/) em vez da raiz do domínio.
 */
export function withBase(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
