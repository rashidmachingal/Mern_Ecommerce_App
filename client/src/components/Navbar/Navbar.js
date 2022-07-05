import React, { useState } from "react";
import "./Navbar.css";
import { Badge,IconButton,Tooltip } from "@material-ui/core";
import {ShoppingCartOutlined,FavoriteBorderOutlined,PersonOutlineOutlined, Search, Menu, Close } from "@material-ui/icons";

const Navbar = () => {

  const cursorPointer = {cursor: 'pointer',color:"black"}
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-container">
        <div className="nav-menu">
        <IconButton>{open? <Close onClick={()=>setOpen(!open)} style={cursorPointer} /> : <Menu onClick={()=>setOpen(!open)} style={cursorPointer} />}</IconButton>
        </div>
        <div className="nav-logo">
          <img src="https://i.ibb.co/BZXZtfB/Anybuy-Case-Study-on-Behance-removebg-preview.png" alt="logo" />
          <h2>RashCart</h2>
        </div>
        <div className="nav-items">
          <span>Home</span>
          <span>Shop</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="nav-icons">
          <div className="nav-search" ><IconButton><Search style={cursorPointer} /></IconButton></div>
          <Tooltip title="Account"><IconButton><PersonOutlineOutlined style={cursorPointer} /></IconButton></Tooltip>
          <div className="nav-whishlist" ><Tooltip title="Whishlist"><IconButton><FavoriteBorderOutlined style={cursorPointer} /></IconButton></Tooltip></div>
          <Tooltip title="Cart"><IconButton><Badge badgeContent={3} color="primary" style={cursorPointer} ><ShoppingCartOutlined /></Badge></IconButton></Tooltip>
        </div>
        <div className="nav-icons-ml">
            <Search/>
            <PersonOutlineOutlined/>
            <Badge badgeContent={3}  color="primary" ><ShoppingCartOutlined/></Badge>
        </div>
        <div className="nav-ml-list" style={{left:open ? "0px" : "-100vw"}} >
         <span>Home</span>
         <span>Orders</span>
         <span>Shop</span>
         <span>About</span>
         <span>Contact</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
