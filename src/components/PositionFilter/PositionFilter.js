import './PositionFilter.scss'
import { useState } from 'react'

const PositionFilter = ({ positions }) => {
  const [activeFilter, setActiveFilter] = useState("ALL")

  return (
    <div className='position-filter-wrapper'>
      <label></label>
      <div className="position-filter">
        {["ALL", ...positions].map(pos =>
          <button
            className={activeFilter === pos ? "active" : ""}
            key={pos}
            onClick={() => setActiveFilter(pos)}
          >{pos}</button>
        )}
      </div>
    </div>
  )
}

export default PositionFilter