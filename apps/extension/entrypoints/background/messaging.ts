import { contentScriptMatches } from '../../utils/constants'
import { FromBackendMessage } from '../types/messaging'

export const sendMessageToContent = async (message: FromBackendMessage) => {
  const allTabs = await browser.tabs.query({})
  await Promise.all(
    allTabs
      .filter(
        (tab) =>
          tab.id != null &&
          tab.url != null &&
          contentScriptMatches.some((match) => new MatchPattern(match).includes(tab.url!)),
      )
      .map(async (tab) => {
        await browser.tabs.sendMessage(tab.id!, message)
      }),
  )
}
