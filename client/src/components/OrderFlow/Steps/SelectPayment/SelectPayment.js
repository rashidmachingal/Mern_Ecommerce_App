import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './SelectPayment.css'

const SelectPayment = ({setStep}) => {
  return (
    <div className='address-container' >
        <div className="back-btn">
            <ChevronLeftIcon onClick={()=> setStep(prev=> prev-1)} fontSize='medium' />
        </div>
        <div className="select-payment-title">
            <h3>Select Payment Method</h3>
        </div>
        <form className="select-payment-box">
            <div>
                <input name='method' value="cod" type="radio" />
                <label>Cash on Delivery</label>
            </div>
            <div>
                <input defaultChecked name='method' value="online" type="radio" />
                <label>Online Payment</label>
            </div>
                <button>Continue</button>
        </form>
    </div>
  )
}

export default SelectPayment