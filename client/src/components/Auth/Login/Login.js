import { Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LoginUser } from '../../../api/user-api'
import { useDispatch } from 'react-redux'
import { user_auth } from "../../../redux/user";
import { MoveGuestCartToServer } from '../../../helpers/cartFunctions'
import './Login.css'

const Login = () => {
  
  const [loginData, setLoginData] = useState({email:"", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const [wrongCred, setWrongCred] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const reference = searchParams.get("ref")

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
      // move guest user cart to server
      MoveGuestCartToServer(res.data._id)
      // go to checkout if user from place order
      if(reference === "placeorder") return navigate("/checkout")
      navigate("/")
    }).catch((err) => {
      setIsLoading(false)
      setWrongCred(true)
    })
  }

  return (
    <>
    <div className='login-container' >
        <form onSubmit={handleLogin} autoComplete='off' >
          <div className='login-title' >
           <h1>Login</h1>
          </div>
          <div className='login-form-group'>
            <label>Email</label>
            <input onChange={handleChange} value={loginData.email} name="email" type="text" placeholder='Enter Your Email' />
          </div>
          <div className='login-form-group'>
            <label>Password</label>
           <input onChange={handleChange} value={loginData.password} name="password" type="password" placeholder='Enter Your Password' />
          </div>
          <div className='forget-pass'>
            <div>
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <Link to="/register" >Forget password?</Link>
          </div>
          <div className='login-form-submit'>
           <button disabled={isLoading} >{isLoading ? <CircularProgress size="15px" /> : "LOGIN"}</button>
          </div>
          <div className='forget-pass' style={{marginTop:"3px"}} >
            <p>Don't have an account?</p>
            <Link to="/register" >Create New Account?</Link>
          </div>
        </form>
        {wrongCred && <Alert severity="error">Email or Password Wrong!</Alert>}
    </div>
    </>
  )
}

export default Login