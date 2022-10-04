import './Footer.css'
import {LocationOn,Phone,Email,WhatsApp, GitHub, LinkedIn, Twitter} from '@mui/icons-material';

const Footer = () => {

    const style = {color:"white"}

  return (
    <>
    <footer className="footerContainer">
        <div className="footer-one">
          <div className="footer-box-1">
            <ul>
                <li><LocationOn style={style}/> Calicut Airport, Malapuuram</li>
                <li><Phone style={style}/> +91 9876543210</li>
                <li><Email style={style}/> rashileocontact@gmail.com</li>
                <li><WhatsApp style={style}/> +91 9876543210</li>
            </ul>
          </div>
          <div className="footer-box-2">
            <h3>Pages</h3>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
          </div>
          <div className="footer-box-3">
            <h3>Newsletter</h3>
            <p>Get more information about RashCart and more update</p>
            <div>
                <input type="text" placeholder='Enter Email Adress' />
                <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-two">
          <div className="footer-social-icons">
            <img      style={{cursor:"pointer"}} src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="instagram" />
            <GitHub   style={{color: "#171515", cursor:"pointer"}} fontSize="small" />
            <LinkedIn style={{color: "0077b5",cursor:"pointer"}} fontSize="small" />
            <Twitter  style={{color: "00acee",cursor:"pointer"}} fontSize="small" />
          </div>
          <div className="footer-credit">
          <p>Developed by <span>Rashid Machingal</span></p>
          </div>
        </div>
    </footer>
    </>
  )
}

export default Footer