import React from 'react'
import { useNavigate } from 'react-router-dom'
import PersonalAccount from './PersonalAccount'

const ProfilePage = ({ userEmail, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return <PersonalAccount userEmail={userEmail} onLogout={handleLogout} />
}

export default ProfilePage
