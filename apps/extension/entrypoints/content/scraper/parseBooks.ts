import { currentAmazonRegion } from '@/entrypoints/content/scraper/amazon/region'
import { AmazonAccountRegion, BookInput } from '@/types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/fr'

dayjs.extend(customParseFormat)

type NextPageState = {
  token: string
}

const booksUrl = (state?: NextPageState | null): string => {
  const region = currentAmazonRegion()
  return `${region.notebookUrl}?library=list&token=${state?.token ?? ''}`
}

const parseNextPageState = (doc: Document): NextPageState | null => {
  const token = doc.querySelector('.kp-notebook-library-next-page-start')?.getAttribute('value')

  return !token ? null : ({ token } satisfies NextPageState)
}

/**
 * Amazon dates in the Kindle notebook looks like "Sunday October 24, 2021"
 * This method will parse this string and return a valid Date object
 */
export const parseToDate = (kindleDate: string, region: AmazonAccountRegion): Date => {
  switch (region) {
    case 'japan': {
      const amazonDateString = kindleDate.substring(0, kindleDate.indexOf(' '))
      return dayjs(amazonDateString, 'YYYY M D', 'ja').toDate()
    }
    case 'france': {
      // 曜日 月 日, 年 になっているので、曜日を削除してからパースする
      const amazonDateString = kindleDate.substring(kindleDate.indexOf(' ') + 1)
      return dayjs(amazonDateString, 'MMMM D, YYYY', 'fr').toDate()
    }
    default: {
      const amazonDateString = kindleDate.substring(kindleDate.indexOf(' ') + 1)
      return dayjs(amazonDateString, 'MMMM D, YYYY').toDate()
    }
  }
}

export const parseAuthor = (scrapedAuthor: string): string => {
  return scrapedAuthor.replace(/.*: /, '')?.trim()
}

export const parseBooks = (doc: Document): Array<BookInput> => {
  const booksElm = doc.querySelectorAll('.kp-notebook-library-each-book')

  return Array.from(booksElm.values())
    .map((elm) => {
      const title = elm.querySelector('.kp-notebook-searchable')?.textContent ?? 'unknown'

      const updatedAt = elm
        .querySelector("input[id^='kp-notebook-annotated-date']")
        ?.getAttribute('value')
      const author = elm.querySelector('p.kp-notebook-searchable')?.textContent

      if (!title || !author || !updatedAt) {
        return null
      }

      const book: BookInput = {
        asin: elm.getAttribute('id') ?? '',
        title: title,
        author: parseAuthor(author),
        url: `https://www.amazon.co.jp/dp/${elm.getAttribute('id')}`,
        imageUrl: elm.querySelector('.kp-notebook-cover-image')?.getAttribute('src') ?? null,
        lastAnnotatedAt: parseToDate(updatedAt, 'japan').toISOString(),
      }
      return book
    })
    .filter((book): book is BookInput => book !== null)
}

const loadAndScrapeBooks = async (url: string): Promise<Array<BookInput>> => {
  // Load the highlights page and parse it
  const text = await (await fetch(url)).text()
  const doc = new DOMParser().parseFromString(text, 'text/html')

  const nextPageState = parseNextPageState(doc)

  if (!nextPageState) {
    return parseBooks(doc)
  } else {
    const books = parseBooks(doc)
    return books.concat(await loadAndScrapeBooks(booksUrl(nextPageState)))
  }
}

const scrapeBooks = async (): Promise<Array<BookInput>> => {
  const url = booksUrl()
  return loadAndScrapeBooks(url)
}

export default scrapeBooks
