import './EditRankingPage.scss'
import Nav from '../../components/Nav/Nav'
import { useParams } from 'react-router-dom'
import { useGetCustomRankingByIdQuery, useGetCustomRankingById2Query } from '../../features/rankings/customRankingsApiSlice'
import Rankings from '../../components/Rankings/Rankings'
import { FaEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useUpdateCustomRankingMutation } from '../../features/rankings/customRankingsApiSlice'
import { Switch } from '@mui/material'
import DragDropRankings from '../../components/DragDropRankings/DragDropRankings'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../../features/helpers/StrictModeDroppable'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [autoSave, setAutoSave] = useState(false)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()

  const {
    data: draftables,
    isLoading: isDraftablesLoading,
    isSuccess: isDraftablesSuccess,
    isError: isDraftablesError,
    error: draftablesError
  } = useGetCustomRankingById2Query(rankingId)

  const [players, setPlayers] = useState(draftables || [])

  useEffect(() => {
    // const arrayIdsOrder = JSON.parse(localStorage.getItem('playersOrder'))
    // if (!arrayIdsOrder && draftables?.length) {
    //   const arrayIdsOrder = draftables.map(player => player._id)
    //   localStorage.setItem('playersOrder', JSON.stringify(arrayIdsOrder))
    // }

    // let myArray
    // if (arrayIdsOrder?.length && draftables?.length) {
    //   myArray = arrayIdsOrder.map(pos => {
    //     return draftables.find(x => x._id === pos)
    //   })
    //   const newItems = draftables.filter(el => {
    //     return !arrayIdsOrder.includes(el._id)
    //   })
      
    //   if (newItems?.length) myArray = [ ...newItems, ...myArray ]


    setPlayers(draftables)
  }, [draftables])

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

  const updateRankingTitle = (title) => {
    updateCustomRanking({
      title: title,
      id: customRanking._id
    })
  }

  const [newTitle, setNewTitle] = useState(customRanking?.title ? customRanking.title : '')

  useEffect(() => {
    setNewTitle(customRanking?.title && customRanking.title)
  }, [customRanking])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const playersCopy = [...players]
    const [reorderedItem] = playersCopy.splice(result.source.index, 1)
    playersCopy.splice(result.destination.index, 0, reorderedItem)
    // const idsOrderArray = players.map(x => x._id)
    // localStorage.setItem('playersOrder', JSON.stringify(idsOrderArray))
    setPlayers(playersCopy)
    if (autoSave) {
      updateCustomRanking({
        rankings: playersCopy,
        id: customRanking._id
      })
    }
  }

  const handleDelete = (id) => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem('playersOrder'))
    if (arrayIdsOrder?.length) {
      const newIdsOrderArray = arrayIdsOrder.filter(num => num !== id)
      localStorage.setItem('playersOrder', JSON.stringify(newIdsOrderArray))
    }
    // deleteDraftablMutation(id)
  }

  let content
  if (isDraftablesLoading) {
    content = <p>"Loading..."</p>
  } else if (isDraftablesSuccess) {
    content =
      <div className='drag-drop-rankings'>
        {players?.length > 0 ?
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="players">
              {(provided) => (
                <section {...provided.droppableProps} ref={provided.innerRef} >
                  {players.map((player, index) => (
                    <Draggable key={player?.name} draggableId={player?.name} index={index} >
                      {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='draggable'>{player.rank} {player.name} {player.position} {player.team}</div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          </DragDropContext>
          :
          <p>No players</p>
        }
      </div>
  } else if (isDraftablesError) {
    content = <p>{JSON.stringify(draftablesError)}</p>
  }

  const saveRanking = () => {
    if (newTitle) {
      updateRanking(newTitle, customRanking.rankings)
    }
    setEditingTitle(false)
  }

  const handleChangeAutosave = () => {
    setAutoSave(!autoSave)
  }

  const cancelChangeTitle = () => {
    setNewTitle(customRanking.title)
    setEditingTitle(false)
  }

  const handleChangeNewTitle = (e) => setNewTitle(e.target.value)

  return (
    <div className='edit-ranking-page'>
      <Nav />
      <div className='title-wrapper'>
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
            <span>{customRanking?.title}</span>
            <span>
              <FaEdit
                className='edit-btn'
                onClick={() => setEditingTitle(true)} />
            </span>
          </>
        }
      </div>
      <div className='autosave-switch-wrapper'>
        <Switch
          checked={autoSave}
          onChange={handleChangeAutosave}
          size='small' />
        <span>Autosave {autoSave ? "On" : "Off"}</span>
      </div>
      {!autoSave &&
        <div className='save-button-wrapper'>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      }
      {content}
    </div>
  )
}

export default EditRankingPage