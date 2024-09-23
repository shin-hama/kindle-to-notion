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
          console.log(books)
          setBooksCount(books.length)

          books.forEach(async (book, i) => {
            setBook(book)
            setCurrentIndex(i + 1)

            const highlights = await scrapeBookHighlights(book)
            console.log(highlights)
            try {
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
            } catch {
              console.error('error on parsing')
            }
          })
        })
        .catch(console.warn)
    } catch (e) {
      console.log(e)
      setError('e')
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
