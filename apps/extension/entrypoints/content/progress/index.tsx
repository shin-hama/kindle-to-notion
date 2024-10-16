import { useScraper } from '../scraper/useScraper'
import { useScrapingProgress } from './useScrapingProgress'

const Progress = () => {
  useScraper()
  useScrapingProgress()
  return <div />
}

export default Progress
