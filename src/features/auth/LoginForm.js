import './AuthForm.scss'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation, useGoogleLoginMutation } from '../../features/auth/authApiSlice'

import { FiAlertCircle } from 'react-icons/fi'
import { Ellipsis } from 'react-awesome-spinners'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'

const LoginForm = () => {
  const errRef = useRef()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [googleLogin, { isLoading }] = useGoogleLoginMutation()

  const [login, { isLoadingGoogle }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Email and password required')
      return 
    }
    try {
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...userData, email }))
      setEmail('')
      setPassword('')
      navigate('/rankings')
    } catch (err) {
      if (!err?.originalStatus && !err?.status) {
        setErrorMessage('No server response')
      } else if (err?.originalStatus === 401) {
        setErrorMessage('Incorrect email or password')
      } else {
        setErrorMessage('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleGoogleLogin = async (credentials) => {
    try {
      const { accessToken, email } = await googleLogin(credentials).unwrap()
      dispatch(setCredentials({ accessToken, email }))
      setEmail('')
      setPassword('')
      navigate('/rankings')
    } catch (err) {
      if (!err?.originalStatus && !err?.status) {
        setErrorMessage('No server response')
      } else if (err?.originalStatus === 401) {
        setErrorMessage('Incorrect email or password')
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
    <form className="auth-form" >
      <div className='form-header'>
        <h2>Login</h2>
      </div>
      <div className='google-auth-wrapper'>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          cookiePolicy={'single-host-origin'}
          onSuccess={credentialResponse => {
            handleGoogleLogin(credentialResponse)
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