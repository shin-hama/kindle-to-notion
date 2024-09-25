import { Hono } from 'hono'
import { sessionValidator } from './middleware/session-validator'
import { env } from 'hono/adapter'
import { EnvSchema } from './types'
import { UsersService } from './services/users'
import { Client, isFullPage } from '@notionhq/client'

const app = new Hono()

app.get('me', sessionValidator, async (c) => {
  const token = c.var.sessionToken

  const envResult = EnvSchema.safeParse(env(c))
  if (!envResult.success) {
    c.status(500)
    console.error(envResult.error)
    return c.text('Internal server error')
  }
  const usersService = new UsersService(
    envResult.data.SUPABASE_URL,
    envResult.data.SUPABASE_SERVICE_ROLE_KEY,
    envResult.data.ENCRYPTION_KEY,
  )
  try {
    const result = await usersService.verifyAdmin(token)
    if (!result) {
      c.status(401)
      return c.text('Unauthorized')
    }
    const { NotionSecret, ...user } = result

    const notion = new Client({
      auth: NotionSecret.access_token,
    })
    const page = await notion.pages.retrieve({
      page_id: result.NotionPage.page_id,
    })

    return c.json({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatar_url,
      pageUrl: isFullPage(page) ? page.url : null,
    })
  } catch (error) {
    c.status(500)
    console.error(error)
    return c.text('Internal server error')
  }
})

export { app as users }
