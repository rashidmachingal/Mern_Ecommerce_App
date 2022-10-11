import {Tooltip,IconButton,Divider,ListItemIcon,MenuItem,Menu} from '@mui/material'
import { ArticleOutlined, FavoriteBorderOutlined, PersonOutlineOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { useState } from 'react';
import "./Navbar.css";

export default function AccountMenu({iconBtn}) {
  const black = {cursor: 'pointer',color:"black"}
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  return (
    <>
        <Tooltip title="Account">
          {iconBtn === "true" ? <IconButton onClick={handleClick} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
            <PersonOutlineOutlined style={black} />
          </IconButton> : <PersonOutlineOutlined onClick={handleClick} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} style={black} />}
        </Tooltip>
       <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.363))',
            mt: 1
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
         <ListItemIcon>
         <button className='nav-login' >Login / Register</button>
         </ListItemIcon>
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
      </Menu>
    </>
  );
}