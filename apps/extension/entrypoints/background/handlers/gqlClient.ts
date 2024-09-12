import { Client, cacheExchange, fetchExchange } from '@urql/core'

export const createGqlClient = (): Client => {
  return new Client({
    url: `${process.env.API_SERVER_URL}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      credentials: 'include',
    },
  })
}
