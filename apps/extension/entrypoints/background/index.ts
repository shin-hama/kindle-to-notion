import { isSessionValid } from '@/utils/is-session-valid'
import { ToBackendMessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'
import { createHighlights } from './handlers/create-highlight'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      if ((await isSessionValid()) === false) {
        console.error('Session is invalid')
        return false
      }

      console.log(message)
      const msg = ToBackendMessageSchema.parse(message)
      if (msg.type === 'CreateBookWithHighlights') {
        try {
          const result = await createBook({ book: msg.data.book })
          console.log('Book is created, ' + msg.data.book.title)
          await createHighlights(result.id, msg.data.highlights)
          console.log('Highlights are created: ' + msg.data.highlights.length)
          sendResponse()
          return { success: true }
        } catch (e) {
          console.error('Failed to create book and highlights', e)
          return { error: 'failed to create schema' }
        }
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
})
