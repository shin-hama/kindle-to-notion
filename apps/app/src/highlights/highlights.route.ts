import { Hono } from 'hono'
import { sessionValidator } from '../middleware/session-validator'
import { parseEnv } from '../libs/parseEnv'
import { CreateHighlightModel } from './highlights.model'
import { HighlightsService } from './highlights.service'

const app = new Hono()

app.post('', sessionValidator, async (c) => {
  const highlightData = await c.req.json<CreateHighlightModel>()
  const service = new HighlightsService(parseEnv(c))

  const highlight = await service.createHighlight(highlightData, c.var.user)

  return c.json(
    {
      message: 'highlight created',
      highlight: highlight,
    },
    201,
  )
})

export { app as highlights }
