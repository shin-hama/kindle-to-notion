import { CreateBookMessage } from '@/entrypoints/types/messaging'
import scrapeBookHighlights from './parseBookHighlight'
import scrapeBooks from './parseBooks'
import { useAtom } from 'jotai'
import { scrapingProgress } from '@/states'

export const useScraper = () => {
  const [, setState] = useAtom(scrapingProgress)

  useEffect(() => {
    console.log('Start scraping')
    scrapeBooks()
      .then(async (books) => {
        console.log(`find ${books.length} books`)
        for (const [i, book] of books.entries()) {
          if (i === 2) {
            break
          }

          setState({
            data: {
              total: books.length,
              current: i + 1,
              title: book.title,
            },
          })

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
        setState({
          data: {
            total: books.length,
            current: books.length,
            title: 'Completed',
            completed: true,
          },
        })
      })
      .catch((e) => {
        if (e instanceof Error) {
          console.error(e)
          setState({ error: e.message })
        }
      })
  }, [])
}
