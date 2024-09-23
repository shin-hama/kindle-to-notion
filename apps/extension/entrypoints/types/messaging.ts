import { BookInputSchema, HighlightInputSchema } from '@/types'
import { NotionUserSchema } from '@kino/shared'
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

export const ToBackendMessageSchema = z.union([
  CreateBookWithHighlightsSchema,
  CreateHighlightSchema,
])

export const FromBackendMessageTypes = ['SessionValid'] as const
export const FromBackendMessageTypesSchema = z.enum(FromBackendMessageTypes)
export type FromBackendMessageTypes = z.infer<typeof FromBackendMessageTypesSchema>
export const FROM_BACKEND_MESSAGE_TYPES = FromBackendMessageTypesSchema.Values

export const ParseBooksSchema = z.object({
  type: z.literal(FROM_BACKEND_MESSAGE_TYPES.SessionValid),
  data: z.object({
    user: NotionUserSchema,
  }),
})
export const FromBackendMessageSchema = z.union([ParseBooksSchema, z.object({ type: z.string() })])
export type FromBackendMessage = z.infer<typeof FromBackendMessageSchema>
