import { gql } from '@urql/core'
import {
  CreateHighlightMutation,
  CreateHighlightMutationVariables,
  NewHighlightInput,
} from '@/gql/graphql'
import { HighlightInput } from '@/types'
import { createGqlClient } from './gqlClient'

const mutation = gql`
  mutation CreateHighlight($highlight: NewHighlightInput!, $bookId: String!, $asin: String!) {
    addHighlight(newHighlight: $highlight, bookId: $bookId, bookAsin: $asin) {
      id
    }
  }
`

export const createHighlight = async (bookId: string, asin: string, highlight: HighlightInput) => {
  const client = createGqlClient()

  client
    .mutation<CreateHighlightMutation, CreateHighlightMutationVariables>(mutation, {
      highlight,
      bookId,
      asin,
    })
    .toPromise()
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}
