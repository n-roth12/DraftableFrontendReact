import './Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { useEffect } from 'react'

const Draftable = ({ player, provided, showAddTier, insertTier, index, onDelete, maxTierIndex }) => {

  const nameSplit = (name) => {
    const names = name.split(/ (.*)/s)
    return (
      <div className='name-wrapper'>
        <span>{names[0]}</span> <span>{names[1]}</span>
      </div>
    )
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
        {player._rank}
      </div>
      {nameSplit(player.name)}
      <div className='position-wrapper'>
        {player.position}{player._posRank}
      </div>
      <div className='team-wrapper'>
        {player.team}
      </div>
      <div className='bye-wrapper'>
        {player.bye}
      </div>
      <div className='buttons-wrapper'>
        {showAddTier && index > maxTierIndex ?
          <button
            className='insert-tier-btn'
            onClick={() => insertTier(index)}><FaAngleDoubleLeft className='insert-icon' /> Insert Tier</button>
          :
          <div className="drag-icon-wrapper">
            <MdDragIndicator className='drag-icon' />
          </div>
        }
      </div>
    </div>
  )
}

export default Draftable