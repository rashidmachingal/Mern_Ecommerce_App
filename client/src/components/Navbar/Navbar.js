import { useState } from "react";
import { Avatar, Badge,IconButton,Tooltip } from "@mui/material";
import {FavoriteBorderOutlined, Menu,SearchOutlined, ShoppingCartOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";
import Navdrawer from "./Navdrawer";
import OutsideClickHandler from 'react-outside-click-handler';
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

const Navbar = () => {

  const cursorPointer = {cursor: 'pointer',color:"black"}
  // side drawer open logic
  const [open, setOpen] = useState(false)
  // open account menu logics
  const [openMenu, setOpenMenu] = useState(false)
  const [profileMenu, setProfileMenu] = useState(false)

  const navigate = useNavigate()
  const { cartItems } = useSelector((state)=> state.cart)
  // get user name and token
  const { token } = useSelector((state)=> state.user)

  return (
    <>
      <nav className="nav-container">
        <div className="nav-menu">
        <Menu onClick={()=>setOpen(!open)} />
        </div>
        <Link className="nav-logo" to="/">
          <img src="https://i.ibb.co/Bqyp53V/image-removebg-preview.png" alt="logo" />
          <h2>RASH</h2>
          </Link>
        <div className="nav-search">
          <SearchOutlined style={{color:"grey"}} />
          <input placeholder="Search for products" type="text" />
        </div>
        <div className="nav-icons">
          <OutsideClickHandler onOutsideClick={()=> {
            setOpenMenu(false) 
            setProfileMenu(false)
          }}>
          {token === null && <Tooltip title="Profile"><IconButton onClick={()=> setOpenMenu(!openMenu)} ><PersonOutlineOutlined style={cursorPointer} /></IconButton></Tooltip>}
          {token && <IconButton onClick={()=> setProfileMenu(!profileMenu)} ><Avatar sx={{ width: 32, height: 32 }} ></Avatar></IconButton>}
          {openMenu && <AccountMenu/> }
          {profileMenu &&  <ProfileMenu setProfileMenu={setProfileMenu} />}
          </OutsideClickHandler>
          <Tooltip title="Whishlist"><IconButton><FavoriteBorderOutlined style={cursorPointer} /></IconButton></Tooltip>
          <Tooltip title="Bag"><IconButton onClick={()=>navigate("/cart")} ><Badge badgeContent={cartItems.length} color="primary" style={cursorPointer} ><ShoppingCartOutlined /></Badge></IconButton></Tooltip>
        </div>
        
        <div className="nav-icons-ml">
            <SearchOutlined onClick={()=>navigate("/mobile-search")}/>
            {token === null && <PersonOutlineOutlined onClick={()=> navigate("/login")} />}
            <Badge onClick={()=>navigate("/cart")} badgeContent={cartItems.length}  color="primary" ><ShoppingCartOutlined/></Badge>
        </div>

        <div onClick={()=>setOpen(!open)}  style={{display:open? "initial" : "none"}} className="nav-ml-shadow"></div>
        <div className="nav-drawer" style={{left:open ? "0px" : "-100vw"}} >
         <Navdrawer token={token} setOpen={setOpen} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

