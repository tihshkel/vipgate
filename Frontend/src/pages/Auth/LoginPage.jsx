import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  const handleSuccess = (email) => {
    onLoginSuccess(email)
    navigate('/profile')
  }

  return <Login onClose={handleClose} onLoginSuccess={handleSuccess} />
}

export default LoginPage
