import z from 'zod'
import { HighlightColor } from '@/gql/graphql'

export const HighlightColorsSchema = z.nativeEnum(HighlightColor)
export type HighlightColors = z.infer<typeof HighlightColorsSchema>

export const HighlightInputSchema = z.object({
  text: z.string(),
  color: HighlightColorsSchema,
  location: z.string().nullable(),
  page: z.string().nullable(),
  note: z.string().nullable(),
  createdDate: z.date().nullable(),
})
export type HighlightInput = z.infer<typeof HighlightInputSchema>

export const BookInputSchema = z.object({
  asin: z.string().optional(),
  title: z.string(),
  author: z.string(),
  url: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  lastAnnotatedAt: z.date().nullable().optional(),
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
