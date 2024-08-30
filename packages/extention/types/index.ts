export type HighlightContent = {
  comment: string
  originalText: string
}

export type Book = {
  id: string
  asin?: string
  title: string
  author: string
  url?: string
  imageUrl?: string
  updatedAt?: Date
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
