import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/home'
import Login from './Pages/Login/login'
import Welcome from './Pages/Welcome/welcome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Login />
  )
}

export default App
