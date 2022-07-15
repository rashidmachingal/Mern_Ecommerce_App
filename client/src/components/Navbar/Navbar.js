import React, { useState } from "react";
import "./Navbar.css";
import { Badge,IconButton,Tooltip } from "@mui/material";
import {FavoriteBorderOutlined,Menu,SearchOutlined,LocalMallOutlined } from "@mui/icons-material";
import AccountMenu from "./Menu";
import Navdrawer from "./Navdrawer";


const Navbar = () => {

  const cursorPointer = {cursor: 'pointer',color:"black"}
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-container">
        <div className="nav-menu">
        <IconButton><Menu onClick={()=>setOpen(!open)} style={cursorPointer} /></IconButton>
        </div>
        <div className="nav-logo">
          <img src="https://i.ibb.co/BZXZtfB/Anybuy-Case-Study-on-Behance-removebg-preview.png" alt="logo" />
          <h2>RashCart</h2>
        </div>
        <div className="nav-search">
          <SearchOutlined style={{color:"grey"}} />
          <input placeholder="Search for products" type="text" />
        </div>
        <div className="nav-items">
          <span>Shirt</span>
          <span>T-Shirt</span>
          <span>Pants</span>
        </div>
        <div className="nav-icons">
          <AccountMenu iconBtn={true} />
          <Tooltip iconBtn={false} title="Whishlist"><IconButton><FavoriteBorderOutlined style={cursorPointer} /></IconButton></Tooltip>
          <Tooltip title="Bag"><IconButton><Badge badgeContent={3} color="primary" style={cursorPointer} ><LocalMallOutlined /></Badge></IconButton></Tooltip>
        </div>
        <div className="nav-icons-ml">
            <AccountMenu/>
            <Badge badgeContent={3}  color="primary" ><LocalMallOutlined/></Badge>
        </div>
        <div onClick={()=>setOpen(!open)}  style={{display:open? "initial" : "none"}} className="nav-ml-shadow"></div>
        <div className="nav-drawer" style={{left:open ? "0px" : "-100vw"}} >
         <Navdrawer/>
        </div>
      </nav>
      <div className="nav-search-ct">
          <div className="nav-search-ml">
           <SearchOutlined style={{color:"grey"}} />
           <input placeholder="Search for products" type="text" />
          </div>
      </div>
    </>
  );
};

export default Navbar;

