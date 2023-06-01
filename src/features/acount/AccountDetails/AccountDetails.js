import { useState } from "react"
import './AccountDetails.scss'
import { FaEdit } from "react-icons/fa"
import { FiAlertCircle } from "react-icons/fi"
import { useUpdateUserMutation } from "../accountSlice"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { VisibilityOff, Visibility } from '@mui/icons-material'

const AccountDetails = ({ data }) => {
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [confirmNewEmail, setConfirmNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const handleChangeNewEmail = (e) => setNewEmail(e.target.value)
  const handleChangeConfirmNewEmail = (e) => setConfirmNewEmail(e.target.value)
  const handleChangeCurrentPassword = (e) => setCurrentPassword(e.target.value)
  const handleChangeNewPassword = (e) => setNewPassword(e.target.value)
  const handleChangeConfirmNewPassword = (e) => setConfirmNewPassword(e.target.value)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const updateEmail = async () => {
    if (!newEmail?.length || !confirmNewEmail?.length) {
      setEmailErrorMsg('Email and Confirm Email are required!')
      return
    }
    if (newEmail !== confirmNewEmail) {
      setEmailErrorMsg('Email values do not match!')
      return
    }
    try {
      const userData = await updateUser({ email: newEmail }).unwrap()
      clearEditingEmail()
    } catch (err) {
      if (!err?.originalStatus && !err?.status) {
        setEmailErrorMsg('No server response')
      } else if (err?.originalStatus === 409) {
        setEmailErrorMsg('Account already exists for email!')
      } else if (err?.status === 422) {
        setEmailErrorMsg(`Error: ${err?.data?.error}!`)
      } else {
        setEmailErrorMsg('Email change failed')
      }
    }
  }

  const updatePassword = async () => {
    if (!currentPassword?.length || !newPassword?.length || !confirmNewPassword?.length) {
      setPasswordErrorMsg('Missing required field!')
      return
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordErrorMsg('Password values do not match!')
      return
    }
    try {
      const userData = await updateUser({ password: newPassword, currentPassword }).unwrap()
      clearEditingPassword()
    } catch (err) {
      if (!err?.originalStatus && !err?.status) {
        setPasswordErrorMsg('No server response')
      } else if (err?.status === 422) {
        setPasswordErrorMsg(`Error: ${err?.data?.error}!`)
      } else if (err?.originalStatus === 401) {
        setPasswordErrorMsg('Incorrect current password!')
      } else {
        setPasswordErrorMsg('Email change failed')
      }
    }
  }

  const clearEditingEmail = () => {
    setEditingEmail(false)
    setNewEmail('')
    setConfirmNewEmail('')
    setEmailErrorMsg('')
  }

  const clearEditingPassword = () => {
    setEditingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setPasswordErrorMsg('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className='account-details-wrapper'>
      <div className='account-detail'>
        <div className='account-detail-inner'>
          <p className='label'>Email</p>
          {!editingEmail ?
            <>
              <p className='value'>{data?.email}</p>
            </>
            :
            <div className='account-changes-wrapper'>
              <div className='account-changes-inner'>
                <TextField
                  className='text-input'
                  type='text'
                  variant='outlined'
                  label='New Email'
                  onChange={handleChangeNewEmail}
                  size='small'
                />
                <TextField
                  className='text-input'
                  type='text'
                  variant='outlined'
                  label='Confirm Email'
                  onChange={handleChangeConfirmNewEmail}
                  size='small'
                />
                {emailErrorMsg && !isLoading &&
                  <div className='error-message-wrapper'>
                    <FiAlertCircle className='error-icon' />
                    <span className='error-message'>
                      {emailErrorMsg}
                    </span>
                  </div>
                }
              </div>
              <div className='confirm-buttons-wrapper'>
                <button className='cancel-btn' onClick={clearEditingEmail}>Cancel</button>
                <button className='save-btn' onClick={updateEmail}>Save</button>
              </div>
            </div>
          }
        </div>
        {!editingEmail &&
          <FaEdit className='edit-icon' onClick={() => setEditingEmail(true)} />
        }
      </div>
      <div className='account-detail'>
        <div className='account-detail-inner'>
        <p className='label'>Password</p>
          {!editingPassword ?
            <>
              <p className='value'>**********</p>
            </>
            :
            <div className='account-changes-wrapper'>
              <div className='account-changes-inner'>
                <TextField
                  className='text-input'
                  type={showCurrentPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}
                  variant='outlined'
                  label='Current Password'
                  onChange={handleChangeCurrentPassword}
                  size='small'
                />
                <TextField
                  className='text-input'
                  type={showNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}
                  variant='outlined'
                  label='New Password'
                  onChange={handleChangeNewPassword}
                  size='small'
                />
                <TextField
                  className='text-input'
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}
                  variant='outlined'
                  label='Confirm Password'
                  onChange={handleChangeConfirmNewPassword}
                  size='small'
                />
                {passwordErrorMsg && !isLoading &&
                  <div className='error-message-wrapper'>
                    <FiAlertCircle className='error-icon' />
                    <span className='error-message'>
                      {passwordErrorMsg}
                    </span>
                  </div>
                }
              </div>
              <div className='confirm-buttons-wrapper'>
                <button
                  className='cancel-btn'
                  onClick={clearEditingPassword}>Cancel</button>
                <button className='save-btn' onClick={updatePassword}>Save</button>
              </div>
            </div>
          }
        </div>
        {!editingPassword &&
          <FaEdit className='edit-icon' onClick={() => setEditingPassword(true)} />
        }
      </div>
      <div className='account-detail'>
        <div className='account-detail-inner'>
          <p className='label'>Account Created At</p>
          <p className='value'>{new Date(data?.createdAt).getMonth() + 1}
            /{new Date(data?.createdAt).getDate()}
            /{new Date(data?.createdAt).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails