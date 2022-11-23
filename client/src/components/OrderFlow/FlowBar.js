import { Check } from '@mui/icons-material'
import './OrderFlow.css'

const FlowBar = ({active}) => {
  return (
    <div className="order-flow-bar">
    <div className="order-flow-item">
      <span><Check/></span>
      <h4>Login</h4>
    </div>
      
     <hr className="order-flow-bar-line"></hr>

    <div className={`${active === 1 ? 'order-flow-item active' : 'order-flow-item'}`} >
      <span>{active ===  1 ? "2" : <Check/>}</span>
      <h4>Address</h4>
    </div>

    <hr style={{border:`${active === 1 ? '1px solid lightgrey' : ``}`}} className="order-flow-bar-line"></hr>

    <div className={`${active === 2 ? 'order-flow-item active' : 'order-flow-item'}`}>
     <span>3</span>
     <h4>Payment</h4>
    </div>

    </div>
  )
}

export default FlowBar