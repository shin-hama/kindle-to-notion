import ReactDOM from 'react-dom/client'
import { CreateBookMessage } from '../types/messaging'
import scrapeBookHighlights from './scraper/parseBookHighlight'
import scrapeBooks from './scraper/parseBooks'
import Progress from './progress'

export default defineContentScript({
  matches: ['*://read.amazon.co.jp/notebook*', '*://localhost:3000/*'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      onMount: (container) => {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container)
        root.render(<Progress />)
        return root
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root?.unmount()
      },
    })

    // Call mount to add the UI to the DOM
    ui.mount()

    window.addEventListener('load', async () => {
      console.log('loaded')
      const books = await scrapeBooks()
      console.log(books)
      const highlights = await scrapeBookHighlights(books[0])
      console.log(highlights)

      browser.runtime.sendMessage({
        type: 'CreateBookWithHighlights',
        data: {
          book: books[0],
          highlights,
        },
      } satisfies CreateBookMessage)
    })
  },
})
