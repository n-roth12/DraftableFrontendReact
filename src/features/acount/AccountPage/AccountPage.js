import './AccountPage.scss'
import Nav from '../../../components/Nav/Nav'
import AccountDetails from '../AccountDetails/AccountDetails'
import { useGetUserQuery } from '../accountSlice'
import { useLogoutMutation } from '../../auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { logOut } from '../../auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

const AccountPage = () => {
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
      <main>
        <div className='title-wrapper'>
          <h1>Account</h1>
          <button
            className='logout-btn'
            onClick={handleLogout}><FiLogOut /> Logout</button>
        </div>
        {content}
        <div className='delete-account-wrapper'>
          <button className='delete-account-btn'>Delete Account</button>
        </div>
      </main>
    </div>
  )
}

export default AccountPage