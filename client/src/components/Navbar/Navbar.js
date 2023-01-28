import { useState } from "react";
import { Avatar, Badge,IconButton,Tooltip } from "@mui/material";
import {FavoriteBorderOutlined,Menu,SearchOutlined,ShoppingCartOutlined,PersonOutlineOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";
import Navdrawer from "./Navdrawer";
import OutsideClickHandler from 'react-outside-click-handler';
import "./Navbar.css";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {

  const cursorPointer = {cursor: 'pointer',color:"black"}
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [profileMenu, setProfileMenu] = useState(false)

  const navigate = useNavigate()
  const { cartItems } = useSelector((state)=> state.cart)
  const { token, user_name } = useSelector((state)=> state.user)

  return (
    <>
      <nav className="nav-container">
        <div className="nav-menu">
        <IconButton onClick={()=>setOpen(!open)} style={cursorPointer} ><Menu/></IconButton>
        </div>
        <Link className="nav-logo" to="/">
          <img src="https://i.ibb.co/BZXZtfB/Anybuy-Case-Study-on-Behance-removebg-preview.png" alt="logo" />
          <h2>RashCart</h2>
        </Link>

        <div className="nav-search">
          <SearchOutlined style={{color:"grey"}} />
          <input placeholder="Search for products" type="text" />
        </div>
        
        <div className="nav-items">
          <p><a href="/" >SHIRT</a></p>
          <p><a href="/" >T-SHIRT</a></p>
          <p><a href="/" >JACKET</a></p>
        </div>

        <div className="nav-icons">
          <OutsideClickHandler onOutsideClick={()=> {
            setOpenMenu(false) 
            setProfileMenu(false)
          }}  >
          {token === null && <Tooltip title="Profile"><IconButton onClick={()=> setOpenMenu(!openMenu)} ><PersonOutlineOutlined style={cursorPointer} /></IconButton></Tooltip>}
          {token && <IconButton onClick={()=> setProfileMenu(!profileMenu)} ><Avatar sx={{ width: 32, height: 32 }} >{user_name.charAt(0)}</Avatar></IconButton>}
          {openMenu && <AccountMenu/> }
          {profileMenu && <ProfileMenu user_name={user_name} />}
          </OutsideClickHandler>
          <Tooltip title="Whishlist"><IconButton><FavoriteBorderOutlined style={cursorPointer} /></IconButton></Tooltip>
          <Tooltip title="Bag"><IconButton onClick={()=>navigate("/cart")} ><Badge badgeContent={cartItems.length} color="primary" style={cursorPointer} ><ShoppingCartOutlined /></Badge></IconButton></Tooltip>
        </div>

        <div className="nav-icons-ml">
            <SearchOutlined onClick={()=>navigate("/mobile-search")}/>
            <PersonOutlineOutlined/>
            <Badge onClick={()=>navigate("/cart")} badgeContent={cartItems.length}  color="primary" ><ShoppingCartOutlined/></Badge>
        </div>

        <div onClick={()=>setOpen(!open)}  style={{display:open? "initial" : "none"}} className="nav-ml-shadow"></div>
        <div className="nav-drawer" style={{left:open ? "0px" : "-100vw"}} >
         <Navdrawer token={token} user_name={user_name} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

