import { SearchOutlined } from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import './MobileSearch.css'

const MobileSearch = () => {

  const navigate = useNavigate()

  return (
    <div className='mobile-search'>
        <div onClick={()=>navigate("/mobile-search")} >
         <SearchOutlined style={{color:"grey"}} />
         <input type="text" placeholder='Search for Products' />
        </div>
    </div>
  )
}

export default MobileSearch