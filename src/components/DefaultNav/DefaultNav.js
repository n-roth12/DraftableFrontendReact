import './DefaultNav.scss'
import { Link, useNavigate } from 'react-router-dom'

const DefaultNav = () => {
  const navigate = useNavigate()

  return (
    <header className='default-nav'>
      <nav>
        <img onClick={() => navigate('/')} src="/Draftabl_black_outlined.png" alt="image" />
        {!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register") &&
          <div className='nav-links'>
            <Link className='nav-link' to='/rankings'>Rankings</Link>
            <Link className='nav-link' to='/custom'>Customize</Link>
            <Link className='nav-link' to='/login'>Logout</Link>
          </div>
        }
      </nav>
    </header>
  )
}

export default DefaultNav