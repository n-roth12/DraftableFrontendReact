import './MobileNav.scss'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCurrentToken, logOut, selectCurrentUser } from '../../../features/auth/authSlice'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import NavInfo from '../NavInfo/NavInfo'

const MobileNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const email = useSelector(selectCurrentUser)
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")
  const [menuClass, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [logout] = useLogoutMutation()
  const [atTop, setAtTop] = useState(true)

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

  window.addEventListener("scroll", () => { window.pageYOffset < 10 ? setAtTop(true) : setAtTop(false) })

  return (
    <header className={`mobile-nav${!atTop ? " shadow" : " no-shadow"}`}>
      <nav>
        <img onClick={() => navigate('/')} src="/draftabl_word_blue_2.svg" alt="image" />
        <div className='burger-menu' onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </nav>

      {!isMenuClicked &&
        <NavInfo />
      }

      <div className={menuClass} onClick={updateMenu}>
        <Link className='mobile-nav-link' to={`/rankings`}>Rankings <FaAngleRight /></Link>
        <Link className='mobile-nav-link' to={`/custom`}>Custom <FaAngleRight /></Link>
        {token ?
          <>
            <Link className='mobile-nav-link' to={`/account`}>Account <FaAngleRight /></Link>
            <a className='mobile-nav-link' onClick={handleLogout}>Logout <FaAngleRight /></a>
          </>
          :
          <Link className='mobile-nav-link' to={`/login`}>Login <FaAngleRight /></Link>
        }
      </div>
    </header>
  )
}

export default MobileNav