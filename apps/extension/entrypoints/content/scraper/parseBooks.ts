import { AmazonAccountRegion, BookInput } from '@kino/shared/types'
import dayjs from 'dayjs'

/**
 * Amazon dates in the Kindle notebook looks like "Sunday October 24, 2021"
 * This method will parse this string and return a valid Date object
 */
export const parseToDateString = (kindleDate: string, region: AmazonAccountRegion): Date => {
  switch (region) {
    case 'japan': {
      const amazonDateString = kindleDate.substring(0, kindleDate.indexOf(' '))
      return dayjs(amazonDateString, 'YYYY MM DD', 'ja').toDate()
    }
    case 'france': {
      return dayjs(kindleDate, 'MMMM D, YYYY', 'fr').toDate()
    }
    default: {
      const amazonDateString = kindleDate.substring(kindleDate.indexOf(' ') + 1)
      return dayjs(amazonDateString, 'MMM DD, YYYY').toDate()
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
        asin: elm.getAttribute('id') ?? undefined,
        title: title,
        author: parseAuthor(author),
        url: `https://www.amazon.co.jp/dp/${elm.getAttribute('id')}`,
        imageUrl: elm.querySelector('.kp-notebook-cover-image')?.getAttribute('src') ?? undefined,
        lastAnnotatedAt: parseToDateString(updatedAt, 'japan'),
      }
      return book
    })
    .filter((book): book is BookInput => book !== null)
}

const scrapeBooks = (): Array<BookInput> => {
  return parseBooks(document)
}

export default scrapeBooks
