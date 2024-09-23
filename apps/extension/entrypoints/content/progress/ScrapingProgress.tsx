import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

type Props = {
  bookName: string
  current: number
  total: number
}
const ScrapingProgress = ({ bookName, current, total }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p>Exporting {bookName}</p>
      <div className="flex space-x-2 w-full">
        <Progress value={(current / total) * 100} />
        <p>
          {current} / {total}
        </p>
      </div>
      <div className="flex justify-end">
        <Button asChild className="">
          <a href="https://notion.so" target="_blank" rel="noreferrer">
            Open Notion
          </a>
        </Button>
      </div>
    </div>
  )
}

export default ScrapingProgress
