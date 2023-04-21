import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './components/Auth/LoginForm'
import './Login.scss'

const Login = ({ isDarkMode, setIsDarkMode }) => {

  return (
    <div className='login-page'>
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
      <input type="checkbox" id="color-mode-selector" name="color-mode-selector" 
        checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}></input>
    </div>
  )
}

export default Login