import './TemplateSelector.scss'
import { MenuItem } from "@mui/material"
import { TextField } from "@mui/material"

const TemplateSelector = ({ templates, handleChange, selectedTemplate }) => {
  return (
    <div className='template-selector'>
      <label>Rankings Template</label>
      <TextField
        className="select-filter-input"
        id="scoring-format-options"
        select
        value={selectedTemplate}
        size="small"
        onChange={handleChange}>
        {templates.map((template) => (
          <MenuItem key={template._id} value={template._id}>
            NFL {template.scoring}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

export default TemplateSelector