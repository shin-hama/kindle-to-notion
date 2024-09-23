import { CreateBookMessage } from '@/entrypoints/types/messaging'
import scrapeBookHighlights from './parseBookHighlight'
import scrapeBooks from './parseBooks'
import { BookInput } from '@/types'

export const useScraper = () => {
  const [book, setBook] = useState<BookInput | null>(null)
  const [booksCount, setBooksCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      console.log('Start scraping')
      scrapeBooks()
        .then(async (books) => {
          console.log(`find ${books.length} books`)
          setBooksCount(books.length)

          for (const book of books) {
            setBook(book)
            setCurrentIndex((prev) => prev + 1)

            const highlights = await scrapeBookHighlights(book)
            console.log(`find ${highlights.length} highlights`)
            const result = await browser.runtime.sendMessage({
              type: 'CreateBookWithHighlights',
              data: {
                book: book,
                highlights,
              },
            } satisfies CreateBookMessage)

            if (result.error) {
              throw new Error(result.error)
            }
          }
        })
        .catch(console.warn)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e)
        setError(e.message)
      }
    }
  }, [])

  return useMemo(
    () => ({
      book,
      booksCount,
      currentIndex,
      error,
    }),
    [book, booksCount, currentIndex, error],
  )
}
