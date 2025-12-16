import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import ProfilePage from './pages/Account/ProfilePage'
import PersonalData from './pages/Account/PersonalData'
import FastTrackPage from './pages/FastTrack/FastTrackPage'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleLoginSuccess = (email) => {
    setUserEmail(email)
    setIsLoggedIn(true)
    // Navigation to profile is handled inside LoginPage wrapper, 
    // or we can do it here if we pass onLoginSuccess differently.
    // The LoginPage wrapper calls onLoginSuccess AND navigate('/profile').
    // So here we just update state.
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={
        <MainLayout 
          onLoginClick={handleLoginClick} 
          isLoggedIn={isLoggedIn} 
          userEmail={userEmail} 
          onLogout={handleLogout} 
        />
      }>
        <Route index element={<HomePage />} />
        <Route path="/fast-track" element={<FastTrackPage />} />
      </Route>
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/profile" element={<ProfilePage userEmail={userEmail} onLogout={handleLogout} />} />
      <Route path="/profile/personal-data" element={<PersonalData userEmail={userEmail} onLogout={handleLogout} />} />
    </Routes>
  )
}

export default App
