import './Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const Draftable = ({ player, provided, index, onDelete, handleEditRank }) => {

  const [editingRank, setEditingRank] = useState(false)
  const [inputRank, setInputRank] = useState(index + 1)

  useEffect(() => {
    setInputRank(index + 1)    
  }, [index])

  const handleChangeRank = (e) => setInputRank(e.target.value) 

  const nameSplit = (name) => {
    const names = name.split(/ (.*)/s)
    return (
      <div className='name-wrapper'>
        <span>{names[0]}</span> <span>{names[1]}</span>
      </div>
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isNaN(inputRank)) {
        setInputRank()
        return
      }
      handleEditRank(player._id, inputRank - 1)
    }
    setInputRank()
  }

  const cancelEditRank = () => {
    setEditingRank(false)
    setInputRank(index + 1)
  }

  useEffect(() => {
    nameSplit(player.name)
  }, [])

  return (
    <div className='draftable'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}>
      <div className='delete-icon-wrapper'>
        <AiOutlineMinusCircle
          className='delete-icon'
          onClick={() => onDelete(index)}
        />
      </div>
      <div className='rank-wrapper'>
        <input 
          onBlur={cancelEditRank} 
          onFocus={() => setEditingRank(true)}
          onChange={handleChangeRank}
          onKeyDown={handleKeyDown}
          className={`rank-input${editingRank ? " selected" : " unselected"}`} 
          value={!editingRank ? index + 1 : inputRank} />
      </div>
      {nameSplit(player.name)}
      <div className='position-wrapper'>
        {player.position}
      </div>
      <div className='team-wrapper'>
        {player.team}
      </div>
      <div className='bye-wrapper'>
        {player.bye}
      </div>
      <div className='buttons-wrapper'>
        <div className="drag-icon-wrapper">
          <MdDragIndicator className='drag-icon' />
        </div>
      </div>
    </div>
  )
}

export default Draftable