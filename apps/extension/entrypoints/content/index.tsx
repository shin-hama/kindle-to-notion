import ReactDOM from 'react-dom/client'
import { CreateBookMessage } from '../types/messaging'
import scrapeBookHighlights from './scraper/parseBookHighlight'
import scrapeBooks from './scraper/parseBooks'
import App from './App'

export default defineContentScript({
  matches: ['*://read.amazon.co.jp/notebook*', 'http://localhost/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('Hello content script!', { id: browser.runtime.id })
    const ui = await createShadowRootUi(ctx, {
      name: 'tailwind-shadow-root-example',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container)
        root.render(<App />)

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
