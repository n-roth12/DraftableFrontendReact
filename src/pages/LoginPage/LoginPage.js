import './LoginPage.scss'
import LoginForm from '../../features/auth/LoginForm'
import Nav from '../../components/Nav/Nav'
import { Helmet } from 'react-helmet'

const LoginPage = () => {

  return (
    <div className='login-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Draftabl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Helmet>
      <Nav />
      <div className='auth-wrapper'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage