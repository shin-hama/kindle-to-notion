import { isSessionValid } from '@/utils/is-session-valid'
import { ToBackendMessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'
import { createHighlight } from './handlers/create-highlight'
import { me } from './me'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      console.log(message)
      const msg = ToBackendMessageSchema.parse(message)
      if (msg.type === 'CreateBookWithHighlights') {
        try {
          const result = await createBook({ book: msg.data.book })
          console.log('Book is created, ' + msg.data.book.title)
          for (const highlight of msg.data.highlights) {
            await createHighlight(result.id, result.asin || '', highlight)
            // prevent rate limiting
            await new Promise((r) => setTimeout(r, 400))
          }
          console.log('Highlights are created: ' + msg.data.highlights.length)
          sendResponse()
          return { success: true }
        } catch (e) {
          console.error('Failed to create book and highlights', e)
          return { error: 'failed to create schema' }
        }
      } else if (msg.type === 'GetUser') {
        if ((await isSessionValid()) === false) {
          console.warn('Session is invalid')
          return null
        }
        return await me()
      } else {
        throw new Error(`Not implemented message type: ${msg}`)
      }
    } catch (e) {
      console.error('Invalid message', e)
      return
    }
  })
})
