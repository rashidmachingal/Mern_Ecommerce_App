import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { AuthUser } from '../../../api/auth-api'
import { formValidation } from '../../../utils/formValidation';
import { OtpVerifcation } from '../../../components'
import './Login.css'

const Login = () => {
  
  const [mobile, setMobile] = useState({mobile:""})
  const [email, setEmail] = useState({email: ""})
  const [isLoading, setIsLoading] = useState(false)
  const [renderOtp, setRenderOtp] = useState(false)
  const [loginMethod, setLoginMethod] = useState("mobile")
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === "mobile") setMobile({mobile:value})
    if(name === "email") setEmail({email:value})
  }

  const handleLogin = (e) => {
      e.preventDefault()
      setIsLoading(true)
      const dataForValidation = loginMethod === "mobile" ? mobile : email
      const newErrors = formValidation(dataForValidation);
      setErrors(newErrors)
      if(Object.keys(newErrors).length === 0){
        userLogin()
      }else{
          setIsLoading(false)
      }
  }

  const userLogin = () => {
    const dataForValidation = loginMethod === "mobile" ? mobile : email
    AuthUser(dataForValidation).then((res) => {

      // render otp component if otp verification needed
      if(res.data.needOTPVerification === true) setRenderOtp(true)
      setIsLoading(false)

    }).catch((err) => {
      if(err?.response?.data?.auth === false){
        setIsLoading(false)
      }else{
        setIsLoading(false)
      }
    })
  }

  return (
    <>
    { !renderOtp && <div className='login-container' >
        <form onSubmit={handleLogin} autoComplete='off' >
          <div className='login-title' >
           <h1>Login or Signup</h1>
          </div>
          <div className='login-form-group'>
            <div>
             <label>{loginMethod === "email" ? "Email" : "Mobile"}</label>
             {loginMethod === "email" && <label onClick={()=> setLoginMethod("mobile")} >Login with Mobile?</label>}
             {loginMethod === "mobile" && <label onClick={()=> setLoginMethod("email")} >Login with Email?</label>}
            </div>
            <div className='login-form-input' >
             {loginMethod === "mobile" && <div><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/20px-Flag_of_India.svg.png" alt="india" />+91 </div>}
             <input 
              onChange={handleChange}
              value={loginMethod === "mobile" ? mobile.mobile : email.email} 
              name={loginMethod === "mobile" ? "mobile" : "email"} 
              type="text" 
              placeholder={`Enter Your ${loginMethod === "mobile" ? "Mobile" : "Email"}`} />
            </div>
            <span>{loginMethod === "mobile" ? errors.mobile : errors.email}</span>
          </div>
          <div className='login-form-submit'>
           <button disabled={isLoading} >{isLoading ? <CircularProgress size="15px" color="inherit" /> : "CONTINUE"}</button>
          </div>
        </form>
    </div>}
    {/* render otp component */}
        { renderOtp && <OtpVerifcation loginMethodData={loginMethod === "mobile" ? mobile : email} />}
    </>
  )
}

export default Login