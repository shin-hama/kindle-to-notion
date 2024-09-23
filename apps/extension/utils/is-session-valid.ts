import { SESSION_TOKEN_KEY } from '@kino/shared'

export const isSessionValid = async (): Promise<boolean> => {
  const cookie = await browser.cookies.get({
    url: import.meta.env.VITE_API_SERVER_URL ?? '',
    name: SESSION_TOKEN_KEY,
  })

  return import.meta.env.DEV || cookie !== null
}
