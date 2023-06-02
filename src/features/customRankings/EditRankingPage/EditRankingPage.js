import './EditRankingPage.scss'
import Nav from '../../../components/Nav/Nav'
import Footer from "../../../components/Footer/Footer"
import { useParams } from 'react-router-dom'
import { useGetCustomRankingByIdQuery, useGetCustomRankingById2Query } from '../customRankingsApiSlice'
import { FaEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useUpdateCustomRankingMutation } from '../customRankingsApiSlice'
import { Switch } from '@mui/material'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../../helpers/StrictModeDroppable'
import Tier from '../Tier/Tier'
import Draftable from '../Draftable/Draftable'
import PositionFilter from '../../../components/PositionFilter/PositionFilter'
import Helmet from "react-helmet"

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [autoSave, setAutoSave] = useState(false)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()
  const [hasChanges, setHasChanges] = useState(false)
  const [showAddTier, setShowAddTier] = useState(false)
  const [maxTierIndex, setMaxTierIndex] = useState()
  const [editingIndex, setEditingIndex] = useState()
  const [positions, setPositions] = useState([])
  const [selectedPosition, setSelectedPosition] = useState("ALL")

  const {
    data: customRanking,
    isLoading: isRankingLoading,
    isSuccess: isRankingSuccess,
    isError: isRankingError,
    error: rankingError
  } = useGetCustomRankingByIdQuery(rankingId)

  const [players, setPlayers] = useState(customRanking?.rankings || [])

  useEffect(() => {
    setPlayers(customRanking?.rankings)
  }, [customRanking])

  const updateRanking = (title, rankings) => {
    updateCustomRanking({
      title: title,
      rankings: rankings,
      id: customRanking._id
    })
    setNewTitle(title)
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

  const handleEditRank = (oldIndex, newIndex) => {
    if (oldIndex === newIndex) return
    const player = filterPlayers(players)[oldIndex]
    const r = filterPlayers(players)[newIndex]
    const sourceIndex = players.findIndex(x => x._id === player._id)
    const destIndex = players.findIndex(x => x._id === r._id)
    const playersCopy = [...players]
    const [reorderedItem] = playersCopy.splice(sourceIndex, 1)
    playersCopy.splice(destIndex, 0, reorderedItem)
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

  const filterPlayers = (x) => {
    if (selectedPosition === "ALL") {
      return x
    }
    return x.filter(player =>
      player?.position === selectedPosition
    )
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return
    const player = filterPlayers(players)[(result.source.index)]
    const r = filterPlayers(players)[result.destination.index]
    const sourceIndex = players.findIndex(x => x._id === player._id)
    const destIndex = players.findIndex(x => x._id === r._id)
    if (player?.tier) {
      if (sourceIndex > destIndex) {
        const temp = players.slice(destIndex, sourceIndex)
        if (temp.find(x => x?.tier)) return
      } else if (sourceIndex < destIndex) {
        const temp = players.slice(sourceIndex + 1, destIndex + 1)
        if (temp.find(x => x?.tier)) return
      }
    }
    const playersCopy = [...players]
    const [reorderedItem] = playersCopy.splice(sourceIndex, 1)
    playersCopy.splice(destIndex, 0, reorderedItem)
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

  const deleteDraftable = (index) => {
    const player = players[index]
    const tier = player?.tier
    if (tier) {
      let playersCopy = [...players]
      setPlayers(playersCopy.filter(x => x?.tier !== tier).map(x => {
        if (x?.tier && x?.tier > tier) {
          return { ...x, tier: x.tier - 1 }
        } else {
          return x
        }
      }))
    } else {
      let playersCopy = [...players]
      playersCopy.splice(index, 1)
      setPlayers(playersCopy)
    }
    setHasChanges(true)
  }

  const insertTier = (index) => {
    const playersCopy = [...players]
    const [reorderedItem] = [{
      "tier": players.filter(x => x?.tier).length + 2
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
    let positionsCount = { "QB": 0, "RB": 0, "WR": 0, "TE": 0, "DST": 0, "K": 0 }
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
  if (isRankingLoading) {
    content = <p>"Loading..."</p>
  } else if (isRankingSuccess) {
    content =
      <div className='drag-drop-rankings'>
        {players?.length > 0 ?
          <>
            <div className='table-header'>
              <div className='drag-icon-wrapper'>
              </div>
              <div className='rank-wrapper col-label'>
                OVR
              </div>
              <div className='name-wrapper col-label'>
                NAME
              </div>
              <div className='position-wrapper col-label'>
                POS
              </div>
              <div className='team-wrapper col-label'>
                TEAM
              </div>
              <div className='bye-wrapper col-label'>
                BYE
              </div>
              <div className='buttons-wrapper col-label'>
              </div>
            </div>
            <Tier tier={{ "tier": 1 }} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="players">
                {(provided) => (
                  <section {...provided.droppableProps} ref={provided.innerRef} >
                    {filterPlayers(addRankings(players)).map((player, index) => (
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
                              handleEditRank={handleEditRank}
                              provided={provided}
                              index={index}
                              player={player}
                              onDelete={deleteDraftable}
                              maxTierIndex={maxTierIndex}
                              insertTier={insertTier}
                              showAddTier={showAddTier}
                              setEditingIndex={setEditingIndex}
                              editingIndex={editingIndex}
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
  } else if (isRankingError) {
    content = <p>{JSON.stringify(rankingError)}</p>
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
    setPlayers(customRanking.rankings)
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

  const getPositions = (x) => {
    let positions = new Set()
    x?.forEach(player => {
      if (player?.position && !positions.has(player?.position)) {
        positions.add(player?.position)
      }
    })
    return positions
  }

  useEffect(() => {
    setPositions(Array.from(getPositions(players)))
  }, [players])

  return (
    <div className='edit-ranking-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Custom Ranking | Draftabl</title>
      </Helmet>
      <Nav />
      <main>
        <div className='title-wrapper'>
          {editingTitle ?
            <>
              <input
                type="text"
                className='dialog-input-text'
                onChange={handleChangeNewTitle}
                value={newTitle}
              />
              <button className='cancel-btn' onClick={cancelChangeTitle}>Cancel</button>
              <button className='submit-btn' onClick={() => saveRanking()}>Save</button>
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
          <p className='last-update'>Last updated {new Date(customRanking?.updatedAt).getMonth() + 1}
            /{new Date(customRanking?.updatedAt).getDate()}
            /{new Date(customRanking?.updatedAt).getFullYear()}
          </p>
        </div>
        <div className='save-wrapper'>
          <div className='save-wrapper-inner'>
            <Switch
              checked={autoSave}
              onChange={handleChangeAutosave}
              size='small' />
            <p className='autosave-wrapper'>Autosave <span className='autosave'>{autoSave ? "On" : "Off"}</span></p>
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
        <p className='description'>Drag and drop players and tiers to adjust rankings.</p>
        <p className='description'>You can also click on a players rank and type to adjust their ranking.
        </p>
        <PositionFilter
          positions={positions}
          selectedPos={selectedPosition}
          onChange={setSelectedPosition} />
        <div className='drag-drop-rankings-wrapper'>
          {content}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditRankingPage