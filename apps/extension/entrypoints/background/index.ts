import { isSessionValid } from '@/utils/is-session-valid'
import { MessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'
import { createHighlights } from './handlers/create-highlight'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      if ((await isSessionValid()) === false) {
        console.error('Session is invalid')
        return
      }

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
})
