import './ClearRankingsDialog.scss'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const ClearRankingsDialog = ({ open, onClose, onClear }) => {

  return (
    <Dialog disableEnforceFocus open={open} className="clear-rankings-dialog">
      <DialogTitle className='dialog-title'>
        Clear Rankings
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <p className='description'>Are you sure you would like to clear your custom ranking?</p>
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <button className='cancel-btn' onClick={onClose}>Cancel</button>
        <button 
          className='clear-btn' 
          onClick={onClear}
          >Clear
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default ClearRankingsDialog