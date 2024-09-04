import { BookInputSchema, HighlightInputSchema } from '@kino/shared/types'
import z from 'zod'

export const MessageTypes = ['CreateBook', 'CreateHighlight'] as const
export const MessageTypesSchema = z.enum(MessageTypes)
export type MessageTypes = z.infer<typeof MessageTypesSchema>
export const MESSAGE_TYPES = MessageTypesSchema.Values

export const CreateBookSchema = z.object({
  type: z.literal(MESSAGE_TYPES.CreateBook),
  book: BookInputSchema,
})
export type CreateBookMessage = z.infer<typeof CreateBookSchema>

export const CreateHighlightSchema = z.object({
  type: z.literal(MESSAGE_TYPES.CreateHighlight),
  highlight: HighlightInputSchema,
})

export const MessageSchema = z.union([CreateBookSchema, CreateHighlightSchema])
