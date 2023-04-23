import './EditButton.scss'
import { FaEdit } from 'react-icons/fa'

const EditButton = ({ title }) => {
  return (
    <button className='edit-button'><FaEdit className='new-icon' /> {title}</button>
  )
}

export default EditButton