import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'
import { NewHighlightInput } from '~/gql/graphql'
import { HighlightInput } from '~/types'

const mutation = gql`
  mutation CreateHighlights($highlights: NewHighlightsInput!) {
    addHighlights(newHighlights: $highlights) {
      id
    }
  }
`

export const createHighlights = async (bookId: string, highlights: Array<HighlightInput>) => {
  const client = new Client({
    url: 'http://127.0.0.1:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  })

  client
    .mutation(mutation, {
      highlights: highlights.map((h) => ({
        bookId,
        ...h,
      })),
    })
    .toPromise()
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}
