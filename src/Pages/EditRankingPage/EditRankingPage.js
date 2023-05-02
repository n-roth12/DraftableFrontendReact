import './EditRankingPage.scss'
import Nav from '../../components/Nav/Nav'
import { useParams } from 'react-router-dom'

const EditRankingPage = () => {
  const { raningId } = useParams()
  
  return (
    <div className='edit-ranking-page'>
        <Nav />
    </div>
  )
}

export default EditRankingPage