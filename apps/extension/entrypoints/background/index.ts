import { MessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'
import { createHighlights } from './handlers/create-highlight'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  fetch('http://127.0.0.1:3000/').then((res) => {
    console.log('fetch', res)
  })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      const msg = MessageSchema.parse(message)
      if (msg.type === 'CreateBookWithHighlights') {
        const result = await createBook({ book: msg.data.book })
        createHighlights(result.id, msg.data.highlights)
        sendResponse()
        return
      } else if (msg.type === 'CreateHighlights') {
        console.error('Not implemented')
        sendResponse()
        return
      } else {
        throw new Error(`Not implemented message type: ${msg}`)
      }
    } catch (e) {
      console.error('Invalid message', e)
      return
    }
  })

  browser.webRequest.onHeadersReceived.addListener(
    (details) => {
      console.log('onHeadersReceived', details)

      fetch('http://localhost:3000/test', {
        credentials: 'include',
      }).then((res) => {
        console.log('fetch', res)
      })

      return { responseHeaders: details.responseHeaders }
    },
    { urls: ['http://localhost:3000/auth/callback/notion'] },
    ['responseHeaders'],
  )
})
