import './AccountPage.scss'
import { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav'
import AccountDetails from '../../features/acount/AccountDetails/AccountDetails'
import { useGetUserQuery } from '../../features/acount/accountSlice'
import { useLogoutMutation } from '../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { logOut } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import DeleteAccountDialog from '../../components/Dialogs/DeleteAccountDialog/DeleteAccountDialog'
import Helmet from "react-helmet"
import Footer from '../../components/Footer/Footer'
import LoadingBlock from '../../components/Loading/LoadingBlock/LoadingBlock'

const AccountPage = () => {
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery()

  const [logout, {
    isLoadingLogout, 
    isSuccessLogout,
    isErrorLogout,
    errorLogout
  }] = useLogoutMutation()

  useEffect(() => {
    if (isSuccessLogout) navigate('/login')
}, [isSuccessLogout, navigate])

  let content
  if (isLoading) {
    content = <LoadingBlock />
  } else if (isSuccess) {
    content = <AccountDetails data={data} />
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="account-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account | Draftabl</title>
      </Helmet>
      <Nav />
      <DeleteAccountDialog
        open={showDeleteAccountDialog}
        onClose={() => setShowDeleteAccountDialog(false)} />
      <main>
        <div className='title-wrapper'>
          <h1>Account</h1>
          <button
            className='logout-btn'
            onClick={logout}><FiLogOut /> Logout</button>
        </div>
        {content}
        <div className='delete-account-wrapper'>
          <button className='delete-account-btn' onClick={() => setShowDeleteAccountDialog(true)}>Delete Account</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AccountPage