import { User } from '@kino/shared'
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

  if (!currentUser) {
    return <></>
  }

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export const useAuthenticatedUser = () => {
  const currentUser = React.useContext(CurrentUserContext)

  if (!currentUser) {
    throw new Error('User is not authenticated')
  }

  return currentUser
}
