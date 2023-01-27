import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/user-api";
import { useDispatch } from "react-redux"
import { user_auth } from "../../redux/user";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import "../Login/Login.css";

const Register = () => {

  const [userData, setUserData] = useState({first_name: "",second_name: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = (e) => {
    setIsLoading(true)
    e.preventDefault()
    RegisterUser(userData).then((res) => {
      const authDetails = {
        user_name : res.data.first_name,
        userId : res.data._id,
        token : res.data.token
      }
      dispatch(user_auth(authDetails))
      setIsLoading(false)
      navigate("/")
    })
  }

  return (
    <>
      <div className="login-container register-container">
        <form onSubmit={handleRegister} >
          <input onChange={hanldeChange} value={userData.first_name} name="first_name" type="text" placeholder="First Name" />
          <input onChange={hanldeChange} value={userData.second_name} name="second_name" type="text" placeholder="Second Name" />
          <input onChange={hanldeChange} value={userData.email} name="email" type="text" placeholder="Email" />
          <input onChange={hanldeChange} value={userData.password} name="password" type="password" placeholder="Password" />
          <button>{isLoading ? <CircularProgress size="15px" color="inherit" /> : "REGISTER"}</button>
          <div>
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
