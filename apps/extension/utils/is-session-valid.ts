import { SESSION_TOKEN_KEY } from '@kino/shared'
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

/**
 * 現在のセッションが有効か確認するために API サーバーからユーザー情報の取得します。
 * @returns
 */
export const isSessionValid = async (): Promise<User | null> => {
  const cookie = await browser.cookies.get({
    url: import.meta.env.VITE_API_SERVER_URL ?? '',
    name: SESSION_TOKEN_KEY,
  })

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
