import { Hono } from 'hono'
import { sessionValidator } from '../../middleware/session-validator'
import { BooksService } from './books.service'
import { parseEnv } from '../../libs/parseEnv'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const CreateBookModel = z.object({
  asin: z.string(),
  author: z.string(),
  title: z.string(),
  imageUrl: z.string().nullable(),
  url: z.string().nullable(),
  lastAnnotatedAt: z.string(),
})

const app = new Hono().post(
  '',
  sessionValidator,
  zValidator('json', CreateBookModel),
  async (c) => {
    const bookData = c.req.valid('json')
    const service = new BooksService(parseEnv(c))
    console.log(bookData)

    const book = await service.createBook(bookData, c.var.user)

    return c.json(
      {
        message: 'Book created',
        book: book,
      },
      201,
    )
  },
)

export { app as books }
