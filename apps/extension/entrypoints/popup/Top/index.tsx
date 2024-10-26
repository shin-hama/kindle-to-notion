import notionLogo from '@/assets/notion-logo.svg'
import { Button } from '@/components/ui/button'
import { useCurrentRegion } from '@/hooks/use-i18n'
import { User } from '@kino/shared'
import { BookUp2 } from 'lucide-react'

const PopupTop = ({ user }: { user: User }) => {
  const region = useCurrentRegion()

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h1 className="text-2xl font-bold text-center">Welcome, {user.name}</h1>

      <Button asChild variant="default">
        <a href={region.notebookUrl} target="_blank" rel="noopener noreferrer">
          <BookUp2 className="h-6 w-6 mr-2" />
          Export your Kindle notes
        </a>
      </Button>

      <Button asChild variant="outline">
        <a href={user.pageUrl ?? 'https://notion.so'} target="_blank" rel="noopener noreferrer">
          <img src={notionLogo} alt="Notion logo" className="h-6 w-6 mr-2" />
          Browse your notes
        </a>
      </Button>
    </div>
  )
}

export default PopupTop
