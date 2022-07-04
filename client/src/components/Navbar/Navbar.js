import React from "react";
import "./Navbar.css";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";

const Navbar = () => {
  return (
    <>
      <Badge badgeContent={3} color="secondary">
          <ShoppingCartOutlined />
      </Badge>
    </>
  );
};

export default Navbar;
