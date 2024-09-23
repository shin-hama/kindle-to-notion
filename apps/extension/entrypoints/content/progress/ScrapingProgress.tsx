import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useScraper } from '../scraper/useScraper'

const ScrapingProgress = () => {
  const { book, booksCount, currentIndex, error } = useScraper()

  if (error) {
    return <p>{error}</p>
  }
  return book ? (
    <div className="w-full flex flex-col gap-1">
      <p>Exporting "{book?.title}"</p>
      <div className="flex space-x-2 w-full">
        <Progress value={(currentIndex / booksCount) * 100} />
        <p className="text-nowrap">
          {currentIndex} / {booksCount}
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
  ) : (
    <p>Collecting a list of books from your Kindle account. This may take a while.</p>
  )
}

export default ScrapingProgress
