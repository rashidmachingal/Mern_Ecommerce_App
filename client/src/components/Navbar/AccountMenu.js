import { ArticleOutlined, FavoriteBorderOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Divider, ListItemIcon, MenuItem } from '@mui/material'
import './Navbar.css'

const AccountMenu = () => {
  return (
    <div className="account-menu" >
       <MenuItem>
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