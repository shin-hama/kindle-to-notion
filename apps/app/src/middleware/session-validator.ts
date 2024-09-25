import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import { SESSION_TOKEN_KEY } from '@kino/shared'

export const sessionValidator = createMiddleware<{
  Variables: {
    sessionToken: string
  }
}>(async (c, next) => {
  const session = getCookie(c, SESSION_TOKEN_KEY)
  if (!session) {
    c.status(401)
    return c.text('Unauthorized')
  }
  c.set('sessionToken', session)
  await next()
})
