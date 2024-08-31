import { parseBooks } from './scraper/parseBooks'

export default defineContentScript({
  matches: ['*://read.amazon.co.jp/notebook*'],
  main() {
    const test = parseBooks()

    console.log(test)
  },
})
