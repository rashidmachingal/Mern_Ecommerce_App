import { ArticleOutlined, FavoriteBorderOutlined, LogoutOutlined, ShoppingBagOutlined} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { clear_cart } from '../../redux/cart'
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const ProfileMenu = ({setProfileMenu}) => {

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
    <div className="account-menu">
      <div className="my-account" >
            <Avatar sx={{ width: 32, height: 32 }} />
      </div>
      <Divider />
      <div className='menu-item' >
       <ArticleOutlined fontSize="small" />
       <h4>Orders</h4>
      </div>
      <div onClick={()=>navigate("/cart")} className='menu-item' >
        <ShoppingBagOutlined fontSize="small" />
        <h4>Cart</h4>
      </div>
      <div className='menu-item' >
        <FavoriteBorderOutlined fontSize="small" />
        <h4>WishList</h4>
      </div>
      <Divider />
      <div onClick={handleLogout} className="menu-item">
        <LogoutOutlined fontSize="small" />
        <h4>Logout</h4>
      </div>
    </div>
  );
};

export default ProfileMenu;
