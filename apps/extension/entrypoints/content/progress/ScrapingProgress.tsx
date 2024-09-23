import { useToast } from '@/hooks/use-toast'

const ScrapingProgress = () => {
  const { toast } = useToast()

  useEffect(() => {
    // 2 秒後に通知を表示
    setTimeout(() => {
      toast({
        title: 'Scraping is completed',
        description: 'Scraping is completed',
      })
    }, 2000)
  }, [])

  return <div></div>
}

export default ScrapingProgress
