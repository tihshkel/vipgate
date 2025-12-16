import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const MainLayout = ({ onLoginClick, isLoggedIn, userEmail, onLogout }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={onLoginClick} 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail} 
        onLogout={onLogout} 
      />
      <main>
        <Outlet />
      </main>
      <Footer onLoginClick={onLoginClick} />
    </div>
  )
}

export default MainLayout
