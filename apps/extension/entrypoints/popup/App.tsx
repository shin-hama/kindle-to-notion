import PopupTop from './Top'
import SignIn from './Top/SignIn'

function App() {
  const user = useAuthenticatedUser()

  return (
    <div className="flex justify-center py-16">{user ? <PopupTop user={user} /> : <SignIn />}</div>
  )
}

export default App
