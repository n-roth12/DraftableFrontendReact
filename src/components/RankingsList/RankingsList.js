import './RankingsList.scss'
import { FaAngleRight } from 'react-icons/fa'

const RankingsList = () => {
  return (
    <div className='rankings-list'>
      <div className='row col-labels'>
        <p></p>
        <p>Title</p>
        <p>Last Updated</p>
      </div>
      <div className='row'>
        <input type="checkbox"></input>
        <p>PPR Rankings</p>
        <p>20 April 2023</p>
      </div>
      <div className='row'>
        <input type="checkbox"></input>
        <p>Half-PPR Rankings</p>
        <FaAngleRight className='arrow-icon' />
        <p>16 April 2023</p>
      </div>
    </div>
  )
}

export default RankingsList