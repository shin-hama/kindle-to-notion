import { gql } from '@urql/core'
import { CreateBookMutation, CreateBookMutationVariables } from '@/gql/graphql'
import { createGqlClient } from './gqlClient'
import { Client, hcWithType } from '@kino/app/hc'
import { createClient } from './client'

const mutation = gql`
  mutation CreateBook($book: NewBookInput!) {
    addBook(newBookData: $book) {
      id
      title
      author
      asin
    }
  }
`

export const createBook = async (
  args: CreateBookMutationVariables,
): Promise<CreateBookMutation['addBook']> => {
  const client = createGqlClient()

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

export const createBook2 = async (newBook: Parameters<Client['books']['$post']>[0]['json']) => {
  const client = createClient()

  return await client.books.$post({
    json: newBook,
  })
}
