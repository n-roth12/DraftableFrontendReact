import './ContactForm.scss'
import { TextField, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { Ellipsis } from 'react-awesome-spinners'
import { selectCurrentUser } from '../../auth/authSlice'
import { useSelector } from 'react-redux'

const ContactForm = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userEmail = useSelector(selectCurrentUser)

  useEffect(() => {
    setEmail(userEmail)
  }, [userEmail])

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangeSubject = (e) => setSubject(e.target.value)
  const handleChangeBody = (e) => setBody(e.target.body)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !subject || !body) {
      return 
    }
  }

  return (
    <form className='contact-form'>
      <TextField
        className='input'
        variant='outlined'
        label={userEmail ? userEmail : 'Enter Email'}
        onChange={handleChangeEmail}
        size='medium'
        disabled={userEmail ? true : false}
      />
      <TextField
        className="input"
        id="subject"
        select
        label="Subject"
        value={subject}
        size="medium"
        onChange={handleChangeSubject}>
        {["Issue / Bug", "Feedback", "Request", "Help"].map((x) => (
          <MenuItem key={x} value={x}>
            {x}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className='input'
        variant='outlined'
        label='Enter Body (max 500 characters)'
        onChange={handleChangeBody}
        multiline
        rows={3}
        size='medium'
      />
      <button type='button'
        className='submit-btn'
        onClick={handleSubmit}>{isLoading ? <Ellipsis /> : "Submit"}</button>
    </form>
  )
}

export default ContactForm