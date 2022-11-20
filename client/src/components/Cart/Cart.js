import { DeleteOutline } from '@mui/icons-material'
import { Divider, Tooltip } from '@mui/material'
import './Cart.css'

const Cart = () => {

  return (
    <div className='cart-container'>
        <div className="cart-title">
         <h2>Shopping Bag</h2>
        </div>
        <div className='cart-main' >
          <div className="cart-items">
            <div className="cart-item">
                <div className="cart-item-img">
                    <img src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/19314678/2022/7/30/6e4c71fc-769c-433c-acb5-309a3794bec41659183107403MactreeMenOliveGreenTexturedSuedeFashion1.jpg" alt="cart-item" />
                </div>
                <div className="cart-item-name">
                    <h3>Men Navy Blue Polo Collar Solid Green</h3>
                    <h5>Size :S</h5>
                </div>
                <div className="cart-item-quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
                <div className="cart-item-price">
                    <h3>₹899</h3>
                    <h3>₹799</h3>
                </div>
                <div className="cart-item-remove">
                    <Tooltip title="remove">
                     <DeleteOutline/>
                    </Tooltip>
                </div>
            </div>
            <div className="cart-item">
                <div className="cart-item-img">
                    <img src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/19314678/2022/7/30/6e4c71fc-769c-433c-acb5-309a3794bec41659183107403MactreeMenOliveGreenTexturedSuedeFashion1.jpg" alt="cart-item" />
                </div>
                <div className="cart-item-name">
                    <h3>Men Navy Blue Polo Collar Solid Green</h3>
                    <h5>Size :S</h5>
                </div>
                <div className="cart-item-quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
                <div className="cart-item-price">
                    <h3>₹899</h3>
                    <h3>₹799</h3>
                </div>
                <div className="cart-item-remove">
                    <Tooltip title="remove">
                     <DeleteOutline/>
                    </Tooltip>
                </div>
            </div>
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