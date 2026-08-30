import { useEffect } from 'react'

/** Define o título da aba por página — SPA não atualiza <title> sozinha entre rotas. */
export default function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | Solar Capital` : 'Solar Capital'
    return () => {
      document.title = previous
    }
  }, [title])
}
