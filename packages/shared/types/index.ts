import z from 'zod'

export const HighlightColors = ['pink', 'blue', 'yellow', 'orange'] as const
export const HighlightColorSchema = z.enum(HighlightColors)
export type HighlightColor = z.infer<typeof HighlightColorSchema>

export const HighlightInputSchema = z.object({
  text: z.string(),
  color: HighlightColorSchema,
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
