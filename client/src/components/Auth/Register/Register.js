import { useState } from "react";
import { Alert, CircularProgress } from '@mui/material';
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { user_auth } from "../../../redux/user";
import { useNavigate } from 'react-router-dom'
import { formValidation } from "../../../utils/formValidation";
import { RegisterUser } from "../../../api/user-api";
import { addToCart } from "../../../api/cart-api"
import "../Login/Login.css";

const Register = () => {

  const [userData, setUserData] = useState({first_name: "",second_name: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState({});
  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const reference = searchParams.get("ref")
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = (e) => {
    setIsLoading(true)
    e.preventDefault()
    setErrorMessage("")
    const newErrors = formValidation(userData);
    setErrors(newErrors)
    if(Object.keys(newErrors).length === 0){
      userRegister()
    }else{
      setIsLoading(false)
    }
  }

  const userRegister = () => {
    RegisterUser(userData).then((res) => {
      const authDetails = {
        user_name : res.data.first_name,
        userId : res.data._id,
        token : res.data.token
      }

      console.log("data",res.data)
      
      // go to otp page if user not verified
      if(!res.data.verified) return navigate(`/otp?ref=${reference}`)

      dispatch(user_auth(authDetails))
      setIsLoading(false)
      // move guest user cart to server
      const cartItemDetails = {userId:res.data._id, cartItems, type: true}
      const isCart = localStorage.getItem("cartItems")
      if(isCart){
          addToCart(cartItemDetails).then(() => {
            localStorage.removeItem("cartItems")
          })
      }
      // go to checkout if user from place order
      if(reference === "placeorder") return navigate("/checkout")
      navigate("/")
    }).catch((err) => {
      // check if user already registered 
      if(err.response.data.message === "User already exists"){
        setErrorMessage("Already Registered Email!")
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setErrorMessage("Something Went Wrong!")
    })
  }

  return (
    <>
      <div className="login-container register-container">
        <form onSubmit={handleRegister} >
          <div className='login-title' >
           <h1>Register</h1>
          </div>
          <div className="login-form-group">
            <div>
             <label>First Name</label>
             <input onChange={handleChange} value={userData.first_name} name="first_name" type="text" placeholder="Enter First Name" />
            </div>
            <span>{errors.first_name}</span>
          </div>
          <div className="login-form-group">
            <div>
             <label>Last Name</label>
             <input onChange={handleChange} value={userData.second_name} name="second_name" type="text" placeholder="Enter Last Name" />
            </div>
            <span>{errors.second_name}</span>
          </div>
          <div className="login-form-group">
            <div>
             <label>Email</label>
             <input onChange={handleChange} value={userData.email} name="email" type="text" placeholder="Enter Email" />
            </div>
            <span>{errors.email}</span>
          </div>
          <div className="login-form-group">
            <div>
             <label>Passsword</label>
             <input onChange={handleChange} value={userData.password} name="password" type="password" placeholder="Enter Password" />
            </div>
            <span>{errors.password}</span>
          </div>
          <div className="login-form-submit">
           <button disabled={isLoading} >{isLoading ? <CircularProgress size="15px" color="inherit"/> : "REGISTER"}</button> 
          </div>
          <div className="forget-pass" >
            <p>Already have and account</p>
            <Link to="/login">Login to your account</Link>
          </div>
        </form>
        {errorMessage.length > 0 && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </>
  );
};

export default Register;