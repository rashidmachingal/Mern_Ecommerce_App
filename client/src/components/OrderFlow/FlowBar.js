import { Check } from '@mui/icons-material'
import './OrderFlow.css'

const FlowBar = ({step}) => {
  return (
    <div className="order-flow-bar">

    <div className={`${step === 1 ? 'order-flow-item active' : 'order-flow-item'}`} >
      <span>{step ===  1 ? "1" : <Check/>}</span>
      <h4>Address</h4>
    </div>
    <hr style={{border:`${step === 1 ? '1px solid lightgrey' : ``}`}} className="order-flow-bar-line"></hr>

    <div className={`${step === 2 ? 'order-flow-item active' : 'order-flow-item'}`}>
     <span>{step > 2 ? <Check/> : "2"}</span>
     <h4>Summary</h4>
    </div>
    <hr style={{border:`${step === 1 ? '1px solid lightgrey' : ``}`}} className="order-flow-bar-line"></hr>

    <div className={`${step === 3 ? 'order-flow-item active' : 'order-flow-item'}`}>
     <span>3</span>
     <h4>Payment</h4>
    </div>

    </div>
  )
}

export default FlowBar