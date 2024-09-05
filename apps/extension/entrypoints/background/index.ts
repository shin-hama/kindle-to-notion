import { MessageSchema } from '../types/messaging'
import { createBook } from './handlers/create-books'

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id })

  fetch('http://127.0.0.1:3000/').then((res) => {
    console.log('fetch', res)
  })

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      const msg = MessageSchema.parse(message)
      console.log(message)
      if (msg.type === 'CreateBook') {
        console.log('CreateBook', msg.book)
        createBook(msg.book)
        sendResponse()
        return
      } else if (msg.type === 'CreateHighlight') {
        console.log('CreateHighlight', msg.highlight)
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
