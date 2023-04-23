import './EditButton.scss'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const EditButton = ({ title, onClick }) => {
  const navigate = useNavigate()

  return (
    <button 
      className='edit-button'
      onClick={onClick}>
        <FaEdit className='new-icon' /> {title}
    </button>
  )
}

export default EditButton