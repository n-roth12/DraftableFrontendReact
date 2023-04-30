import './NewRankingsDialog.scss'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, MenuItem } from '@mui/material';

const NewRankingsDialog = ({ open, onClose, onSubmit, templates }) => {
  return (
    <Dialog open={open} className="new-rankings-dialog" maxWidth="md">
      <DialogTitle className='dialog-title'>
        New Rankings
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <div className='dialog-input'>
          <label>Title</label>
            <TextField
              className='dialog-input-text'
              placeholder="Custom Rankings 1"
              size='small'
              // InputProps={{
              //   startAdornment: <InputAdornment position="end"><FaSearch /></InputAdornment>
              // }}
            />
        </div>
        <div className='dialog-input'>
          <label>Rankings Template</label>
          <TextField
            className="dialog-input-select"
            id="rankings-template-options"
            select
            defaultValue={templates[0].scoring}
            size="small">
            {templates.map(template => (
              <MenuItem key={template.scoring} value={template.scoring}>
                {template.league} {template.scoring}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <button className='cancel-btn' onClick={onClose}>Cancel</button>
        <button className='submit-btn' onClick={onSubmit}>Create</button>
      </DialogActions>
    </Dialog>
  )
}

export default NewRankingsDialog