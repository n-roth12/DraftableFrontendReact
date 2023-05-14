import '../Draftable/Draftable.scss'

const Tier = ({ tier, provided }) => {
  return (
    <div {...provided?.draggableProps} {...provided?.dragHandleProps} ref={provided?.innerRef} className={`tier ${tier.tier === 1 ? 'top-tier' : ''}`} >
        {tier?.position} Tier {tier.tier}
    </div>
  )
}

export default Tier