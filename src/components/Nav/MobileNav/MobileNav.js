import './MobileNav.scss'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCurrentToken, logOut } from '../../../features/auth/authSlice'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'

const MobileNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")
  const [menuClass, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [logout] = useLogoutMutation()

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    } else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }

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
    <header className='mobile-nav'>
      <nav>
        <img onClick={() => navigate('/')} src="/draftabl_word_blue.svg" alt="image" />
        <div className='burger-menu' onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </nav>

      <div className={menuClass} onClick={updateMenu}>
        <Link className='mobile-nav-link' to={`/rankings`}>Rankings <FaAngleRight /></Link>
        <Link className='mobile-nav-link' to={`/custom`}>Custom <FaAngleRight /></Link>
        {token ?
          <a className='mobile-nav-link' onClick={handleLogout}>Logout <FaAngleRight /></a>
          :
          <Link className='mobile-nav-link' to={`/login`}>Login <FaAngleRight /></Link>
        }  
      </div>
    </header>
  )
}

export default MobileNav