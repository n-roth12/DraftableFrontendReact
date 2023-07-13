import './PositionFilter.scss'
import { Select, MenuItem } from '@mui/material'
import useResponsiveBreakpoints from '../../utilities/useResponsiveBreakpoints'

const PositionFilter = ({ positions, onChange, selectedPos, parentRef, large }) => {
  var size = useResponsiveBreakpoints(parentRef, [
    { small: 500 },
    { large: 900 }
  ])
  const handleChangePos = (e) => onChange(e.target.value)

  return (
    <div className={`position-filter${(size === "small" && !large) ? "-small" : ""}`}>
      {size !== "small" || large ?
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
          style={{ fontSize: '0.8rem' }}
        >
          {positions?.length > 0 && ["ALL", ...positions].map(pos =>
            <MenuItem
              value={pos}
              style={{ fontSize: '0.8rem' }}
            >{pos}</MenuItem>
          )}
        </Select>
      }
    </div>
  )
}

export default PositionFilter