import { Link } from 'react-router-dom'
import '../Login/Login.css'

const Register = () => {
  return (
    <>
    <div className='login-container register-container' >
        <form>
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Second Name' />
          <input type="text" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>REGISTER</button>
          <div>
            <Link to="/login" >Already have an account?</Link>
          </div>
        </form>
    </div>
    </>
  )
}

export default Register