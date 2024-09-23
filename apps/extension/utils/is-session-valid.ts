import { NotionUser, SESSION_TOKEN_KEY } from '@kino/shared'

/**
 * 現在のセッションが有効か確認するために API サーバーからユーザー情報の取得します。
 * @returns
 */
export const isSessionValid = async (): Promise<NotionUser | null> => {
  const cookie = await browser.cookies.get({
    url: import.meta.env.VITE_API_SERVER_URL ?? '',
    name: SESSION_TOKEN_KEY,
  })

  const user = await fetch(import.meta.env.VITE_API_SERVER_URL + '/users/me')
    .then(async (res) => (await res.json()) as NotionUser)
    .catch(() => null)

  return import.meta.env.DEV
    ? {
        id: 'dummy',
        name: 'dummy',
        avatarUrl: 'dummy',
        pageUrl: 'https://notion.so',
      }
    : user
}
