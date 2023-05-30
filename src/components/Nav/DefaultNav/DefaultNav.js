import './DefaultNav.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import { logOut, selectCurrentToken, selectCurrentUser } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NavInfo from '../NavInfo/NavInfo'
import { FaUserAlt } from 'react-icons/fa'
import { useState } from 'react'

const DefaultNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const email = useSelector(selectCurrentUser)
  const [logout] = useLogoutMutation()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

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
              <div 
                className='profile-dropdown' 
                onMouseOver={() => setShowProfileDropdown(true)} 
                onMouseLeave={() => setShowProfileDropdown(false)}>
                <FaUserAlt className='user-icon nav-link' />
                <div className={`${!showProfileDropdown ? "hidden" : "dropdown-content"}`}>
                  <p className='user-email'>{email}</p>
                  <a href="/profile">Profile</a>
                  <a href="" onClick={handleLogout}>Logout</a>
                </div>
              </div>
              :
              <Link className='nav-link nav-link-outline' to='/login'>Login</Link>
            }
          </div>
        }
      </nav>
      <NavInfo />
    </header>
  )
}

export default DefaultNav