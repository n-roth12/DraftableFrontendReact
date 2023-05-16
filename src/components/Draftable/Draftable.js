import './Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { FaAngleDoubleLeft } from 'react-icons/fa'

const Draftable = ({ player, provided, showAddTier, insertTier, index, onDelete, maxTierIndex }) => {
  return (
    <div className='draftable' 
      {...provided.draggableProps} 
      {...provided.dragHandleProps} 
      ref={provided.innerRef}>
      <div className="drag-icon-wrapper">
        <MdDragIndicator className='drag-icon'/> {player._rank} {player.name}
      </div>
      <div>
        {player.position}{player._posRank}
      </div>
      <div>
        {player.team}
      </div>
      <div>
        {showAddTier && index > maxTierIndex ? 
          <button 
            className='insert-tier-btn'
            onClick={() => insertTier(index)}><FaAngleDoubleLeft className='insert-icon' /> Insert Tier</button> 
        : 
          <AiOutlineMinusCircle 
            className='delete-icon'
            onClick={() => onDelete(index)} 
          />
        }
      </div>
    </div>
  )
}

export default Draftable