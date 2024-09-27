import { gql } from '@urql/core'
import { CreateBookMutation, CreateBookMutationVariables } from '@/gql/graphql'
import { createGqlClient } from './gqlClient'
import { hcWithType } from '@kino/app/hc'

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

export const createBook2 = async () => {
  const client = hcWithType(`${import.meta.env.VITE_API_SERVER_URL}/`, {
    fetch: (req: RequestInfo | URL, init?: RequestInit) =>
      fetch(req, {
        ...init,
        credentials: 'include',
      }),
  })

  await client.books.$post({})
}
