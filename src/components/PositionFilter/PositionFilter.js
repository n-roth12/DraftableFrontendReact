import './PositionFilter.scss'
import { Select, MenuItem } from '@mui/material'

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
        <Select
          value={selectedPos}
          onChange={handleChangePos}
          size="small"
          style={{fontSize: '0.8rem'}}
        >
          {positions?.length > 0 && ["ALL", ...positions].map(pos =>
            <MenuItem 
              value={pos}
              style={{fontSize: '0.8rem'}}
            >{pos}</MenuItem>
          )}
        </Select>
      }
    </div>
  )
}

export default PositionFilter