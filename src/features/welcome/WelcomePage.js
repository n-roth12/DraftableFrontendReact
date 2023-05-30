import './WelcomePage.scss'
import Nav from "../../components/Nav/Nav"

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <Nav />
      <main>
        <h1>Welcome</h1>
        <p>Stay ahead of your league-mates with our easily customizable player rankings.</p>
        <div>
          <div>
            <p>Create and customize your own tiered player rankings.</p>
          </div>
          <div>
            <p>View our draft rankings for different scoring formats.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WelcomePage