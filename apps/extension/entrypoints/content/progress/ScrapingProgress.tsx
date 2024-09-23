import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const ScrapingProgress = () => {
  const [bookName, setBookName] = useState('Harry Potter')
  return (
    <div className="w-full flex flex-col gap-1">
      <p>Exporting {bookName}</p>
      <div className="flex space-x-2 w-full">
        <Progress value={50} />
        <p>1/2</p>
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
