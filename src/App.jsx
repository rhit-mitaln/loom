import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/home'
import Welcome from './Pages/Welcome/welcome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Home />
  )
}

export default App
