import { Article, Favorite, Notifications, Person, ShoppingBag } from "@mui/icons-material";
import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navdrawer = () => {

  const navigate = useNavigate()

  return (
    <>
    <div onClick={()=>navigate("/login")} className="nav-dr-login">
     <div><Person/></div>
     <span>Login & Register</span>
    </div>
    <div>
    <MenuItem><ListItemIcon> <Article fontSize="small" /></ListItemIcon>My Orders</MenuItem>
    <MenuItem><ListItemIcon> <ShoppingBag fontSize="small" /></ListItemIcon>My Cart</MenuItem>
    <MenuItem><ListItemIcon> <Favorite fontSize="small" /></ListItemIcon>My Wishlist</MenuItem>
    <MenuItem><ListItemIcon> <Person fontSize="small" /></ListItemIcon>My Account</MenuItem>
    <MenuItem><ListItemIcon> <Notifications fontSize="small" /></ListItemIcon>My Notifications</MenuItem>
    <Divider/>
    </div>
    </>
  )
}

export default Navdrawer