import { MessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'
import { createHighlights } from './handlers/create-highlight'

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id })

  fetch('http://127.0.0.1:3000/').then((res) => {
    console.log('fetch', res)
  })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      const msg = MessageSchema.parse(message)
      console.log(message)
      if (msg.type === 'CreateBookWithHighlights') {
        console.log('CreateBookWithHighlights', msg.data)
        const result = await createBook(msg.data.book)
        // createHighlights(msg.data.bookId, msg.data.highlights)
        console.log(result)
        sendResponse()
        return
      } else if (msg.type === 'CreateHighlights') {
        console.log('CreateHighlights', msg.data)
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
