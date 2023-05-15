import { useEffect, useRef, useState } from 'react'
import { Alert, CircularProgress } from '@mui/material';
import { AuthUser, VerifyOtp } from '../../../api/auth-api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { user_auth } from '../../../redux/user';
import { addToCart } from '../../../api/cart-api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../Login/Login.css'

const OtpVerification = ({ loginMethodData }) => {
    const inputRef = useRef({})
    const [resendTimeoutStart, setResendTimeoutStart] = useState(false);
    const [resendTimeLeft, setResendTimeLeft] = useState(23);
    const [isLoading, setIsLoading] = useState(false);
    const [wrongOTP, setWrongOTP] = useState(false)

    const [otp, setOtp] = useState({
        digitOne   : "",
        digitTwo   : "",
        digitThree : "",
        digitFour  : "",
        digitFive  : "",
        digitSix   : ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const reference = searchParams.get("ref")
    const { cartItems } = useSelector((state) => state.cart)

    // otp resend count down
    useEffect(() => {
       if (resendTimeoutStart) {
        const intervalId = setInterval(() => {
          setResendTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        if (resendTimeLeft === 0) {
          clearInterval(intervalId);
          setResendTimeoutStart(null);
        }

        return () => clearInterval(intervalId);
      }
    }, [resendTimeoutStart, resendTimeLeft]);

    // resend otp
    const handleResendOtp = () => {
      setResendTimeLeft(23)
      setResendTimeoutStart(true)
      AuthUser({loginMethodData}).then((res) => {
        toast.success("OTP Sented Successfully")
      })
    }

    // set otp values
    const handleChange = (event, index) => {
        const { name, value } = event.target
        if(/[a-z]/gi.test(value)) return
        setOtp(prev => ({...prev, [name]: value.at(-1)}))
        if(value && index < 5) inputRef.current[index + 1].focus()
    }

    const handleBackSpace = (event, index) => {
        if(event.key === "Backspace"){
            if(index > 0) inputRef.current[index - 1].focus()
        }
    }

    const handleOtpVerification = (e) => {
      e.preventDefault()
      setIsLoading(true)
      const completeOtp = Object.values(otp).join("");
      VerifyOtp({loginMethodData, completeOtp}).then((res) => {
        // if user verified login
        if(res.data.verified === true){
          console.log(res.data.authData)
          const authDetails = {
            token : res.data.token,
            authData : res.data.authData
          }

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
        }
      }).catch((err) => {
        console.log(err,"error")
        if(err.response.data.otpVerification === false){
          setIsLoading(false)
          setWrongOTP(true)
        }
      })
    }
    
  return (
    <>
    <div className='login-container' >
      <form onSubmit={handleOtpVerification} autoComplete='off' >
       <div className='login-title' >
        <h1>OTP Verification</h1>
        <p>Please enter the OTP that we sent to your email address. rashi******t@gmail.com</p>
       </div>
       <div className='otp-inputs' >
        {Object.keys(otp).map((keys, index) => {
        return <input 
                 ref={(element) => (inputRef.current[index] = element)}
                 key={index} 
                 value={otp[keys]} 
                 type="text" 
                 name={keys} 
                 onChange={(event) => handleChange(event, index)}
                 onKeyUp={(event) => handleBackSpace(event, index)}
                 />
        })}
       </div>
       <div className='resent-otp' >
        {resendTimeoutStart && <p>Resent OTP in 00:{resendTimeLeft}</p>}
        {!resendTimeoutStart && <span onClick={handleResendOtp} >Resent OTP</span>}
       </div>
       <div className='login-form-submit otp-submit' >
           <button disabled={isLoading} >{isLoading ? <CircularProgress size="15px" color="inherit" /> : "VERIFY"}</button>
        </div>
      </form>
      {wrongOTP && <Alert severity="error">Invalid OTP!</Alert>}
    </div>
    </>
  )
}

export default OtpVerification