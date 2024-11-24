import notionLogo from '@/assets/notion-logo.svg'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

type Props = {
  title: string
  current: number
  total: number
  userPageUrl?: string
}
const ScrapingProgressPresentation = ({ title, current, total, userPageUrl }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p>Exporting "{title}"</p>
      <div className="flex space-x-2 w-full items-center">
        <Progress value={(current / total) * 100} />
        <p className="text-nowrap">
          {current} / {total}
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Button asChild className="">
          <a href={userPageUrl} target="_blank" rel="noreferrer">
            <img src={notionLogo} alt="Notion logo" className="h-6 w-6 mr-2" />
            See in Notion
          </a>
        </Button>
      </div>
    </div>
  )
}

export { ScrapingProgressPresentation }
