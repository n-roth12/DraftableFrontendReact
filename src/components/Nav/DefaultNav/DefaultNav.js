import './DefaultNav.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import { logOut, selectCurrentToken, selectCurrentUser } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NavInfo from '../NavInfo/NavInfo'
import { FaAngleRight, FaUserAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const DefaultNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const email = useSelector(selectCurrentUser)
  const [atTop, setAtTop] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const [logout, {
    isLoading, 
    isSuccess,
    isError,
    error
  }] = useLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/login')
}, [isSuccess, navigate])

  window.addEventListener("scroll", () => {window.pageYOffset < 10 ? setAtTop(true) : setAtTop(false)})

  return (
    <header className={`default-nav${!atTop ? " shadow" : " no-shadow"}`}>
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
                  <Link 
                    className='profile-dropdown-link' 
                    to="/account">Account <FaAngleRight /></Link>
                  <button 
                    className='profile-dropdown-link' 
                    onClick={logout}>Logout <FaAngleRight /></button>
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