import ScrapingProgress from './ScrapingProgress'

export const useScrapingProgress = () => {
  const { toast } = useToast()
  useEffect(() => {
    // 2 秒後に通知を表示
    const { id, update } = toast({
      title: 'Scraping Progress',
      description: <ScrapingProgress />,
      duration: 500000,
    })

    // setInterval(() => {
    //   toast({
    //     key: (Math.random() * 10000).toString(16),
    //     title: 'Scraping Progress',
    //     description: 'Processing...: ' + Math.random(),
    //   })
    // }, 2000)
  }, [])
}
