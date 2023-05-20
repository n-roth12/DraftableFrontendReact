import RegisterForm from '../../components/Auth/RegisterForm'
import Nav from '../../components/Nav/Nav'
import './Register.scss'

const Register = () => {

  return (
    <div className='register-page'>
      <Nav />
      <div className='register-form-wrapper form-wrapper'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register