import { gql } from '@urql/core'
import { CreateHighlightsMutationVariables, NewHighlightInput } from '@/gql/graphql'
import { HighlightInput } from '@/types'
import { createGqlClient } from './gqlClient'

const mutation = gql`
  mutation CreateHighlights($highlights: [NewHighlightInput!]!) {
    addHighlights(newHighlights: $highlights) {
      id
    }
  }
`

export const createHighlights = async (bookId: string, highlights: Array<HighlightInput>) => {
  const client = createGqlClient()

  client
    .mutation(mutation, {
      highlights: highlights.map(
        (h) =>
          ({
            bookId,
            ...h,
          }) satisfies NewHighlightInput,
      ),
    } satisfies CreateHighlightsMutationVariables)
    .toPromise()
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}
