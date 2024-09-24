import { useAtom } from 'jotai'
import ScrapingProgress from './ScrapingProgress'
import { scrapingProgress } from '@/states'

export const useScrapingProgress = () => {
  const { toast } = useToast()

  const [state] = useAtom(scrapingProgress)

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        duration: 10 * 1000,
        variant: 'destructive',
      })
    } else if (state.data) {
      toast({
        title: 'Exporting',
        description: <ScrapingProgress />,
        duration: 24 * 60 * 60 * 1000,
      })
    } else {
      toast({
        title: 'Notification',
        description: 'Collecting a list of books from your Kindle account. This may take a while.',
        duration: 10 * 1000,
      })
    }
  }, [state])
}
