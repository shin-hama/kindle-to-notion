import { CreateBookMessage } from '@/entrypoints/types/messaging'
import scrapeBookHighlights from './parseBookHighlight'
import scrapeBooks from './parseBooks'
import { useAtom } from 'jotai'
import { scrapingProgress } from '@/states'

export const useScraper = () => {
  const [, setState] = useAtom(scrapingProgress)
  const lastUpdated = useLastUpdated()

  useEffect(() => {
    console.log('Start scraping')
    scrapeBooks()
      .then(async (allBooks) => {
        const lastUpdatedAt = await lastUpdated.get()
        console.log({ lastUpdatedAt })
        console.log(`lastUpdatedAt: ${lastUpdatedAt}`)
        const updatedBooks = allBooks.filter((book) => {
          return new Date(book.lastAnnotatedAt) > new Date(lastUpdatedAt)
        })
        console.log(`find ${updatedBooks.length} books`)
        for (const [i, book] of updatedBooks.entries()) {
          if (i === 2) {
            break
          }

          setState({
            data: {
              total: updatedBooks.length,
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
        lastUpdated.set(new Date())

        setState({
          data: {
            total: updatedBooks.length,
            current: updatedBooks.length,
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
