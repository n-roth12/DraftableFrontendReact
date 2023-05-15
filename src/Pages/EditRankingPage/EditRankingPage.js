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
import PositionFilter from '../../components/PositionFilter/PositionFilter'
import Search from '../../components/Search/Search'
import Tier from '../../components/Tier/Tier'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [autoSave, setAutoSave] = useState(false)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()
  const [hasChanges, setHasChanges] = useState(false)
  const [posFilter, setPosFilter] = useState('ALL')
  const [showAddTier, setShowAddTier] = useState(false)
  const [maxTierIndex, setMaxTierIndex] = useState()

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

  useEffect(() => {
    if (!players?.length) return
    let maxIndex = 0
    players.filter(x => posFilter === "ALL" || x?.position === posFilter).forEach((element, index) => {
      if (element?.tier) {
        maxIndex = index
      }
    });
    setMaxTierIndex(maxIndex)
  }, [players, posFilter])

  const [newTitle, setNewTitle] = useState(customRanking?.title ? customRanking.title : '')

  useEffect(() => {
    setNewTitle(customRanking?.title && customRanking.title)
  }, [customRanking])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return
    const player = players[(result.source.index)]
    if (player?.tier) {
      if (result.source.index > result.destination.index) {
        const temp = players.slice(result.destination.index, result.source.index)
        if (temp.find(x => x?.tier)) return
      } else if (result.source.index < result.destination.index) {
        const temp = players.slice(result.source.index + 1, result.destination.index + 1)
        if (temp.find(x => x?.tier)) return
      }
    }
    const playersCopy = [...players]
    const [reorderedItem] = playersCopy.splice(result.source.index, 1)
    playersCopy.splice(result.destination.index, 0, reorderedItem)
    setPlayers(playersCopy)
    if (autoSave) {
      updateCustomRanking({
        rankings: playersCopy,
        id: customRanking._id
      })
    } else {
      setHasChanges(true)
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

  const insertTier = (index) => {
    const playersCopy = [...players]
    const [reorderedItem] = [{
      "tier": players.filter(x => x?.tier).length + 2,
      "position": posFilter
    }]
    playersCopy.splice(index, 0, reorderedItem)
    setPlayers(playersCopy)
    setShowAddTier(false)
  }

  const cancelAddTier = () => {
    setShowAddTier(false)
  }

  let content
  if (isDraftablesLoading) {
    content = <p>"Loading..."</p>
  } else if (isDraftablesSuccess) {
    content =
      <div className='drag-drop-rankings'>
        {players?.length > 0 ?
          <>
            <Tier tier={{ "tier": 1, "position": posFilter }} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="players">
                {(provided) => (
                  <section {...provided.droppableProps} ref={provided.innerRef} >
                    {players.map((player, index) => (
                      <Draggable key={player?.name || `${player?.position}-${player?.tier?.toString()}`} draggableId={player?.name || `${player?.position}-${player?.tier?.toString()}`} index={index} >
                        {(provided) => (
                          player?.tier ?
                            <Tier provided={provided} tier={player} />
                            :
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className='draftable'>{player.rank} {player.name} {player.position} {player.team} {showAddTier && index > maxTierIndex ? <button onClick={() => insertTier(index)}>Insert Tier</button> : ""}
                            </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </section>
                )}
              </Droppable>
            </DragDropContext>
          </>
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

  const setPosFilterWrapper = (x) => {
    setShowAddTier(false)
    setPosFilter(x)
  }

  const handleChangeNewTitle = (e) => setNewTitle(e.target.value)

  const cancelEdit = () => {
    setPlayers(draftables)
    setHasChanges(false)
    setShowAddTier(false)
  }

  const saveEdit = () => {
    updateCustomRanking({
      id: customRanking._id,
      rankings: players
    })
    setHasChanges(false)
  }

  return (
    <div className='edit-ranking-page'>
      <Nav />
      <div className='content'>
        <div className='title-wrapper'>
          {editingTitle ?
            <>
              <input
                type="text"
                className='dialog-input-text'
                onChange={handleChangeNewTitle}
                value={newTitle}
              />
              <button className='submit-btn' onClick={() => saveRanking()}>Save</button>
              <button className='cancel-btn' onClick={cancelChangeTitle}>Cancel</button>
            </>
            :
            <>
              <h1>{customRanking?.title}</h1>
              <span>
                <FaEdit
                  className='edit-btn'
                  onClick={() => setEditingTitle(true)} />
              </span>
            </>
          }
        </div>
        <div className='save-wrapper'>
          <Switch
            checked={autoSave}
            onChange={handleChangeAutosave}
            size='small' />
          <span className='autosave-wrapper'>Autosave {autoSave ? "On" : "Off"}</span>
          {!autoSave &&
            <>
              <button
                className={`cancel-btn${!hasChanges ? ' disabled' : ''}`}
                onClick={cancelEdit}
                disabled={!hasChanges}>Cancel</button>
              <button
                className={`submit-btn${!hasChanges ? ' disabled' : ''}`}
                onClick={saveEdit}
                disabled={!hasChanges}>Save</button>
            </>
          }
        </div>
        <PositionFilter
          positions={["QB", "RB", "WR", "TE", "DST"]}
          onChange={setPosFilterWrapper}
          selectedPos={posFilter} />
        {!showAddTier ?
          <button
            className='add-tier-btn'
            onClick={() => setShowAddTier(true)}>Add Tier</button>
          :
          <button
            className='cancel-btn'
            onClick={cancelAddTier}>Cancel Add Tier</button>
        }
        {content}
      </div>
    </div>
  )
}

export default EditRankingPage