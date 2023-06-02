import RegisterForm from '../RegisterForm'
import Nav from '../../../components/Nav/Nav'
import { Helmet } from 'react-helmet'

const RegisterPage = () => {

  return (
    <div className='register-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up | Draftabl</title>
      </Helmet>
      <Nav />
      <div className='register-form-wrapper form-wrapper'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage