import ScrapingProgress from './ScrapingProgress'
import { useScraper } from '../scraper/useScraper'

export const useScrapingProgress = () => {
  const { toast } = useToast()
  const [progressToast, setProgressToast] = useState<ReturnType<typeof toast> | null>(null)
  const { book, booksCount, currentIndex, error } = useScraper()

  useEffect(() => {
    if (progressToast) {
      progressToast.update({
        id: progressToast.id,
        title: 'Collecting highlights',
        description: (
          <ScrapingProgress
            bookName={book?.title ?? 'unknown'}
            current={currentIndex}
            total={booksCount}
          />
        ),
      })
    } else {
      setProgressToast(
        toast({
          title: 'Collecting highlights',
          description: (
            <ScrapingProgress
              bookName={book?.title ?? 'unknown'}
              current={currentIndex}
              total={booksCount}
            />
          ),
          duration: 24 * 60 * 60 * 1000,
        }),
      )
    }
  }, [booksCount, currentIndex])

  useEffect(() => {
    toast({
      title: 'Notification',
      description: 'Collecting a list of books from your Kindle account. This may take a while.',
      duration: 60 * 1000,
    })
  }, [])

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        duration: 5 * 1000,
      })
    }
  }, [error])
}
