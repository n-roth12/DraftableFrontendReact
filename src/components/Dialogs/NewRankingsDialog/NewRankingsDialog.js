import './NewRankingsDialog.scss'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

const NewRankingsDialog = ({ open, onClose, onSubmit, templates, defaultTitle }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates && templates.length > 0 && templates[0]._id
  )
  const [title, setTitle] = useState('')

  const handleChangeTemplate = (e) => setSelectedTemplate(e.target.value)
  const handleChangeTitle = (e) => setTitle(e.target.value)

  const onCloseWrapper = () => {
    onClose()
    setTitle('')
  }

  const onSubmitWrapper = () => {
    onSubmit(title.length ? title : defaultTitle, selectedTemplate)
    onCloseWrapper()
  }

  return (
    <Dialog disableEnforceFocus open={open} className="new-rankings-dialog" maxWidth="md">
      <DialogTitle className='dialog-title'>
        New Rankings
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <div className='dialog-input'>
          <label>Title</label>
            <TextField
              className='dialog-input-text'
              size='small'
              onChange={handleChangeTitle}
              placeholder={defaultTitle}
              value={title}
            />
        </div>
        <div className='dialog-input'>
          <label>Rankings Template</label>
          <TextField
            className="dialog-input-select"
            id="rankings-template-options"
            select
            onChange={handleChangeTemplate}
            size="small">
            {templates.map(template => (
              <MenuItem key={template._id} value={template._id}>
                NFL {template.scoring}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogContent>
      <DialogActions className='dialog-actions'>
        <button className='cancel-btn' onClick={onCloseWrapper}>Cancel</button>
        <button 
          className='submit-btn' 
          onClick={onSubmitWrapper}
          >Create
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default NewRankingsDialog