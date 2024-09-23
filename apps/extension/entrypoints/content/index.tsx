import ReactDOM from 'react-dom/client'
import App from './App'
import { contentScriptMatches } from '../../utils/constants'

export default defineContentScript({
  matches: contentScriptMatches,
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
  },
})