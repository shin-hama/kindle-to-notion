import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAtom } from 'jotai'
import { scrapingProgress } from '@/states'
import { useAuthenticatedUser } from '@/hooks/use-user'

const ScrapingProgress = () => {
  const user = useAuthenticatedUser()
  const [state] = useAtom(scrapingProgress)

  if (state.error) {
    return <p>{state.error}</p>
  }

  if (!state.data) {
    return <p>Collecting a list of books from your Kindle account. This may take a while.</p>
  }

  const { title, current, total } = state.data
  return (
    <div className="w-full flex flex-col gap-1">
      <p>Exporting "{title}"</p>
      <div className="flex space-x-2 w-full">
        <Progress value={(current / total) * 100} />
        <p className="text-nowrap">
          {current} / {total}
        </p>
      </div>
      <div className="flex justify-end">
        <Button asChild className="">
          <a href={user.pageUrl ?? 'https://notion.so'} target="_blank" rel="noreferrer">
            Open Notion
          </a>
        </Button>
      </div>
    </div>
  )
}

export default ScrapingProgress
