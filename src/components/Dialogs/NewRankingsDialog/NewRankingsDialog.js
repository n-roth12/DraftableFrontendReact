import './NewRankingsDialog.scss'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { TextField } from '@mui/material'
import { useState } from 'react'
import LabeledSelect from '../../LabeledSelect/LabeledSelect'

const NewRankingsDialog = ({ open, onClose, onSubmit, templates, defaultTitle, defaultTemplate, disableTitle }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    defaultTemplate ? defaultTemplate :
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
    <Dialog disableEnforceFocus open={open} className="new-rankings-dialog">
      <DialogTitle className='dialog-title'>
        New Rankings
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <p className='description'>Choose a starting rankings template to customize.</p>
        <div className='dialog-input'>
          <label>Title</label>
            <TextField
              className='dialog-input-text'
              size='small'
              disabled={disableTitle}
              onChange={handleChangeTitle}
              placeholder={defaultTitle}
              value={title}
            />
        </div>
        <LabeledSelect 
          labelValue="Rankings Template"
          selectOptions={templates}
          keyAttr={"_id"}
          valueAttr={"_id"}
          textAttr={"scoring"}
          handleChange={handleChangeTemplate}
          selectedOption={selectedTemplate}
        />
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