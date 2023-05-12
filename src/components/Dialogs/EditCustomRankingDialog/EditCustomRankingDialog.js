import './EditCustomRankingDialog.scss'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { TextField } from '@mui/material'
import { useState } from 'react'

const EditCustomRankingDialog = ({ open, onClose, defaulTitle }) => {
  const [title, setTitle] = useState(defaulTitle)

  const handleChangeTitle = (e) => setTitle(e.target.value)

  const onSubmitWrapper = () => {

  }

  return (
    <Dialog disableEnforceFocus open={open} className="edit-custom-ranking-dialog" maxWidth="md">
      <DialogTitle className='dialog-title'>
        Edit Ranking Details
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <div className='dialog-input'>
          <label>Title</label>
          <TextField
            className='dialog-input-text'
            size='small'
            onChange={handleChangeTitle}
            value={title}
          />
        </div>
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <button className='cancel-btn' onClick={onClose}>Cancel</button>
        <button
          className='submit-btn'
          onClick={onSubmitWrapper}
        >Save
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCustomRankingDialog