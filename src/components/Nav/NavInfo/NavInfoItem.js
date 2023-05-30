import { FaTimes } from 'react-icons/fa'
import './NavInfo.scss'

const NavInfoItem = ({ item, onClose }) => {
  return (
    <div className={`nav-info ${item.category}`}>
      <div></div>
      <p>{item.value}</p>
      <div>
        <FaTimes className='close-icon' onClick={() => onClose(item.value)} />
      </div>
    </div>
  )
}

export default NavInfoItem