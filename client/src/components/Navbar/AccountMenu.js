import { ArticleOutlined, FavoriteBorderOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Divider, ListItemIcon, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const AccountMenu = () => {

  const navigate = useNavigate()

  return (
    <div className="account-menu" >
       <MenuItem onClick={()=>navigate("/login")} >
         <button className='nav-login' >Login / Register</button>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ArticleOutlined fontSize="small" />
          </ListItemIcon>
          Orders    
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShoppingBagOutlined fontSize="small" />
          </ListItemIcon>
          Cart
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FavoriteBorderOutlined fontSize="small" />
          </ListItemIcon>
          WhisList
        </MenuItem>
    </div>
  )
}

export default AccountMenu