import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'
import { NewBookInput } from '~/gql/graphql'

const mutation = gql`
  mutation CreateBook($book: NewBookInput!) {
    addBook(newBookData: $book) {
      id
      title
      author
    }
  }
`

export const createBook = async (book: NewBookInput) => {
  const client = new Client({
    url: 'http://127.0.0.1:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  })

  return client
    .mutation(mutation, { book })
    .toPromise()
    .then((result) => {
      console.log(result)
      return result.data
    })
    .catch((error) => {
      console.error(error)
    })
}
