import './AddPlayersList.scss'
import { AiOutlinePlusCircle, AiFillPlusCircle } from 'react-icons/ai'


const AddPlayersList = ({ players, addPlayer, size }) => {
  return (
    <div className={`add-players-list ${size === "small" ? "small" : ""}`}>
      {players?.length ?
        players.map((player, index) =>
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
        )
        :
        <div className='add-player'>
          <p className='empty-players-indicator'>All players already added</p>
        </div>
      }
    </div>
  )
}

export default AddPlayersList