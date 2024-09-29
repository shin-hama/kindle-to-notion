import { isSessionValid } from '@/utils/is-session-valid'
import { ToBackendMessageSchema } from '../types/messaging'
import { createBook, createBook2 } from './handlers/create-books'
import { createHighlight } from './handlers/create-highlight'
import { me } from './me'
import { createClient } from './handlers/client'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      console.log(message)
      const msg = ToBackendMessageSchema.parse(message)
      if (msg.type === 'CreateBookWithHighlights') {
        try {
          const client = createClient()

          const result = await client.books.$post({
            json: msg.data.book,
          })

          if (result.status !== 201) {
            console.error('Failed to create book', result)
            return { error: 'failed to create book' }
          }
          const { book } = await result.json()

          console.log('Book is created, ' + msg.data.book.title)
          for (const highlight of msg.data.highlights) {
            await createHighlight(book.id, book.asin, highlight)
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
