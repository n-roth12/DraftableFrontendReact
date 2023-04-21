import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './components/Auth/RegisterForm'
import './Register.scss'

const Register = ({ isDarkMode, setIsDarkMode }) => {

  return (
    <div className='register-page'>
      <div className='register-form-wrapper form-wrapper'>
        <RegisterForm />
      </div>
      <input type="checkbox" id="color-mode-selector" name="color-mode-selector" 
        checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}></input>
    </div>
  )
}

export default Register