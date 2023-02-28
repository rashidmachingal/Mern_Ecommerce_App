import { ChevronLeft } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Summary.css'

const Summary = ({setStep}) => {
    const { cartItems } = useSelector((state) => state.cart)

     // price details
    const [itemsPrice, setItemsPrice] = useState(0)
    // eslint-disable-next-line
    const [deliveryCharge, setDeliveryCharge] = useState(50)
    // eslint-disable-next-line
    const [dicount, setDiscount] = useState(55)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        let updatedItemsPrice = 0;
        cartItems?.map((i) => {
          return updatedItemsPrice += i?.offer_price * i?.quantity;
        });
        setItemsPrice(updatedItemsPrice);
        setTotalAmount(deliveryCharge + itemsPrice - dicount);
      }, [cartItems, deliveryCharge, dicount, itemsPrice]);

  return (
    <div className="address-container" >
        <div className="back-btn">
            <ChevronLeft onClick={()=> setStep(prev=>prev-1)} fontSize='medium' />
        </div>
        <div className="select-payment-title">
            <h3>Order Summary</h3>
        </div>
        <div className='summary-container' >
            <div className='summary-items'>
            {cartItems?.map((i,idx)=>{
                return(
                 <div key={i?.productId} className='summary-item' >
                  <div className="cart-item-img">
                    <img src={i?.product_image} alt="cart-item" />
                  </div>
                  <div className="cart-item-name">
                    <h3>{i?.product_name}</h3>
                    <h5>Size :{i?.size}</h5>
                </div>
                <div className="cart-item-quantity">
                    <span>Quantity: {i?.quantity}</span>
                </div>
                <div className="cart-item-price">
                    <h3>₹{i?.real_price * i?.quantity}</h3>
                    <h3>₹{i?.offer_price * i?.quantity}</h3>
                </div>
                 </div>
                )
            })}
            </div>

            <div className="order-summary">
           <div className="price-details">
           <h3>PRICE DETAILS</h3>
           </div>
           <Divider/>
           <div className="order-summary-details">
            <div><h3>Price ({cartItems?.length} items)</h3></div>
            <div><h3>₹{itemsPrice}</h3></div>
           </div>
           <div className="order-summary-details">
            <div><h3>Delivery Charges</h3></div>
            <div><h3>₹{deliveryCharge}</h3></div>
           </div>
           {dicount !== 0 && 
             <div className="order-summary-details">
              <div><h3>Discount</h3></div>
              <div><h3 style={{color:"green"}} >-₹{dicount}</h3></div>
             </div>
            }
           
           <Divider/>
           <div className="order-summary-details total-amount">
            <div><h3>Total Amount</h3></div>
            <div><h3>₹{totalAmount}</h3></div>
           </div>
           <Divider/>
          </div>

            <button onClick={()=>setStep(prev=> prev+1)} className='address-conti-btn' >Continue</button>
        </div>
    </div>
  )
}

export default Summary