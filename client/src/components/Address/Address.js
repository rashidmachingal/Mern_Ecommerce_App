import { useState } from 'react'
import Form from './Form'
import './Address.css'

const Address = ({setActive}) => {
  const [isAddress, setIsAddress] = useState(false)

  return (
    <div className='address-container'>
      {isAddress && 
      <div className="address-box">
        <p>
          Anyones Address with Full Details, 
          673212, Near Calicut Airport, Malappuram
        </p>
        <div>Edit</div>
      </div>
      }
     {!isAddress && <Form setIsAddress={setIsAddress} />}

     {isAddress && <button onClick={()=>setActive(2)} className='address-conti-btn' >Continue</button>}

    </div>
  )
}

export default Address