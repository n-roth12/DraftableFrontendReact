import './Login.scss'
import LoginForm from '../../components/Auth/LoginForm'
import Nav from '../../components/Nav/Nav'

const Login = ({ isDarkMode, setIsDarkMode }) => {

  return (
    <div className='login-page'>
      <Nav />
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
      <input type="checkbox" id="color-mode-selector" name="color-mode-selector" 
        checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}></input>
    </div>
  )
}

export default Login