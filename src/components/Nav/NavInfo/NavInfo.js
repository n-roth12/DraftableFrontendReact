import './NavInfo.scss'
import NavInfoItem from './NavInfoItem'
import { selectCurrentInfo, closeInfo } from '../../../features/alerts/alertsApiSlice'
import { useDispatch, useSelector } from 'react-redux'

const NavInfo = () => {
  const dispatch = useDispatch()
  const info = useSelector(selectCurrentInfo)
  
  const removeItem = (value) => {
    dispatch(closeInfo(value))
  }

  return (
    <div className='nav-info-wrapper'>
      {info?.length && info?.map(item => 
        <NavInfoItem item={item} onClose={removeItem} />  
      )}
    </div>
  )
}

export default NavInfo