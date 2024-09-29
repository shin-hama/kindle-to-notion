import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { serve } from '@hono/node-server'
import { Hono, Env as HonoEnv } from 'hono'
import { auth } from './auth'
import { users } from './users'
import { books } from './routes/books/books'
import { highlights } from './highlights/highlights.route'

const app = new Hono()
  .route('/auth', auth)
  .route('/users', users)
  .route('/books', books)
  .route('/highlights', highlights)
  .get('/', (c) => {
    console.log('Hello Hono!')
    return c.text('Hello Hono!')
  })
  .get('/kindle/open', (c) => {
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

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

export { app }
