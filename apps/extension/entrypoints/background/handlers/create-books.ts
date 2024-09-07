import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'
import { CreateBookMutation, CreateBookMutationVariables, NewBookInput } from '~/gql/graphql'

const mutation = gql`
  mutation CreateBook($book: NewBookInput!) {
    addBook(newBookData: $book) {
      id
      title
      author
    }
  }
`

export const createBook = async (
  args: CreateBookMutationVariables,
): Promise<CreateBookMutation['addBook']> => {
  const client = new Client({
    url: 'http://127.0.0.1:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  })

  return client
    .mutation(mutation, args)
    .toPromise()
    .then((result) => {
      console.log(result)
      const data: CreateBookMutation = result.data
      return data.addBook
    })
    .catch((error) => {
      console.error(error)
      throw error
    })
}
