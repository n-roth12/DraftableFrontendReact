import './Login.scss'
import LoginForm from '../../components/Auth/LoginForm'
import Nav from '../../components/Nav/Nav'

const Login = () => {

  return (
    <div className='login-page'>
      <Nav />
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login