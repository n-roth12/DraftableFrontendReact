import './EditRankingPage.scss'
import Nav from '../../components/Nav/Nav'
import { useParams } from 'react-router-dom'
import { useGetCustomRankingByIdQuery } from '../../features/rankings/customRankingsApiSlice'
import Rankings from '../../components/Rankings/Rankings'
import { FaEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useUpdateCustomRankingMutation } from '../../features/rankings/customRankingsApiSlice'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()

  const {
    data: customRanking,
    isLoading: isRankingLoading,
    isSuccess: isRankingSuccess,
    isError: isRankingError,
    error: rankingError
  } = useGetCustomRankingByIdQuery(rankingId)

  const updateRanking = (title, rankings) => {
    updateCustomRanking({
      title: title,
      rankings: rankings,
      id: customRanking._id
    })
    setNewTitle(title)
  }

  const [newTitle, setNewTitle] = useState(customRanking?.title ? customRanking.title : '')

  useEffect(() => {
    setNewTitle(customRanking?.title && customRanking.title)
  }, [customRanking])

  let content
  if (isRankingLoading) {
    content = <p>"Loading..."</p>
  } else if (isRankingSuccess) {
    content = <Rankings players={customRanking} />
  } else if (isRankingError) {
    content = <p>{JSON.stringify(rankingError)}</p>
  }

  const saveRanking = () => {
    if (newTitle) {
      updateRanking(newTitle, customRanking.rankings)
    }
    setEditingTitle(false)
  }

  const cancelChangeTitle = () => {
    setNewTitle(customRanking.title)
    setEditingTitle(false)
  }

  const handleChangeNewTitle = (e) => setNewTitle(e.target.value)

  return (
    <div className='edit-ranking-page'>
      <Nav />
      <p className='title-wrapper'>
        <span>Title: </span>
        {editingTitle ?
          <>
          <input
            type="text"
            className='dialog-input-text'
            onChange={handleChangeNewTitle}
            value={newTitle}
          />
          <button onClick={cancelChangeTitle}>Cancel</button>
          <button onClick={() => saveRanking()}>Save</button>
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