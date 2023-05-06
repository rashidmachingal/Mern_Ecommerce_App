import { useState } from "react";
import { Alert, CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";
import { formValidation } from "../../../utils/formValidation";
import { RegisterUser } from "../../../api/auth-api";
import { OtpVerifcation } from "../..";
import "../Login/Login.css";

const Register = () => {

  const [userData, setUserData] = useState({user_name: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [renderOtp, setRenderOtp] = useState(false)
  const [errors, setErrors] = useState({});

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
      // render otp component 
      if(!res.data.verified) {
        setRenderOtp(true)
        return
      }
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
      {!renderOtp && <div className="login-container register-container">
        <form onSubmit={handleRegister} >
          <div className='login-title' >
           <h1>Register</h1>
          </div>
          <div className="login-form-group">
            <div>
             <label>Your Name</label>
             <input onChange={handleChange} value={userData.user_name} name="user_name" type="text" placeholder="Enter Your Name" />
            </div>
            <span>{errors.user_name}</span>
          </div>
          <div className="login-form-group">
            <div>
             <label>Email or Mobile</label>
             <input onChange={handleChange} value={userData.email} name="email" type="text" placeholder="Enter Email" />
            </div>
            <span>{errors.email}</span>
          </div>
          <div className="login-form-group">
            <div>
             <label>Password</label>
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
      </div>}
       {/* render otp component */}
       { renderOtp && <OtpVerifcation password={userData.password} email={userData.email} />}
    </>
  );
};

export default Register;