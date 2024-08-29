export default defineContentScript({
  matches: ['*://read.amazon.co.jp/notebook*'],
  main() {
    console.log('Hello content.')
  },
})
