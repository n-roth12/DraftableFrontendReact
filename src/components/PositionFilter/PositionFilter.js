import './PositionFilter.scss'

const PositionFilter = ({ positions, onChange, selectedPos, parentRef }) => {
  console.log(parentRef?.current?.offsetWidth)
  const size = parentRef?.current?.offsetWidth < 400 ? "small" : ""
  const handleChangePos = (e) => onChange(e.target.value)
  
  return (
    <div className={`position-filter${size === "small" ? "-small" : ""}`}>
      {size !== "small" ? 
        positions?.length > 0 && ["ALL", ...positions].map(pos =>
          <button
            className={selectedPos === pos ? "active" : ""}
            key={pos}
            onClick={() => onChange(pos)}
          >{pos}</button>
        )
      :
      <select onChange={handleChangePos} value={selectedPos}>
        {positions?.length > 0 && ["ALL", ...positions].map(pos =>
          <option value={pos}>{pos}</option>
        )}
        </select>
      }
    </div>
  )
}

export default PositionFilter