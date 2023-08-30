import Footer from "../../components/Footer/Footer"
import Nav from "../../components/Nav/Nav"
import { useParams } from "react-router-dom"

const DraftPage = () => {
  const { draftId } = useParams()
  return (
    <div className="draft-page">
      <Nav />
      <main>
        <div className="draft-page-inner">
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DraftPage