import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './routes'
import { env } from 'hono/adapter'

const app = new Hono()

app.get('/', (c) => {
  const e = env(c)
  console.log(e['SUPABASE_URL'])
  console.log(process.env.SUPABASE_URL)
  return c.text('Hello Hono!')
})

app.get('/kindle/open', (c) => {
  const asin = c.req.query('asin')
  if (!asin) {
    return c.redirect(`kindle://book?action=open`)
  }
  const query = new URLSearchParams({ asin: asin as string })

  const location = c.req.query('location')
  if (location) {
    query.append('location', location as string)
  }

  return c.redirect(`kindle://book?action=open&${query.toString()}`)
})

app.route('/auth', auth)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
