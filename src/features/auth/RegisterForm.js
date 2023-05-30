import './AuthForm.scss'
import { useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { FiAlertCircle } from 'react-icons/fi'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { setCredentials } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { addInfo } from '../alerts/alertsApiSlice'

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const errRef = useRef()
  const [register, { isLoading }] = useRegisterMutation()

  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!')
      return
    }
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Email and password required')
      return 
    }
    try {
      const userData = await register({ email, password }).unwrap()
      dispatch(setCredentials({ ...userData, email }))
      addInfo({ "value": "Successfully Registered!", "category": "success" })
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate('/rankings')
    } catch (err) {
      if (!err?.status && !err?.originalStatus) {
        setErrorMessage('No server response')
      } else if (err.status === 400) {
        setErrorMessage('Missing username or password')
      } else if (err?.originalStatus === 409) {
        setErrorMessage('Account already exists for email')
      } else if (err.status === 422) {
        setErrorMessage(err?.data?.error)
      } else {
        setErrorMessage('Login Failed')
      }
      errRef.current.focus()
    }
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
        onClick={handleSubmit}>Register</button>
      <div className='link-wrapper'>
        <span>Already have an account?</span>
        <a href="/login" className='link'>Login</a>
      </div>
    </form>
  )
}

export default RegisterForm
