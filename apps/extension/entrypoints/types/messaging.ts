import { BookInputSchema, HighlightInputSchema } from '~/types'
import z from 'zod'

export const MessageTypes = ['CreateBookWithHighlights', 'CreateHighlights'] as const
export const MessageTypesSchema = z.enum(MessageTypes)
export type MessageTypes = z.infer<typeof MessageTypesSchema>
export const MESSAGE_TYPES = MessageTypesSchema.Values

export const CreateBookWithHighlightsSchema = z.object({
  type: z.literal(MESSAGE_TYPES.CreateBookWithHighlights),
  data: z.object({
    book: BookInputSchema,
    highlights: z.array(HighlightInputSchema),
  }),
})
export type CreateBookMessage = z.infer<typeof CreateBookWithHighlightsSchema>

export const CreateHighlightSchema = z.object({
  type: z.literal(MESSAGE_TYPES.CreateHighlights),
  data: z.object({
    bookId: z.string(),
    highlights: z.array(HighlightInputSchema),
  }),
})
export type CreateHighlightMessage = z.infer<typeof CreateHighlightSchema>

export const MessageSchema = z.union([CreateBookWithHighlightsSchema, CreateHighlightSchema])
