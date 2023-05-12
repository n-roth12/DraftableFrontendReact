import './SelectFilter.scss'
import { MenuItem } from "@mui/material"
import { TextField } from "@mui/material"

const SelectFilter = ({ handleChange, templates, selectedTemplate, defaultTemplate }) => {
  return (
    <div className='select-filter'>
      <label>Scoring</label>
      <TextField
        className="select-filter-input"
        id="scoring-format-options"
        select
        defaultValue={defaultTemplate}
        value={selectedTemplate && selectedTemplate._id}
        size="small"
        onChange={handleChange}>
        {templates && templates.length && templates.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.scoring}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

export default SelectFilter