import { useAtom } from 'jotai'
import { scrapingProgress } from '@/states'
import { useAuthenticatedUser } from '@/hooks/use-user'
import { ScrapingProgressPresentation } from './Progress.presentation'

const ScrapingProgress = () => {
  const user = useAuthenticatedUser()
  const [state] = useAtom(scrapingProgress)

  if (!user) {
    return <p>Not signed in</p>
  }

  if (state.error) {
    return <p>{state.error}</p>
  }

  if (!state.data) {
    return <p>Collecting a list of books from your Kindle account. This may take a while.</p>
  }

  const { title, current, total } = state.data
  return (
    <ScrapingProgressPresentation
      title={title}
      current={current}
      total={total}
      userPageUrl={user.pageUrl ?? 'https://notion.so'}
    />
  )
}

export default ScrapingProgress
