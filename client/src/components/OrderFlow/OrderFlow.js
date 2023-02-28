import { useState } from 'react'
import FlowBar from './FlowBar'
import Address from './Steps/Address/Address'
import SelectPayment from './Steps/SelectPayment/SelectPayment'
import './OrderFlow.css'
import Summary from './Steps/Summary/Summary'

const OrderFlow = () => {

  const [step, setStep] = useState(1)

  switch (step) {
    case 1:
      return(
        <div className='order-flow-container'>
          <FlowBar step={step} />
          <Address setStep={setStep} />
        </div>
      )    
    case 2:
      return(
        <div className='order-flow-container'>
          <FlowBar step={step} />
          <Summary setStep={setStep} />
        </div>
      )    
    case 3:
      return(
        <div className='order-flow-container'>
          <FlowBar step={step} />
          <SelectPayment setStep={setStep} />
        </div>
      )    
  
    default:
  }
}

export default OrderFlow