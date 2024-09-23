import ScrapingProgress from './ScrapingProgress'

export const useScrapingProgress = () => {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Notification',
      description: <ScrapingProgress />,
      duration: 24 * 60 * 60 * 1000,
    })
  }, [])
}
