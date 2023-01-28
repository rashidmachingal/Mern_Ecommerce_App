import { Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../api/user-api'
import { useDispatch, useSelector } from 'react-redux'
import { user_auth } from "../../redux/user";
import './Login.css'
import { addToCart } from '../../api/cart-api'

const Login = () => {

  const [loginData, setLoginData] = useState({email:"", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const [wrongCred, setWrongCred] = useState(false)

  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    LoginUser(loginData).then((res) => {
      const authDetails = {
        user_name : res.data.first_name,
        userId : res.data._id,
        token : res.data.token
      }
      dispatch(user_auth(authDetails))
      setIsLoading(false)

      // move guestCart to server
      const cartItemDetails = {userId: res.data._id,cartItems: cartItems, type: true}
      const isCart = localStorage.getItem("cartItems")
      if(isCart){
        addToCart(cartItemDetails).then(() => {
          localStorage.removeItem("cartItems")
        })
      }

      navigate("/")
    }).catch((err) => {
      setIsLoading(false)
      setWrongCred(true)
    })
  }

  return (
    <>
    <div className='login-container' >
        <form onSubmit={handleLogin}>
          <input onChange={handleChange} value={loginData.email} name="email" type="text" placeholder='Email' />
          <input onChange={handleChange} value={loginData.password} name="password" type="password" placeholder='Password' />
          <button>{isLoading ? <CircularProgress size="15px" /> : "LOGIN"}</button>
          <div>
            <Link to="/">Forget Password?</Link>
            <Link to="/register" >Create New Account?</Link>
          </div>
        </form>
        {wrongCred && <Alert severity="error">Email or Password Wrong!</Alert>}
    </div>
    </>
  )
}

export default Login