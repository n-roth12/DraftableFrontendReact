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
        <MdDragIndicator className='drag-icon'/> 
      </div>
      <div className='rank-wrapper'>
        {player._rank}
      </div>
      <div className='name-wrapper'>  
       {player.name}
      </div>
      <div className='position-wrapper'>
        {player.position}{player._posRank}
      </div>
      <div className='team-wrapper'>
        {player.team}
      </div>
      <div className='buttons-wrapper'>
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