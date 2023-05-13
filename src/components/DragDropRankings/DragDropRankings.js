import './DragDropRankings.scss'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../../features/helpers/StrictModeDroppable'

const DragDropRankings = ({ players }) => {
  return (
    <div className='drag-drop-rankings'>
      {players?.rankings?.length > 0 ?
        <DragDropContext>
          <Droppable droppableId="players">
            {(provided) => (
              <section { ...provided.droppableProps } ref={provided.innerRef} >
              {players.rankings.map((player, index) => (
                <Draggable key={player.name} draggableId={player.name} index={index} >
                  {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='draggable'>{player.name} {player.position} {player.team}</div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
        :
        <p>No players</p>
      }
    </div>
  )
}

export default DragDropRankings