import { GetUserMessageResponse, GetUserMessageResponseSchema } from '@/entrypoints/types/messaging'
import { User } from '@kino/shared'
import React, { PropsWithChildren } from 'react'

const CurrentUserContext = React.createContext<User | null>(null)

export const CurrentUserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  useEffect(() => {
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
  }, [])

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export const useAuthenticatedUser = () => {
  const currentUser = React.useContext(CurrentUserContext)

  return currentUser
}
