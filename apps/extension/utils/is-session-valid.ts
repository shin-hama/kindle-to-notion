import { SESSION_TOKEN_KEY } from '@kino/shared'

/**
 * 現在のセッションが有効か確認するために API サーバーからユーザー情報の取得します。
 * @returns
 */
export const isSessionValid = async (): Promise<boolean> => {
  const cookie = await browser.cookies.get({
    url: import.meta.env.VITE_API_SERVER_URL ?? '',
    name: SESSION_TOKEN_KEY,
  })
  return cookie !== null
}
