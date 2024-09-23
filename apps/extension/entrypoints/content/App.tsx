import Progress from './progress'
import { Toaster } from '@/components/ui/toaster'
import '../../assets/global.css'

export default function App() {
  return (
    <div>
      <h1 className="font-bold text-lg">WXT + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <Toaster />
      <Progress />
    </div>
  )
}
