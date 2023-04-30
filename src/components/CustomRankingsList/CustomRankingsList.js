import './CustomRankingsList.scss'
import { HiDotsHorizontal } from 'react-icons/hi'

const RankingsList = ({ rankings }) => {
  return (
    <div className='custom-rankings-list'>
      <div className='col-labels'>
        <p></p>
        <p>Title</p>
        <p>Last Updated</p>
      </div>
      {rankings.map(ranking =>
        <div className='row'>
          <HiDotsHorizontal className='rankings-options-btn' />
          <div className='rankings-title-wrapper'>
            <p className='rankings-title'>{ranking.title}</p>
            <div className='rankings-details'>
              <p>NFL 2023</p>
              <p>{ranking.rankings.length} Players</p>
            </div>
          </div>
          <p className='last-update'>{ranking.updatedAt}</p>
        </div>
      )}
    </div>
  )
}

export default RankingsList