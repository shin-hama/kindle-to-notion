import notionLogo from '@/assets/notion-logo.svg'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

function App() {
  const user = useAuthenticatedUser()

  return (
    <div className="flex justify-center py-16">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold text-center">Welcome, {user.name}</h1>
          <p className="text-center">You are now authenticated with Notion</p>
        </div>
      ) : (
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col text-center space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Kino</h1>
                <p className="text-sm text-muted-foreground">Your kindle notes export to Notion</p>
              </div>
              <Button asChild>
                <a
                  href={import.meta.env.VITE_NOTION_AUTH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={notionLogo} alt="Notion logo" className="h-6 w-6 mr-2" />
                  Login with Notion
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
