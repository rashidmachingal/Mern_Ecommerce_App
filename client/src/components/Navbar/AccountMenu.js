import { ArticleOutlined, FavoriteBorderOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const AccountMenu = () => {

  const navigate = useNavigate()

  return (
    <div className="account-menu" >
      <div onClick={()=> navigate("/login")} className='menu-login' >
       <button>Login / Register</button>
      </div>
      <Divider/>
      <div className='menu-item' >
       <ArticleOutlined fontSize="small" />
       <h4>Orders</h4>
      </div>
      <div className='menu-item' >
        <ShoppingBagOutlined fontSize="small" />
        <h4>Cart</h4>
      </div>
      <div className='menu-item' >
        <FavoriteBorderOutlined fontSize="small" />
        <h4>WishList</h4>
      </div>
    </div>
  )
}

export default AccountMenu