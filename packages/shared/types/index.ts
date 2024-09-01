export type HighlightInput = {
  text: string
  location?: string | null
  page?: string | null
  note?: string | null
  color: 'pink' | 'blue' | 'yellow' | 'orange'
  createdDate?: Date | null
}

export type BookInput = {
  asin?: string
  title: string
  author: string
  url?: string
  imageUrl?: string
  lastAnnotatedAt?: Date
}

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
