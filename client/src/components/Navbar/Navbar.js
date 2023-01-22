import React, { useState } from "react";
import { Badge,IconButton,Tooltip } from "@mui/material";
import AccountMenu from "./AccountMenu";
import {FavoriteBorderOutlined,Menu,SearchOutlined,LocalMallOutlined,PersonOutlineOutlined } from "@mui/icons-material";
import Navdrawer from "./Navdrawer";
import { Link, useNavigate } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {

  const cursorPointer = {cursor: 'pointer',color:"black"}
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const {cartItems} = useSelector((state)=> state.cart)

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
          <OutsideClickHandler onOutsideClick={()=> setOpenMenu(false)} >
          <Tooltip title="Profile"><IconButton onClick={()=> setOpenMenu(!openMenu)} ><PersonOutlineOutlined style={cursorPointer} /></IconButton></Tooltip>
          {openMenu && <AccountMenu/> }
          </OutsideClickHandler>
          <Tooltip title="Whishlist"><IconButton><FavoriteBorderOutlined style={cursorPointer} /></IconButton></Tooltip>
          <Tooltip title="Bag"><IconButton><Badge badgeContent={cartItems.length} color="primary" style={cursorPointer} ><LocalMallOutlined /></Badge></IconButton></Tooltip>
        </div>
        <div className="nav-icons-ml">
            <SearchOutlined onClick={()=>navigate("/mobile-search")}/>
            <PersonOutlineOutlined/>
            <Badge badgeContent={cartItems.length}  color="primary" ><LocalMallOutlined/></Badge>
        </div>
        <div onClick={()=>setOpen(!open)}  style={{display:open? "initial" : "none"}} className="nav-ml-shadow"></div>
        <div className="nav-drawer" style={{left:open ? "0px" : "-100vw"}} >
         <Navdrawer/>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

