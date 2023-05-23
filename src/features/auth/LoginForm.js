import './AuthForm.scss'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'

import { FiAlertCircle } from 'react-icons/fi'
import { Ellipsis } from 'react-awesome-spinners'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { GoogleLogin } from '@react-oauth/google'

const LoginForm = () => {
  const errRef = useRef()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await login({ email, password }).unwrap()
      console.log(userData)
      dispatch(setCredentials({ ...userData, email }))
      setEmail('')
      setPassword('')
      navigate('/rankings')
    } catch (err) {
      if (!err?.originalStatus) {
        setErrorMessage('No server response')
      } else if (err.response?.originalStatus === 400) {
        setErrorMessage('Missing username or password')
      } else if (err.response?.originalStatus === 401) {
        setErrorMessage('Unathorized')
      } else {
        setErrorMessage('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



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
      {errorMessage && !isLoading &&
        <div className='error-message-wrapper'>
          <FiAlertCircle className='error-icon' />
          <span className='error-message'
            ref={errRef}>
            {errorMessage}
          </span>
        </div>
      }
      <button type='button'
        className='submit-btn'
        onClick={handleSubmit}>{isLoading ? <Ellipsis /> : "Log in"}</button>
      <div className='link-wrapper'>
        <span>Don't have an account?</span>
        <a href="/register">Sign Up</a>
      </div>
    </form>
  )
}

export default LoginForm