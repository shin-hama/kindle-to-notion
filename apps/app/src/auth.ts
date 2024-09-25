import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { setCookie } from 'hono/cookie'
import { notionHandler } from './auth/notion-handler'
import { EnvSchema, Env } from './types'

const app = new Hono()

app.get('/callback/notion', async (c) => {
  const code = c.req.query('code')

  if (!code) {
    c.status(400)
    return c.text('Missing code ')
  }

  const honoEnv = env<Env>(c)
  const envResult = EnvSchema.safeParse(honoEnv)
  if (!envResult.success) {
    c.status(500)
    return c.text('Environment variables are not set')
  }

  const result = await notionHandler(code, envResult.data)
  if (result.error || !result.data) {
    c.status(500)
    return c.text(`${result.error}, please try again`)
  }

  setCookie(c, 'SESSION_TOKEN_KEY', result.data.session_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  return c.redirect(result.data.redirect_url)
})

export { app as auth }
