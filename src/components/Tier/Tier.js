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
      <div>
        {tier.tier !== 1 &&
          <MdDragIndicator className='drag-icon' />
        }
        <p>Tier {tier.tier}</p>
      </div>
      {tier.tier !== 1 &&
        <div>
          <AiOutlineMinusCircle
            className='delete-icon'
            onClick={() => onDelete(index)}
          />
        </div>
      }
    </div>
  )
}

export default Tier