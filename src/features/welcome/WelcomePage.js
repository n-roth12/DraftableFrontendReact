import './WelcomePage.scss'
import Nav from "../../components/Nav/Nav"
import Footer from '../../components/Footer/Footer'
import { FaArrowRight, FaListOl } from 'react-icons/fa'
import { TbDragDrop, TbDatabaseExport } from 'react-icons/tb'
import { BiCrown } from 'react-icons/bi'
import { MdCompareArrows } from 'react-icons/md'
import { ImStatsDots } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fantasy Football Draft Tools | Draftabl</title>
        <meta name='description' content="Dominate your fantasy football draft with Draftabl's free draft tools.
          Create cheat sheets, customize your rankings with tiers, and view expert draft 
          rankings aggregated from across the industry." />
      </Helmet>
      <Nav />
      <section className='hero'>
        <div className='hero-inner'>
          <h1>Tools for your <br />Fantasy Football Draft</h1>
          <p className='hero-description'>Stay ahead of your league-mates with our easily customizable player rankings.</p>
          <Link
            className='hero-btn'
            to="/custom"
          >Start now <FaArrowRight className='arrow' /></Link>
        </div>
      </section>
      <main>
        <div className='features-section'>
          <section className='features-list'>
            <h2>Current Features</h2>
            <div className='features'>
              <ul>
                <li className='feature'><TbDragDrop className='icon' /> Drag-and-drop + click-and-type to rerank</li>
                <li className='feature'><BiCrown className='icon' /> Custom positional and overall tiers</li>
                <li className='feature'><FaListOl className='icon' /> Create and save multiple rankings</li>
              </ul>
            </div>
          </section>
          <section className='features-list'>
            <h2>Upcoming Features</h2>
            <div className='features'>
              <ul>
                <li className='feature'><TbDatabaseExport className='icon' /> Import and export rankings</li>
                <li className='feature'><MdCompareArrows className='icon' /> Compare rankings against each other</li>
                <li className='feature'><ImStatsDots className='icon' /> Trends in expert ranking changes</li>
              </ul>
            </div>
          </section>
        </div>
        <div className='btns-section'>
          <section className='btns'>
            <Link
              to="/register"
              className='register-btn btn'>Sign up <FaArrowRight className='arrow' />
            </Link>
            <Link
              to="/rankings"
              className='rankings-btn btn'>View Rankings <FaArrowRight className='arrow' />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default WelcomePage