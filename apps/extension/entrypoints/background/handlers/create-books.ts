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
    url: 'https://musical-space-umbrella-7w7j7qw6q4whwrr-3000.app.github.dev/',
    exchanges: [cacheExchange, fetchExchange],
  })

  client
    .mutation(mutation, { book })
    .toPromise()
    .then((result) => {
      console.log(result)
    })
}
