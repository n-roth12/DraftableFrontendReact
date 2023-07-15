import './Footer.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer>
      <div className='footer-inner'>
        <img
          className='footer-logo'
          onClick={() => navigate('/rankings')}
          src="/draftabl_word_blue_2.svg"
          alt="image" />
        <div className='footer-links'>
          <Link className='footer-link' to="/">About</Link>
          <Link className='footer-link' to="/account">Account</Link>
          <Link className='footer-link' to="/contact">Contact</Link>
          {/* <Link className='footer-link' to="">Terms of Use</Link>
          <Link className='footer-link' to="">Privacy Policy</Link> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer