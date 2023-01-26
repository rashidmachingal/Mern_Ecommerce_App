import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <>
    <div className='login-container' >
        <form>
          <input required type="text" placeholder='Email' />
          <input required type="password" placeholder='Password' />
          <button>LOGIN</button>
          <div>
            <Link to="/">Forget Password?</Link>
            <Link to="/register" >Create New Account?</Link>
          </div>
        </form>
    </div>
    </>
  )
}

export default Login