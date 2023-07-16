import '../Draftable/Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'

const Tier = ({ tier, provided, index, onDelete, isBeingDragged }) => {
  return (
    <div
      className={`tier${tier.tier === 1 ? ' top-tier' : ''}${isBeingDragged ? ' selected' : ''}`}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}>
      <div className='buttons-wrapper'>
        {tier.tier !== 1 &&
          <AiOutlineMinusCircle
            className='delete-icon'
            onClick={() => onDelete(index)}
          />
        }
      </div>
      <div className='rank-wrapper'>
        {tier?.position !== "ALL" && tier.position} TIER {tier.tier}
      </div>
      <div className='drag-icon-wrapper'>
        {tier.tier !== 1 &&
          <MdDragIndicator className='drag-icon' />
        }
      </div>
    </div>
  )
}

export default Tier