import './LoginPage.scss'
import LoginForm from '../LoginForm'
import Nav from '../../../components/Nav/Nav'

const LoginPage = () => {

  return (
    <div className='login-page'>
      <Nav />
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage