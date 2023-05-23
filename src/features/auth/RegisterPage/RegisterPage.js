import RegisterForm from '../RegisterForm'
import Nav from '../../../components/Nav/Nav'

const RegisterPage = () => {

  return (
    <div className='register-page'>
      <Nav />
      <div className='register-form-wrapper form-wrapper'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage