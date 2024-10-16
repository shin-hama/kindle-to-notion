import { useAtom } from 'jotai'
import ScrapingProgress from './ScrapingProgress'
import { scrapingProgress } from '@/states'

export const useScrapingProgress = () => {
  const { toast } = useToast()
  const [toastId, setToastId] = useState<string | null>(null)

  const [state] = useAtom(scrapingProgress)

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        duration: 10 * 1000,
        variant: 'destructive',
      })
      setToastId(null)
    } else if (state.data) {
      if (state.data.completed) {
        toast({
          title: 'Exporting',
          description: 'Exporting is completed.',
          duration: 10 * 1000,
        })
        setToastId(null)
      } else {
        if (toastId) {
          return
        }
        const { id } = toast({
          title: 'Exporting',
          description: <ScrapingProgress />,
          duration: 24 * 60 * 60 * 1000,
        })
        setToastId(id)
      }
    } else {
      toast({
        title: 'Notification',
        description: 'Collecting a list of books from your Kindle account. This may take a while.',
        duration: 10 * 1000,
      })
      setToastId(null)
    }
  }, [state])
}
