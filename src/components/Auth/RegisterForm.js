import './AuthForm.scss'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = () => {
    console.log(email)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <form className="auth-form">
      <div className='form-header'>
        <h2>Create an Account</h2>
      </div>
      <div className='google-auth-wrapper'>
        <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
      </div>
      <hr />
      <TextField
        className='text-input'
        variant='outlined'
        label='Enter Email'
        onChange={handleChangeEmail}
        size='medium'
      />
      <TextField
        className='text-input'
        variant='outlined'
        type="password"
        label='Create Password'
        onChange={handleChangePassword}
        size='medium'
      />
      <TextField
        className='text-input'
        variant='outlined'
        type="password"
        label='Confirm Password'
        onChange={handleChangeConfirmPassword}
        size='medium'
      />
      <button type='button'
        className='submit-btn'
        onClick={onSubmit}>Register</button>
      <div className='link-wrapper'>
        <span>Already have an account?</span>
        <a href="/login" className='link'>Login</a>
      </div>
    </form>
  )
}

export default RegisterForm
