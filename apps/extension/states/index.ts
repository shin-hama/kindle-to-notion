import { Result } from '@/types'
import { atom } from 'jotai'

export const scrapingProgress = atom<
  Result<{
    total: number
    current: number
    title: string
  }>
>({ data: null, error: null })
