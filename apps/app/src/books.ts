import { Hono } from 'hono'
import { sessionValidator } from './middleware/session-validator'
import { CreateBookModel } from './services/books/books.dto'
import { BooksService } from './services/books/books.service'
import { parseEnv } from './libs/parseEnv'

const app = new Hono()

app.post('', sessionValidator, async (c) => {
  const bookData = await c.req.json<CreateBookModel>()
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
})

export { app as books }
