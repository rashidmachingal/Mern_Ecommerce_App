import { DeleteOutline } from '@mui/icons-material'
import { Divider, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import './Cart.css'

const Cart = () => {

    const {cartItems} = useSelector((state) => state.cart)

  return (
    <div className='cart-container'>
        <div className="cart-title">
         <h2>Shopping Bag</h2>
        </div>
        <div className='cart-main' >
          <div className="cart-items">
            {cartItems.map((i)=>{
                return(
               <div className="cart-item">
                <div className="cart-item-img">
                    <img src={i.product_image} alt="cart-item" />
                </div>
                <div className="cart-item-name">
                    <h3>{i.product_name}</h3>
                    <h5>Size :{i.size}</h5>
                </div>
                <div className="cart-item-quantity">
                    <button>-</button>
                    <span>{i.quantity}</span>
                    <button>+</button>
                </div>
                <div className="cart-item-price">
                    <h3>₹{i.real_price}</h3>
                    <h3>₹{i.offer_price}</h3>
                </div>
                <div className="cart-item-remove">
                    <Tooltip title="remove">
                     <DeleteOutline/>
                    </Tooltip>
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
            <div><h3>Price (2 items)</h3></div>
            <div><h3>₹24,991</h3></div>
           </div>
           <div className="order-summary-details">
            <div><h3>Delivery Charges</h3></div>
            <div><h3>₹100</h3></div>
           </div>
           <div className="order-summary-details">
            <div><h3>Discount</h3></div>
            <div><h3 style={{color:"green"}} >-₹560</h3></div>
           </div>
           <div className="order-promo-code">
              <div>
              <h3>Promo Code</h3>
              </div>
            <div>
              <input type="text" placeholder='Enter Code' />
              <button>APPLY</button>
            </div>
           </div>
           <Divider/>
           <div className="order-summary-details total-amount">
            <div><h3>Total Amount</h3></div>
            <div><h3>₹3500</h3></div>
           </div>
           <Divider/>
           <div className="order-summary-checkout">
            <h3>₹3500</h3>
            <button>PLACE ORDER</button>
           </div>
          </div>
        </div>
    </div>
  )
}

export default Cart