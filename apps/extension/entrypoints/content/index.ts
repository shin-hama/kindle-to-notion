import scrapeBookHighlights from './scraper/parseBookHighlight'
import scrapeBooks from './scraper/parseBooks'

export default defineContentScript({
  matches: ['*://read.amazon.co.jp/notebook*'],
  main() {
    window.addEventListener('load', async () => {
      console.log('loaded')
      const books = scrapeBooks()
      console.log(books)
      const highlights = await scrapeBookHighlights(books[0])
      console.log(highlights)
      const books3 = scrapeBooks()
      console.log(books3)
    })

    window.addEventListener('DOMContentLoaded', async () => {
      console.log('loadeddata')
      const books = scrapeBooks()
      console.log(books)
      const highlights = await scrapeBookHighlights(books[0])
      console.log(highlights)
    })
  },
})
