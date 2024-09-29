import { User } from '@kino/shared'
import { BookInputSchema, HighlightInputSchema } from '@/types'
import z from 'zod'

export const MessageTypes = ['CreateBookWithHighlights', 'GetUser'] as const
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

export const GetUserMessageSchema = z.object({
  type: z.literal(MESSAGE_TYPES.GetUser),
})
export type GetUserMessage = z.infer<typeof GetUserMessageSchema>

export const ToBackendMessageSchema = z.union([
  CreateBookWithHighlightsSchema,
  GetUserMessageSchema,
])

export const FromBackendMessageTypes = ['SessionValid'] as const
export const FromBackendMessageTypesSchema = z.enum(FromBackendMessageTypes)
export type FromBackendMessageTypes = z.infer<typeof FromBackendMessageTypesSchema>
export const FROM_BACKEND_MESSAGE_TYPES = FromBackendMessageTypesSchema.Values

export const SessionValidMessageSchema = z.object({
  type: z.literal(FROM_BACKEND_MESSAGE_TYPES.SessionValid),
  data: z.object({
    user: z.record(z.any()).transform((val) => val as User),
  }),
})
export const FromBackendMessageSchema = z.union([
  SessionValidMessageSchema,
  z.object({ type: z.string() }),
])
export type FromBackendMessage = z.infer<typeof FromBackendMessageSchema>
