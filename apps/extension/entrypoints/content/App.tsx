import Progress from './progress'
import { Toaster } from '@/components/ui/toaster'
import '../../assets/global.css'

export default function App() {
  const user = useAuthenticatedUser()

  if (!user) {
    return <></>
  }

  return (
    <>
      <Toaster />
      <Progress />
    </>
  )
}
