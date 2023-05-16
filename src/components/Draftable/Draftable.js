import './Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'

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
          <button onClick={() => insertTier(index)}>Insert Tier</button> 
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