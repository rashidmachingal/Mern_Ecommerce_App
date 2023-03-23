import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RegisterUser } from "../../../api/user-api";
import { useDispatch } from "react-redux"
import { user_auth } from "../../../redux/user";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { formValidation } from "../../../utils/formValidation";
import { MoveGuestCartToServer } from "../../../helpers/cartFunctions";
import "../Login/Login.css";

const Register = () => {

  const [userData, setUserData] = useState({first_name: "",second_name: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});

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
    const newErrors = formValidation(userData);
    setErrors(newErrors)
    if(Object.keys(newErrors).length === 0){
      userRegister()
    }
    setIsLoading(false)
  }

  const userRegister = () => {
    RegisterUser(userData).then((res) => {
      const authDetails = {
        user_name : res.data.first_name,
        userId : res.data._id,
        token : res.data.token
      }
      dispatch(user_auth(authDetails))
      setIsLoading(false)
      // move guest user cart to server
      MoveGuestCartToServer(res.data._id)
      if(reference === "placeorder") return navigate("/checkout")
      navigate("/")
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
            <label>First Name</label>
            <input onChange={handleChange} value={userData.first_name} name="first_name" type="text" placeholder="Enter First Name" />
            <span>{errors.first_name}</span>
          </div>
          <div className="login-form-group">
            <label>Last Name</label>
            <input onChange={handleChange} value={userData.second_name} name="second_name" type="text" placeholder="Enter Last Name" />
          </div>
          <div className="login-form-group">
            <label>Email</label>
            <input onChange={handleChange} value={userData.email} name="email" type="text" placeholder="Enter Email" />
          </div>
          <div className="login-form-group">
            <label>Passsword</label>
            <input onChange={handleChange} value={userData.password} name="password" type="password" placeholder="Enter Password" />
          </div>
          <div className="login-form-submit">
           <button disabled={isLoading} >{isLoading ? <CircularProgress size="15px" color="inherit" /> : "REGISTER"}</button> 
          </div>
          <div className="forget-pass" >
            <p>Already have and account</p>
            <Link to="/login">Login to your account</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;