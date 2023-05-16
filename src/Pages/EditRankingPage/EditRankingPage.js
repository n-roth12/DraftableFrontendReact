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
import Draftable from '../../components/Draftable/Draftable'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [autoSave, setAutoSave] = useState(false)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()
  const [hasChanges, setHasChanges] = useState(false)
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
    players.forEach((element, index) => {
      if (element?.tier) {
        maxIndex = index
      }
    });
    setMaxTierIndex(maxIndex)
  }, [players])

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

  const deleteDraftable = (index) => {
    const player = players[index]
    const tier = player?.tier
    if (tier) {
      let playersCopy = players.filter(x => x?.tier !== tier)
      playersCopy.filter(x => x?.tier && x?.tier > tier).forEach(tier =>
        tier.tier -= 1
      )
      setPlayers(playersCopy)
    } else {
      const playersCopy = [...players]
      playersCopy.splice(index, 1)
      setPlayers(playersCopy)
    }
    setHasChanges(true)
  }

  const insertTier = (index) => {
    const playersCopy = [...players]
    const [reorderedItem] = [{
      "tier": players.filter(x => x?.tier).length + 2,
      "position": "ALL"
    }]
    playersCopy.splice(index, 0, reorderedItem)
    setPlayers(playersCopy)
    setShowAddTier(false)
    setHasChanges(true)
  }

  const cancelAddTier = () => {
    setShowAddTier(false)
  }

  const addRankings = (playerList) => {
    let playersListCopy = []
    let totalCount = 0
    let positionsCount = { "QB": 0, "RB": 0, "WR": 0, "TE": 0, "DST": 0 }
    playerList.forEach(player => {
      if (!player?.tier) {
        totalCount += 1
        positionsCount[player?.position] += 1
        playersListCopy.push({
          ...player,
          _rank: totalCount,
          _posRank: positionsCount[player?.position]
        })
      } else {
        playersListCopy.push(player)
      }
    })
    return playersListCopy
  }

  let content
  if (isDraftablesLoading) {
    content = <p>"Loading..."</p>
  } else if (isDraftablesSuccess) {
    content =
      <div className='drag-drop-rankings'>
        {players?.length > 0 ?
          <>
            <div className='draftable'>
              <div className="drag-icon-wrapper table-header">
              </div>
              <div className='rank-wrapper'>
                RANK
              </div>
              <div className='name-wrapper'>
                NAME
              </div>
              <div className='position-wrapper'>
                POS
              </div>
              <div className='team-wrapper'>
                TEAM
              </div>
              <div className='buttons-wrapper'>
              </div>
            </div>
            <Tier tier={{ "tier": 1, "position": "ALL" }} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="players">
                {(provided) => (
                  <section {...provided.droppableProps} ref={provided.innerRef} >
                    {addRankings(players).map((player, index) => (
                      <Draggable
                        key={player?.name || `${player?.position}-${player?.tier?.toString()}`}
                        draggableId={player?.name || `${player?.position}-${player?.tier?.toString()}`}
                        index={index}>
                        {(provided) => (
                          player?.tier ?
                            <Tier
                              index={index}
                              provided={provided}
                              tier={player}
                              onDelete={deleteDraftable}
                            />
                            :
                            <Draftable
                              provided={provided}
                              index={index}
                              player={player}
                              onDelete={deleteDraftable}
                              maxTierIndex={maxTierIndex}
                              insertTier={insertTier}
                              showAddTier={showAddTier}
                            />
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
        <div className='updated-wrapper'>
          <p>Last updated {new Date(customRanking.updatedAt).getMonth()}
            /{new Date(customRanking.updatedAt).getDate()}
            /{new Date(customRanking.updatedAt).getFullYear()}
          </p>
        </div>
        <div className='save-wrapper'>
          <div className='save-wrapper-inner'>
            <Switch
              checked={autoSave}
              onChange={handleChangeAutosave}
              size='small' />
            <p className='autosave-wrapper'>Autosave {autoSave ? "On" : "Off"}</p>
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
          <div className='add-tier-wrapper'>
            {!showAddTier ?
              <button
                className='add-tier-btn'
                onClick={() => setShowAddTier(true)}>Add Tier</button>
              :
              <button
                className='cancel-btn'
                onClick={cancelAddTier}>Cancel Add Tier</button>
            }
          </div>
        </div>
        {content}
      </div>
    </div>
  )
}

export default EditRankingPage