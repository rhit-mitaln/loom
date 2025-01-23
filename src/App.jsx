import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/home'
import Login from './Pages/Login/login'
import Welcome from './Pages/Welcome/welcome'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)
  


  return (
    <header>
    <SignedOut>
      <Login />
    </SignedOut>
    <SignedIn>
      <Home />
    </SignedIn>
    </header>
  )
}

export default App
