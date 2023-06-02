import './LoginPage.scss'
import LoginForm from '../LoginForm'
import Nav from '../../../components/Nav/Nav'
import { Helmet } from 'react-helmet'

const LoginPage = () => {

  return (
    <div className='login-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Draftabl</title>
      </Helmet>
      <Nav />
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage