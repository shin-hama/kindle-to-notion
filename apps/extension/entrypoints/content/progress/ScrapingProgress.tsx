import notionLogo from '@/assets/notion-logo.svg'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAtom } from 'jotai'
import { scrapingProgress } from '@/states'
import { useAuthenticatedUser } from '@/hooks/use-user'

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
    <div className="w-full flex flex-col gap-2">
      <p>Exporting "{title}"</p>
      <div className="flex space-x-2 w-full">
        <Progress value={(current / total) * 100} />
        <p className="text-nowrap">
          {current} / {total}
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <script
          type="text/javascript"
          src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
          data-name="bmc-button"
          data-slug="coppla"
          data-color="#FFDD00"
          data-emoji="☕"
          data-font="Poppins"
          data-text="Buy me a coffee"
          data-outline-color="#000000"
          data-font-color="#000000"
          data-coffee-color="#ffffff"
        ></script>
        <Button asChild className="">
          <a href={user.pageUrl ?? 'https://notion.so'} target="_blank" rel="noreferrer">
            <img src={notionLogo} alt="Notion logo" className="h-6 w-6 mr-2" />
            See in Notion
          </a>
        </Button>
      </div>
    </div>
  )
}

export default ScrapingProgress
