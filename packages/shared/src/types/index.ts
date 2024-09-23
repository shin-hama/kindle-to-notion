import { z } from 'zod'

export const NotionUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string(),
  pageUrl: z.string(),
})
export type NotionUser = z.infer<typeof NotionUserSchema>
