import '../Draftable/Draftable.scss'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlineMinusCircle } from 'react-icons/ai'

const Tier = ({ tier, provided, index, onDelete }) => {
  return (
    <div
      className={`tier ${tier.tier === 1 ? 'top-tier' : ''}`}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}>
      <div className='drag-icon-wrapper'>
        {tier.tier !== 1 &&
          <MdDragIndicator className='drag-icon' />
        }
      </div>
      <div className='rank-wrapper'>
        Tier {tier.tier}
      </div>
      <div className='buttons-wrapper'>
        {tier.tier !== 1 &&
          <AiOutlineMinusCircle
            className='delete-icon'
            onClick={() => onDelete(index)}
          />
        }
      </div>
    </div>
  )
}

export default Tier