import './EditRankingPage.scss'
import Nav from '../../components/Nav/Nav'
import { useParams } from 'react-router-dom'
import { useGetCustomRankingByIdQuery } from '../../features/rankings/customRankingsApiSlice'
import Rankings from '../../components/Rankings/Rankings'
import { FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import EditCustomRankingDialog from '../../components/Dialogs/EditCustomRankingDialog/EditCustomRankingDialog'
import { TextField } from '@mui/material'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)

  const {
    data: customRanking,
    isLoading: isRankingLoading,
    isSuccess: isRankingSuccess,
    isError: isRankingError,
    error: rankingError
  } = useGetCustomRankingByIdQuery(rankingId)

  let content
  if (isRankingLoading) {
    content = <p>"Loading..."</p>
  } else if (isRankingSuccess) {
    content = <Rankings players={customRanking} />
  } else if (isRankingError) {
    content = <p>{JSON.stringify(rankingError)}</p>
  }

  return (
    <div className='edit-ranking-page'>
      <Nav />
      {/* <EditCustomRankingDialog 
          open={editingTitle}
          onClose={() => setEditingTitle(false)}/> */}
      <p className='title-wrapper'>
        <span>Title: </span>
        {editingTitle ?
          <>
          <input
            type="text"
            className='dialog-input-text'
            onChange={(e) => console.log(e.target.value)}
            value={customRanking.title}
          />
          <button onClick={() =>  setEditingTitle(false)}>Cancel</button>
          <button>Save</button>
          </>
          :
          <>
            <span>{customRanking && customRanking.title}</span>
            <span>
              <FaEdit
                className='edit-btn'
                onClick={() => setEditingTitle(true)} />
            </span>
          </>
        }
      </p>
      {content}
    </div>
  )
}

export default EditRankingPage