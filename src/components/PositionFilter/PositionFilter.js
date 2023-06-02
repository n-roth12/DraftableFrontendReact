import './PositionFilter.scss'

const PositionFilter = ({ positions, onChange, selectedPos }) => {
  return (
    <div className='position-filter-wrapper'>
      <div className="position-filter">
        {positions?.length && ["ALL", ...positions].map(pos =>
          <button
            className={selectedPos === pos ? "active" : ""}
            key={pos}
            onClick={() => onChange(pos)}
          >{pos}</button>
        )}
      </div>
    </div>
  )
}

export default PositionFilter