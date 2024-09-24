import { SessionValidMessageSchema } from '@/entrypoints/types/messaging'
import { User } from '@/gql/graphql'
import React, { PropsWithChildren } from 'react'

const CurrentUserContext = React.createContext<User | null>(null)

export const CurrentUserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  useEffect(() => {
    browser.runtime
      .sendMessage({ type: 'GetUser' })
      .then((user) => {
        console.log('User is fetched, ', user)
        setCurrentUser(user)
      })
      .catch((e) => {
        console.error('Failed to fetch user', e)
      })
  }, [])

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export const useUser = () => {
  const currentUser = React.useContext(CurrentUserContext)

  return currentUser
}
