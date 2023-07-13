import './EditRankingPage.scss'
import Nav from '../../../components/Nav/Nav'
import Footer from "../../../components/Footer/Footer"
import { useParams } from 'react-router-dom'
import { useGetCustomRankingByIdQuery, useUpdateCustomRankingMutation } from '../customRankingsApiSlice'
import { useGetRankingByIdQuery } from '../../rankings/rankingsApiSlice'
import { useEffect, useState, useRef } from 'react'
import { Switch } from '@mui/material'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../../../utilities/StrictModeDroppable'
import Tier from '../Tier/Tier'
import Draftable from '../Draftable/Draftable'
import PositionFilter from '../../../components/PositionFilter/PositionFilter'
import Helmet from "react-helmet"
import LoadingBlock from '../../../components/Loading/LoadingBlock/LoadingBlock'
import AddPlayersList from '../AddPlayersList/AddPlayersList'

const EditRankingPage = () => {
  const { rankingId } = useParams()
  const [editingTitle, setEditingTitle] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [updateCustomRanking] = useUpdateCustomRankingMutation()
  const [hasChanges, setHasChanges] = useState(false)
  const [showAddTier, setShowAddTier] = useState(false)
  const [maxTierIndex, setMaxTierIndex] = useState()
  const [editingIndex, setEditingIndex] = useState()
  const [title, setTitle] = useState('')
  const [positions, setPositions] = useState([])
  const [selectedPosition, setSelectedPosition] = useState("ALL")
  const [hasRenderedPositions, setHasRenderedPositions] = useState(false)
  const [aggregatedRanking, setAggregatedRanking] = useState()
  const addPlayersRef = useRef(null)
  const rankingsOptionsRef = useRef(null)
  const mainRef = useRef(null)
  const [activeTab, setActiveTab] = useState("rankings")

  const {
    data: customRanking,
    isLoading: isRankingLoading,
    isSuccess: isRankingSuccess,
    isError: isRankingError,
    error: rankingError
  } = useGetCustomRankingByIdQuery(rankingId)

  const [players, setPlayers] = useState(customRanking?.rankings || [])
  const handleChangeTitle = (e) => setTitle(e.target.value)
  const size = mainRef?.current?.offsetWidth < 860 ? "small" : "large"

  useEffect(() => {
    setTitle(customRanking?.title || '')
    setPlayers(customRanking?.rankings)
    // if (customRanking?.createdFrom) {
    //   setAggregatedRanking(useGetRankingByIdQuery(customRanking.createdFrom))
    // }
  }, [customRanking])

  const updateTitle = (title) => {
    if (title === customRanking.title) return
    updateCustomRanking({
      title: title,
      id: customRanking._id
    })
    setEditingTitle(false)
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

  useEffect(() => {
    if (!hasRenderedPositions) {
      const pos = Array.from(getPositions(players))
      if (!pos?.length) return
      setPositions(pos)
      setHasRenderedPositions(true)
    }
  }, [players, hasRenderedPositions])

  const handleEditRank = (playerId, newIndex) => {
    const r = filterPlayers(players).filter(x => !x?.tier)[newIndex]
    const sourceIndex = players.findIndex(x => x._id === playerId)
    const destIndex = players.findIndex(x => x._id === r._id)
    if (sourceIndex === destIndex) return
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
    const res = x.filter(player =>
      player?.position === selectedPosition ||
      (selectedPosition === "ALL" && (!player?.tier || player?.position === "ALL"))
    )
    return res
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return
    const player = filterPlayers(players)[result.source.index]
    const r = filterPlayers(players)[result.destination.index]
    const sourceIndex = players.findIndex(x => x._id === player._id)
    const destIndex = players.findIndex(x => x._id === r._id)
    if (player?.tier) {
      if (sourceIndex > destIndex) {
        const temp = players.slice(destIndex, sourceIndex)
        if (temp.find(x => { return x?.tier && x?.position === player?.position })) return
      } else if (sourceIndex < destIndex) {
        const temp = players.slice(sourceIndex + 1, destIndex + 1)
        if (temp.find(x => { return x?.tier && x?.position === player?.position })) return
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

  const addTier = () => {
    let lowestTierIndex = -1
    let tierCount = 1
    players.forEach((x, index) => {
      if (x?.tier && ((x?.position === selectedPosition) || (selectedPosition === "ALL" && !x?.position))) {
        lowestTierIndex = index
        tierCount += 1
      }
    })
    const playersCopy = [...players]
    const [reorderedItem] = [{
      "tier": tierCount + 1,
      "position": selectedPosition,
      "_id": `${selectedPosition}-${tierCount + 1}`
    }]
    playersCopy.splice(lowestTierIndex + 1, 0, reorderedItem)
    setPlayers(playersCopy)
    setShowAddTier(false)
    setHasChanges(true)
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

  const handleChangeAutosave = () => {
    setAutoSave(!autoSave)
  }

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!title.length) {
        return
      }
      updateTitle(title)
    }
  }

  const getPositions = (x) => {
    let positions = new Set()
    x?.forEach(player => {
      if (player?.position && !positions.has(player?.position) && player?.position !== "ALL") {
        positions.add(player?.position)
      }
    })
    return positions
  }

  let content
  if (isRankingLoading) {
    content = <LoadingBlock />
  } else if (isRankingSuccess) {
    content =
      <div className='drag-drop-rankings'>
        {players?.length > 0 ?
          <>
            <div className='table-header'>
              <div className='drag-icon-wrapper'>
              </div>
              <div className='rank-wrapper col-label'>
                RK
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
            <Tier tier={{ "tier": 1, "position": selectedPosition !== "ALL" && selectedPosition }} />
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
                              showAddTier={showAddTier}
                              setEditingIndex={setEditingIndex}
                              editingIndex={editingIndex}
                              isPositionFiltered={selectedPosition !== "ALL"}
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

  return (
    <div className='edit-ranking-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Custom Ranking | Draftabl</title>
        <meta name='description' content="Edit your custom fantasy rankings for free here. Add tiers and drag-and-drop 
        players to create your own draft cheatsheet." />
      </Helmet>
      <Nav />
      <main ref={mainRef}>
        <div className='title-wrapper'>
          <input
            type="text"
            onBlur={() => updateTitle(title)}
            onFocus={() => setEditingTitle(true)}
            onChange={handleChangeTitle}
            onKeyDown={handleKeyDown}
            className={`title-input-text${editingTitle ? " selected" : " unselected"}`}
            value={!editingTitle ? customRanking?.title : title} />
        </div>
        <div className='updated-wrapper'>
          <p className='last-update'>Last updated {new Date(customRanking?.updatedAt).getMonth() + 1}
            /{new Date(customRanking?.updatedAt).getDate()}
            /{new Date(customRanking?.updatedAt).getFullYear()}
          </p>
        </div>
        <p className='description'>Drag and drop players and tiers, or type on their rank and hit enter to adjust rankings.</p>
        {size === "large" &&
          <div className='columns-wrapper'>
            <div className='rankings-wrapper'>
              <div className='save-wrapper'>
                <div className='save-wrapper-inner'>
                  <h3>Rankings</h3>
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
              </div>
              <div className='table-options-wrapper' ref={rankingsOptionsRef}>
                <PositionFilter
                  positions={positions}
                  selectedPos={selectedPosition}
                  onChange={setSelectedPosition}
                  parentRef={rankingsOptionsRef} />
                <button
                  className='add-tier-btn'
                  onClick={addTier}>Add Tier</button>
              </div>
              <div className='drag-drop-rankings-wrapper'>
                {content}
              </div>
            </div>
            <div className='add-players-wrapper' ref={addPlayersRef}>
              <h3>Add Players</h3>
              <PositionFilter
                positions={positions}
                selectedPos={selectedPosition}
                onChange={setSelectedPosition}
                parentRef={addPlayersRef} />
              <AddPlayersList players={players} />
            </div>
          </div>
        }
        {size === "small" &&
          <>
            <div className='tab-btns-wrapper'>
              <button
                onClick={() => setActiveTab("rankings")}
                className={`tab-btn ${activeTab === "rankings" ? "active" : ""}`}
              >Rankings</button>
              <button
                onClick={() => setActiveTab("players")}
                className={`tab-btn ${activeTab === "players" ? "active" : ""}`}
              >Add Players</button>
            </div>
            {activeTab === "rankings" ?
              <div className='rankings-wrapper'>
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
                </div>
                <div className='table-options-wrapper' ref={rankingsOptionsRef}>
                  <PositionFilter
                    positions={positions}
                    selectedPos={selectedPosition}
                    onChange={setSelectedPosition}
                    parentRef={rankingsOptionsRef} />
                  <button
                    className='add-tier-btn'
                    onClick={addTier}>Add Tier</button>
                </div>
                <div className='drag-drop-rankings-wrapper'>
                  {content}
                </div>
              </div>
              :
              <div className='add-players-wrapper' ref={addPlayersRef}>
                <PositionFilter
                  positions={positions}
                  selectedPos={selectedPosition}
                  onChange={setSelectedPosition}
                  parentRef={addPlayersRef} />
                <AddPlayersList players={players} />
              </div>
            }
          </>
        }
      </main >
      <Footer />
    </div >
  )
}

export default EditRankingPage