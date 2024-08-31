import { currentAmazonRegion } from '@/amazon/region'
import type { Book, Highlight } from '@kino/shared/types'
import { br2ln, hash } from '@/lib'

type NextPageState = {
  token: string
  contentLimitState: string
}

export const mapTextToColor = (highlightClasses: string): Highlight['color'] => {
  const matches = /kp-notebook-highlight-(.*)/.exec(highlightClasses)
  return matches ? (matches[1] as Highlight['color']) : undefined
}

const highlightsUrl = (book: Book, state?: NextPageState | null): string => {
  const region = currentAmazonRegion()
  return `${region.notebookUrl}?asin=${book.asin}&contentLimitState=${
    state?.contentLimitState ?? ''
  }&token=${state?.token ?? ''}`
}

const parseNextPageState = (doc: Document): NextPageState | null => {
  const contentLimitState = doc
    .querySelector('.kp-notebook-content-limit-state')
    ?.getAttribute('value')
  const token = doc.querySelector('.kp-notebook-annotations-next-page-start')?.getAttribute('value')

  return !token || !contentLimitState
    ? null
    : ({ contentLimitState, token } satisfies NextPageState)
}

const parseHighlights = (doc: Document): Highlight[] => {
  const highlightsEl = Array.from(doc.querySelectorAll('.a-row .a-spacing-base'))

  return highlightsEl
    .map((highlightEl): Highlight | null => {
      const pageMatch = /\d+$/.exec(
        highlightEl.querySelector('#annotationNoteHeader')?.textContent ?? '',
      )

      const highlightClasses = highlightEl
        .querySelector('.kp-notebook-highlight')
        ?.getAttribute('class')
      const color = !!highlightClasses ? mapTextToColor(highlightClasses) : undefined

      const text = highlightEl.querySelector('#highlight')?.textContent?.trim()
      if (!text) {
        return null
      }

      const noteHtml = highlightEl.querySelector('#note')?.innerHTML

      return {
        id: hash(text),
        text,
        color,
        location: highlightEl.querySelector('#kp-annotation-location')?.getAttribute('value'),
        page: pageMatch ? pageMatch[0] : null,
        note: noteHtml && br2ln(noteHtml),
      } satisfies Highlight
    })
    .filter((highlight): highlight is Highlight => highlight !== null)
}

const loadAndScrapeHighlights = async (book: Book, url: string) => {
  const nextPageState = parseNextPageState(document)

  return {
    highlights: parseHighlights(document),
    nextPageUrl: highlightsUrl(book, nextPageState),
    hasNextPage: nextPageState !== null,
  }
}

const scrapeBookHighlights = async (book: Book): Promise<Highlight[]> => {
  let results: Highlight[] = []

  let url = highlightsUrl(book)

  do {
    const data = await loadAndScrapeHighlights(book, url)

    results = [...results, ...data.highlights]

    url = data.nextPageUrl
    var hasNextPage = data.hasNextPage
  } while (hasNextPage)

  return results.filter((h) => h.text)
}

export default scrapeBookHighlights
