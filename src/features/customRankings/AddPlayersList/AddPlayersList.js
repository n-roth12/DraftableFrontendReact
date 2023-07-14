import './AddPlayersList.scss'
import { AiOutlinePlusCircle } from 'react-icons/ai'


const AddPlayersList = ({ players, addPlayer }) => {
  return (
    <div className='add-players-list'>
      {players?.map((player, index) => 
        <div className='add-player'>
          <div className='add-icon-wrapper'>
            <AiOutlinePlusCircle 
              className='add-icon'
              onClick={() => addPlayer(player)} />
          </div>
          <div className='info-wrapper'>
            <div className='name-wrapper'>
              <p>{player.name}</p>
            </div>
            <div className='details'>
              <p className='team-wrapper'>
                {player.team}
              </p>
              <p>
                {player.position}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddPlayersList