import './DefaultNav.scss'
import { Link, useNavigate } from 'react-router-dom'

const DefaultNav = () => {
  const navigate = useNavigate()

  return (
    <header className='default-nav'>
      <nav>
        <h1 onClick={() => navigate('/')}>Draftabl</h1>
        <div className='nav-links'>
          <Link className='nav-link' to='/rankings'>Rankings</Link>
          <Link className='nav-link' to='/custom'>Customize</Link>
        </div>
      </nav>
    </header>
  )
}

export default DefaultNav