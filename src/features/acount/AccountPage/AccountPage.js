import './AccountPage.scss'
import { useState } from 'react'
import Nav from '../../../components/Nav/Nav'
import AccountDetails from '../AccountDetails/AccountDetails'
import { useGetUserQuery } from '../accountSlice'
import { useLogoutMutation } from '../../auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { logOut } from '../../auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import DeleteAccountDialog from '../../../components/Dialogs/DeleteAccountDialog/DeleteAccountDialog'

const AccountPage = () => {
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(logOut())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <AccountDetails data={data} />
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="account-page">
      <Nav />
      <DeleteAccountDialog  
        open={showDeleteAccountDialog} 
        onClose={() => setShowDeleteAccountDialog(false)} />
      <main>
        <div className='title-wrapper'>
          <h1>Account</h1>
          <button
            className='logout-btn'
            onClick={handleLogout}><FiLogOut /> Logout</button>
        </div>
        {content}
        <div className='delete-account-wrapper'>
          <button className='delete-account-btn' onClick={() => setShowDeleteAccountDialog(true)}>Delete Account</button>
        </div>
      </main>
    </div>
  )
}

export default AccountPage