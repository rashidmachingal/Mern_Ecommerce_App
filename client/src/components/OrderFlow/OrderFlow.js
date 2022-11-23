import { useState } from 'react'
import Address from '../Address/Address'
import SelectPayment from '../SelectPayment/SelectPayment'
import FlowBar from './FlowBar'
import './OrderFlow.css'

const OrderFlow = () => {

  const [active, setActive] = useState(1)

  return (
    <div className='order-flow-container'>
      <FlowBar active={active} />
      {active === 1 ? <Address setActive={setActive} /> : <SelectPayment setActive={setActive} />}
    </div>
  )
}

export default OrderFlow