import { MdOutlineSportsFootball } from 'react-icons/md'
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'
import './FourOFourPage.scss'

const FourOFourPage = () => {
  return (
    <div className='four-o-four-page'>
      <Nav />
      <main>
        <div className='four-o-four-page-inner'>
          <h1>4<MdOutlineSportsFootball className='football-icon' />4</h1>
          <h2>Page Not Found</h2>
          <div className='description-wrapper'>
            <p>We could not find the requested resource.</p>
          </div>
          <div className='rankings-link-wrapper'>
            <a className='rankings-link' href='/rankings'>Back to Rankings</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default FourOFourPage