import './DefaultNav.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import { logOut, selectCurrentToken } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const DefaultNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(logOut())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header className='default-nav'>
      <nav>
        <img onClick={() => navigate('/rankings')} src="/draftabl_word_blue.svg" alt="image" />
        {!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register") &&
          <div className='nav-links'>
            <Link className='nav-link' to='/rankings'>Rankings</Link>
            <Link className='nav-link' to='/custom'>Custom</Link>
            {token ? 
              <button className='nav-link' onClick={handleLogout}>Logout</button>
            :
              <Link className='nav-link nav-link-outline' to='/login'>Login</Link>
            }
          </div>
        }
      </nav>
    </header>
  )
}

export default DefaultNav