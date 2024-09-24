import { User, MeQuery, MeQueryVariables } from '@/gql/graphql'
import { createGqlClient } from '@/entrypoints/background/handlers/gqlClient'
import { gql } from '@urql/core'

const query = gql`
  query Me {
    me {
      id
      name
      avatarUrl
      pageUrl
    }
  }
`

export const me = async (): Promise<User | null> => {
  const client = createGqlClient()
  const user = await client.query<MeQuery, MeQueryVariables>(query, {}).toPromise()

  return user.data?.me ?? import.meta.env.DEV
    ? {
        id: 'dummy',
        name: 'dummy',
        avatarUrl: 'dummy',
        pageUrl: 'https://notion.so',
      }
    : null
}
