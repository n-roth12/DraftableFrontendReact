import './AuthForm.scss'
import { useState, useEffect } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { GoogleLogin} from '@react-oauth/google'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = () => {
    console.log(email, password)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }}
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