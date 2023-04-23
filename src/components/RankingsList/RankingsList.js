import './RankingsList.scss'
import { FaAngleRight } from 'react-icons/fa'

const RankingsList = () => {
  return (
    <div className='rankings-list'>
      <div className='col-labels'>
        <p></p>
        <p>Title</p>
        <p>Last Updated</p>
      </div>
      <div className='row'>
        <input type="checkbox"></input>
        <div className='rankings-title-wrapper'>
          <p className='rankings-title'>PPR Rankings</p>
          <div className='rankings-details'>
            <p>NFL 2023</p>
            <p>197 Players</p>
          </div>
        </div>
        <p className='last-update'>20 April 2023</p>
      </div>
      <div className='row'>
        <input type="checkbox"></input>
        <div className='rankings-title-wrapper'>
          <p className='rankings-title'>Half-PPR Rankings</p>
          <div className='rankings-details'>
            <p>NFL 2023</p>
            <p>197 Players</p>
          </div>
        </div>
        <p className='last-update'>16 April 2023</p>
      </div>
    </div>
  )
}

export default RankingsList