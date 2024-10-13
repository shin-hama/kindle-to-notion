import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { CurrentUserProvider } from '@/hooks/use-user.js'
import '../../assets/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="w-80">
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </div>
  </React.StrictMode>,
)
