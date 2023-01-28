import {
  ArticleOutlined,
  FavoriteBorderOutlined,
  LogoutOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, MenuItem } from "@mui/material";
import "./Navbar.css";

const ProfileMenu = ({user_name}) => {
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
      <MenuItem>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </div>
  );
};

export default ProfileMenu;
