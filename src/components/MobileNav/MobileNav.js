import './MobileNav.scss'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'

const MobileNav = () => {
  const navigate = useNavigate()
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")
  const [menuClass, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)

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

  const logout = () => {
    console.log("log out")
  }

  return (
    <header className='mobile-nav'>
      <nav>
        <img onClick={() => navigate('/')} src="/Draftabl_word_white.png" alt="image" />
        <div className='burger-menu' onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </nav>

      <div className={menuClass} onClick={updateMenu}>
        <Link className='mobile-nav-link' to={`/rankings`}>Rankings <FaAngleRight /></Link>
        <Link className='mobile-nav-link' to={`/customize`}>Customize <FaAngleRight /></Link>
        <Link className='mobile-nav-link' to={`/login`}>Logout <FaAngleRight /></Link>
      </div>
    </header>
  )
}

export default MobileNav