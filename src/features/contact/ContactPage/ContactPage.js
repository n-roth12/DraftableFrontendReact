import './ContactPage.scss'
import Nav from '../../../components/Nav/Nav'
import Footer from '../../../components/Footer/Footer'
import { Helmet } from 'react-helmet'
import ContactForm from '../ContactForm/ContactForm'

const ContactPage = () => {
  return (
    <div className='contact-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact | Draftabl</title>
      </Helmet>
      <Nav />
      <main>
        <h1>Contact</h1>
        <p className='description'>Thank you for using Draftabl! Please report any issues or bugs here. 
          If there are features you would like to see in the future, you can submit 
          requests as well. Any constructive feedback is much appreciated!
        </p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage