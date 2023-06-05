import RegisterForm from '../RegisterForm'
import Nav from '../../../components/Nav/Nav'
import { Helmet } from 'react-helmet'

const RegisterPage = () => {

  return (
    <div className='register-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up | Draftabl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Helmet>
      <Nav />
      <div className='register-form-wrapper form-wrapper'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage