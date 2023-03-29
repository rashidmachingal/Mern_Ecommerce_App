import { useEffect, useRef, useState } from 'react'
import '../Login/Login.css'

const OtpVerification = () => {
    const inputRef = useRef({})
    const [resendTimeoutStart, setResendTimeoutStart] = useState(false);
    const [resendTimeLeft, setResendTimeLeft] = useState(23);
    const [otp, setOtp] = useState({
        digitOne   : "",
        digitTwo   : "",
        digitThree : "",
        digitFour  : "",
        digitFive  : "",
        digitSix   : ""
    })

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
    
  return (
    <>
    <div className='login-container' >
      <form autoComplete='off' >
       <div className='login-title' >
        <h1>OTP Verification</h1>
        <p>
          Please enter the OTP that we sent to your email address. rashi******t@gmail.com
        </p>
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
           <button>VERIFY</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default OtpVerification