import './SelectFilter.scss'
import { MenuItem } from "@mui/material"
import { TextField } from "@mui/material"

const SelectFilter = () => {
  return (
    <div className='select-filter'>
      <label>Scoring</label>
      <TextField
        className="select-filter-input"
        id="scoring-format-options"
        select
        defaultValue="Standard"
        size="small">
        {["Standard", "Half-PPR", "PPR"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

export default SelectFilter