import { BookInputSchema, HighlightInputSchema } from "@/types";
import z from "zod";

export const MessageTypes = ["CreateBookWithHighlights", "GetUser"] as const;
export const MessageTypesSchema = z.enum(MessageTypes);
export type MessageTypes = z.infer<typeof MessageTypesSchema>;
export const MESSAGE_TYPES = MessageTypesSchema.Values;

export const CreateBookWithHighlightsSchema = z.object({
  type: z.literal(MESSAGE_TYPES.CreateBookWithHighlights),
  data: z.object({
    book: BookInputSchema,
    highlights: z.array(HighlightInputSchema),
  }),
});
export type CreateBookMessage = z.infer<typeof CreateBookWithHighlightsSchema>;

export const GetUserMessageSchema = z.object({
  type: z.literal(MESSAGE_TYPES.GetUser),
});
export type GetUserMessage = z.infer<typeof GetUserMessageSchema>;
export const GetUserMessageResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    pageUrl: z.string().nullable(),
  }).nullable(),
});
export type GetUserMessageResponse = z.infer<
  typeof GetUserMessageResponseSchema
>;

export const ToBackendMessageSchema = z.union([
  CreateBookWithHighlightsSchema,
  GetUserMessageSchema,
]);
