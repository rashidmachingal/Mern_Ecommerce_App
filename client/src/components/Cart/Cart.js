import { DeleteOutline } from '@mui/icons-material'
import { Divider, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../../api/cart-api'
import { remove_item } from '../../redux/cart'
import './Cart.css'

const Cart = () => {

    const {cartItems} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    
    // remove item from cart
    const handleRemove = (proId,proIdx) => {
        removeItem(proId,"user_1").then(()=>{
            dispatch(remove_item(proIdx))
        })
    }

  return (
    <div className='cart-container'>
        <div className="cart-title">
         <h2>Your Cart</h2>
        </div>
        <div className='cart-main' >
          <div className="cart-items">
            
            {cartItems.length === 0 && 
              <div className='cart-empty' >
                <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" />
              </div>
            }
            {cartItems?.map((i,idx)=>{
                return(
               <div key={i.productId} className="cart-item">
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
                    <Tooltip onClick={()=> handleRemove(i.productId,idx)} title="remove">
                     <DeleteOutline />
                    </Tooltip>
                </div>
              </div>
                )
            })}
          </div>
          {cartItems.length != 0 && 
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
          </div>}
        </div>
    </div>
  )
}

export default Cart