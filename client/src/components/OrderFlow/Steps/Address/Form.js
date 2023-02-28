import TextField from '@mui/material/TextField';
import './Address.css'

const Form = ({setIsAddress}) => {
  return (
    <>
    <div className="address-form-container">
      <div className="address-title">
        <h3>Add Delivery Address</h3>
      </div>
        <div className="address-input-group">
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Full Name" variant="outlined" />
          </div>
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Mobile Number" variant="outlined" />
          </div>
        </div>
        <div className="address-input-group">
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Pincode" variant="outlined" />
          </div>
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Locality" variant="outlined" />
          </div>
        </div>
        <div className="address-input">
        <TextField fullWidth multiline label="Address" rows={4}  />
        </div>
        <div className="address-input-group">
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="City/District/Town" variant="outlined" />
          </div>
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="State" variant="outlined" />
          </div>
        </div>
        <div className="address-input-group">
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Landmark" variant="outlined" />
          </div>
          <div className="address-item">
           <TextField fullWidth id="outlined-basic" label="Alternate Phone" variant="outlined" />
          </div>
        </div>
        <div className="address-input-group">
          <button onClick={()=>setIsAddress(true)}  >SAVE AND DELIVER HERE</button>
        </div>
    </div>
    </>
  )
}

export default Form