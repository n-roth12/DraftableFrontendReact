import './AuthForm.scss'
import { useState } from 'react'
import { TextField } from '@mui/material'

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

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
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
        <h1>Create an Account</h1>
      </div>
      <button className='google-auth-btn'>Continue with Google</button>
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
        label='Create Username'
        onChange={handleChangeUsername}
        size='medium'
      />
      <TextField
        className='text-input'
        variant='outlined'
        label='Create Password'
        onChange={handleChangePassword}
        size='medium'
      />
      <TextField
        className='text-input'
        variant='outlined'
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
