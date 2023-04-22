import './AuthForm.scss'
import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    console.log(email, password)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const validateEmail = () => {
    return true
  }

  const validatePassword = () => {
    return true
  }

  return (
    <form className="auth-form">
      <div className='form-header'>
        <h2>Login</h2>
      </div>
      <button className='google-auth-btn'>Login with Google</button>
      <hr />
      <TextField
        className='text-input'
        variant='outlined'
        label='Username or Email'
        onChange={handleChangeEmail}
        size='medium'
      />
      <TextField
        className='text-input'
        variant='outlined'
        label='Enter Password'
        onChange={handleChangePassword}
        size='medium'
      />
      <button type='button'
        className='submit-btn'
        onClick={onSubmit}>Log in</button>
      <div className='link-wrapper'>
        <span>Don't have an account?</span>
        <a href="/register">Sign Up</a>
      </div>
    </form>
  )
}

export default LoginForm