import z from 'zod'
import { HighlightColor } from '@/gql/graphql'
import dayjs from 'dayjs'

export type Result<T> = {
  data?: T | null
  error?: string | null
}

export const HighlightColorsSchema = z.enum(['yellow', 'blue', 'pink', 'orange'])
export type HighlightColors = z.infer<typeof HighlightColorsSchema>

export const HighlightInputSchema = z.object({
  id: z.string(),
  text: z.string(),
  color: HighlightColorsSchema,
  location: z.number(),
  page: z.number().nullable(),
  note: z.string().nullable(),
  annotatedAt: z.string().default(new Date().toISOString()),
})
export type HighlightInput = z.infer<typeof HighlightInputSchema>

export const BookInputSchema = z.object({
  asin: z.string(),
  title: z.string(),
  author: z.string(),
  url: z.string().nullable().optional().default(null),
  imageUrl: z.string().nullable().optional().default(null),
  lastAnnotatedAt: z.string().default(new Date().toISOString()),
})

export type BookInput = z.infer<typeof BookInputSchema>

export type AmazonAccountRegion =
  | 'global'
  | 'india'
  | 'japan'
  | 'spain'
  | 'germany'
  | 'italy'
  | 'UK'
  | 'france'

export type AmazonAccount = {
  name: string
  hostname: string
  kindleReaderUrl: string
  notebookUrl: string
}
