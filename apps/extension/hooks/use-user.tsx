import { GetUserMessageResponse, GetUserMessageResponseSchema } from '@/entrypoints/types/messaging'
import { User } from '@kino/shared'
import { Loader2 } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

const CurrentUserContext = React.createContext<User | null>(null)

export const CurrentUserProvider: React.FC<PropsWithChildren<{ isContent?: boolean }>> = ({
  children,
  isContent = false,
}) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    setIsLoading(true)
    browser.runtime
      .sendMessage({ type: 'GetUser' })
      .then((result: GetUserMessageResponse) => {
        const parseResult = GetUserMessageResponseSchema.safeParse(result)
        if (!parseResult.success) {
          console.error('Failed to parse user response', parseResult.error)
          return
        } else if (!result.user) {
          console.error('This client is not authenticated')
          return
        }
        console.log('User: ', result.user)
        setCurrentUser(result.user)
      })
      .catch((e) => {
        console.error('Failed to fetch user', e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return isContent ? (
      // Content Script では Loader を表示しない
      <></>
    ) : (
      <div className="py-16 flex w-full justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export const useAuthenticatedUser = () => {
  const currentUser = React.useContext(CurrentUserContext)

  return currentUser
}
