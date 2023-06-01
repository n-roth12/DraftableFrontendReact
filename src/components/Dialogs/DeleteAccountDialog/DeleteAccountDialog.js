import { useState } from "react"
import '../Dialog.scss'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { FiAlertCircle } from "react-icons/fi"
import { TextField } from '@mui/material'
import { useDeleteUserMutation } from "../../../features/acount/accountSlice"

const DeleteAccountDialog = ({ open, onClose }) => {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  const handleChangePassword = (e) => setPassword(e.target.value)

  const onCloseWrapper = () => {
    onClose()
    setPassword('')
    setErrorMessage('')
  }

  const deleteAccount = async (pwd) => {
    if (!pwd?.length) {
      setErrorMessage('Password is required!')
      return
    }
    try {
      await deleteUser({ password: pwd }).unwrap()
    } catch (err) {
      if (!err?.originalStatus && !err?.status) {
        setErrorMessage('No server response!')
      } else if (err?.originalStatus === 401) {
        setErrorMessage('Incorrect password!')
      } else {
        setErrorMessage('Could not delete account!')
      }
    }
  }

  return (
    <Dialog disableEnforceFocus open={open} className="dialog">
      <DialogTitle className='dialog-title'>
        Delete Account
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <p className='description'>Are you sure you would like to delete your account?</p>
        <div className='dialog-input'>
          <label>Enter password to continue</label>
          <TextField
            className='dialog-input-text'
            size='small'
            type="password"
            onChange={handleChangePassword}
          />
        </div>
        {errorMessage && !isLoading &&
          <div className='error-message-wrapper'>
            <FiAlertCircle className='error-icon' />
            <span className='error-message'>
              {errorMessage}
            </span>
          </div>
        }
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <button className='cancel-btn' onClick={onCloseWrapper}>Cancel</button>
        <button
          className='delete-btn'
          onClick={() => deleteAccount(password)}>Delete
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountDialog