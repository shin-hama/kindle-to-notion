import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'
import { MessageSchema } from '../types/messaging'

export default defineBackground(async () => {
  console.log('Hello background!', { id: browser.runtime.id })

  const client = new Client({
    url: 'https://flyby-router-demo.herokuapp.com/',
    exchanges: [cacheExchange, fetchExchange],
  })

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      const msg = MessageSchema.parse(message)

      if (msg.type === 'CreateBook') {
        console.log('CreateBook', msg.book)
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

  const document = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `
  client
    .query(document, {})
    .toPromise()
    .then((result) => {
      console.log(result)
    })
})
