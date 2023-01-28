import { ArticleOutlined, FavoriteBorderOutlined, LogoutOutlined, ShoppingBagOutlined} from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { clear_cart } from '../../redux/cart'
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const ProfileMenu = ({user_name,setProfileMenu}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(logout())
    dispatch(clear_cart())
    navigate("/")
    setProfileMenu(false)
  }

  return (
    <div className="account-menu profile-menu">
      <MenuItem>
         <div className="my-account" >
            <Avatar sx={{ width: 32, height: 32 }} />
            <p>{user_name}</p>
         </div>
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
      <Divider/>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </div>
  );
};

export default ProfileMenu;
