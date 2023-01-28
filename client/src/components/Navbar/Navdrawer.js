import { Article, Favorite, Logout, Notifications, Person, ShoppingBag } from "@mui/icons-material";
import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clear_cart } from "../../redux/cart";
import { logout } from "../../redux/user";
import "./Navbar.css";

const Navdrawer = ({token, user_name, setOpen}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(logout())
    dispatch(clear_cart())
    navigate("/")
    setOpen(false)
  }

  return (
    <>
    {token === null ? 
    <div onClick={()=>navigate("/login")} className="nav-dr-login">
     <div><Person/></div>
     <span>Login & Register</span>
    </div> : 
    <div className="nav-dr-login">
      <div><Person/></div>
      <span>{user_name}</span>
    </div>}
    <div>
    <MenuItem><ListItemIcon> <Article fontSize="small" /></ListItemIcon>My Orders</MenuItem>
    <MenuItem><ListItemIcon> <ShoppingBag fontSize="small" /></ListItemIcon>My Cart</MenuItem>
    <MenuItem><ListItemIcon> <Favorite fontSize="small" /></ListItemIcon>My Wishlist</MenuItem>
    <MenuItem><ListItemIcon> <Person fontSize="small" /></ListItemIcon>My Account</MenuItem>
    <MenuItem><ListItemIcon> <Notifications fontSize="small" /></ListItemIcon>My Notifications</MenuItem>
    <Divider/>
    <MenuItem onClick={handleLogout} ><ListItemIcon> <Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
    </div>
    </>
  )
}

export default Navdrawer