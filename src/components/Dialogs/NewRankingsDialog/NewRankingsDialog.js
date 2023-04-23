import './NewRankingsDialog.scss'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, MenuItem } from '@mui/material';

const NewRankingsDialog = ({ open, onClose, onSubmit }) => {
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
            defaultValue="2023 NFL Standard Scoring"
            size="small">
            {["2023 NFL Standard Scoring", "2023 NFL Half-PPR Scoring", "2023 NFL PPR Scoring"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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