import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { setCookie } from 'hono/cookie'
import { notionHandler } from './notion-handler'
import { z } from 'zod'

const authEnvSchema = z.object({
  ENCRYPTION_KEY: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  NOTION_REDIRECT_URL: z.string(),
  NOTION_CLIENT_ID: z.string(),
  NOTION_CLIENT_SECRET: z.string(),
})
export type authEnv = z.infer<typeof authEnvSchema>

const app = new Hono()

app.get('/callback/notion', async (c) => {
  const code = c.req.query('code')

  if (!code) {
    c.status(400)
    return c.text('Missing code ')
  }

  const honoEnv = env<authEnv>(c)
  const envResult = authEnvSchema.safeParse(honoEnv)
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

export default app
