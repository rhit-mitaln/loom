import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/home'
import Login from './Pages/Login/login'
import Welcome from './Pages/Welcome/welcome'
import DailyAssesment from './Pages/DailyAssessment/dailyAssesment'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  


  return (
    <header>
    <SignedOut>
      <Routes>
      <Route path='*' element={<Login />}/>
      </Routes>
    </SignedOut>
    <SignedIn>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dailyAssesment' element={<DailyAssesment />}/>
      </Routes>
    </SignedIn>
    </header>
  )
}

export default App
