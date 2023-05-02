import './CustomRankingsList.scss'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useState } from 'react'
import { useDeleteCustomRankingMutation } from '../../features/rankings/customRankingsApiSlice'
import { useNavigate } from 'react-router-dom'

const RankingsList = ({ rankings }) => {
  const navigate = useNavigate()
  const [showOptionsDropdown, setShowOptionsDropdown] = useState('')

  const [deleteCustomRanking] = useDeleteCustomRankingMutation()

  return (
    <div className='custom-rankings-list'>
      <div className='col-labels'>
        <p></p>
        <p>Title</p>
        <p>Last Updated</p>
      </div>
      {rankings.map(ranking =>
        <div className='row'>
          <div className='dropdown' 
            onClick={() => setShowOptionsDropdown(ranking._id)} 
            onMouseLeave={() => setShowOptionsDropdown('')}>
            <HiDotsHorizontal className='rankings-options-btn' />
            <div className={`${showOptionsDropdown !== ranking._id ? "hidden" : "dropdown-content"}`}>
              <button onClick={() => navigate(`/custom/${ranking._id}`)}>Edit</button>
              <button>Export</button>
              <button onClick={() => deleteCustomRanking({ id: ranking._id })}>Delete</button>
            </div>
          </div>
          <div className='rankings-title-wrapper'>
            <p className='rankings-title'>{ranking.title}</p>
            <div className='rankings-details'>
              <p>{ranking.league} {ranking.year}</p>
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