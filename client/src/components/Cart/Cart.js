import { DeleteOutline } from '@mui/icons-material'
import { Divider, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartItemCount, removeItem } from '../../api/cart-api'
import { cart_item_count, remove_item } from '../../redux/cart'
import './Cart.css'

const Cart = () => {

    const {cartItems} = useSelector((state) => state.cart)
    const { userId, token } = useSelector((state) => state.user)
    const { itemsPrice, deliveryCharge, dicount, totalAmount } = useSelector((state) => state.price)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    // remove item from cart
    const handleRemove = (proId,proIdx) => {  
      // guest cart item remove
      if(token === null){
        let guestCart = JSON.parse(localStorage.getItem('cartItems'))
        guestCart.splice(proIdx,1)
        localStorage.setItem('cartItems', JSON.stringify(guestCart))
        dispatch(remove_item(proIdx))
      }else{
        // user cart item remove
        removeItem(proId,userId).then(()=>{
          dispatch(remove_item(proIdx))
        })
      }
    }

    // cart item count
    const handleCartCount = (countType, currentCount,productId,productIndex) => {
      // cart count data
      const cartCountData = {
        "userId" : userId,
        "countType" : countType,
        "productId" : productId,
        "currentCount" : currentCount
      }

      // guest user cart count
      if(token === null) {
        let guestCart = JSON.parse(localStorage.getItem('cartItems'))
        if(countType === "increment") {
          guestCart[productIndex].quantity = currentCount + 1
          localStorage.setItem('cartItems', JSON.stringify(guestCart))
          dispatch(cart_item_count({countType, productIndex,currentCount}))
        }

        if(countType === "decrement") {
          if(currentCount === 1){
            guestCart.splice(productIndex, 1)
            localStorage.setItem('cartItems', JSON.stringify(guestCart))
            dispatch(cart_item_count({countType, productIndex,currentCount}))
            return
          }
          guestCart[productIndex].quantity = currentCount - 1
          localStorage.setItem('cartItems' , JSON.stringify(guestCart))
          dispatch(cart_item_count({countType, productIndex,currentCount}))
        }

      }else{
      // user cart count  
      cartItemCount(cartCountData).then(() => {
        dispatch(cart_item_count({countType, productIndex,currentCount}))
      })
      }
    }

    // click place order button
    const handlePlaceOrder = () => {
      if(token === null) return navigate("/login?ref=placeorder")
      navigate("/checkout")
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
                <img alt='empty_cart' src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" />
              </div>
            }
            {cartItems?.map((i,idx)=>{
                return(
               <div key={i?.productId} className="cart-item">
                <div className="cart-item-img">
                    <img src={i?.product_image} alt="cart-item" />
                </div>
                <div className="cart-item-name">
                    <h3>{i?.product_name}</h3>
                    <h5>Size :{i?.size}</h5>
                </div>
                <div className="cart-item-quantity">
                    <button onClick={()=> handleCartCount("decrement",i?.quantity,i?.productId,idx)}>-</button>
                    <span>{i?.quantity}</span>
                    <button onClick={()=> handleCartCount("increment",i?.quantity,i?.productId,idx)} >+</button>
                </div>
                <div className="cart-item-price">
                    <h3>₹{i?.real_price * i?.quantity}</h3>
                    <h3>₹{i?.offer_price * i?.quantity}</h3>
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
          {cartItems.length !== 0 && 
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
            <div><h3>₹{totalAmount}</h3></div>
           </div>
           <Divider/>
           <div className="order-summary-checkout">
            <button onClick={handlePlaceOrder} >PLACE ORDER</button>
           </div>
          </div>}
        </div>
    </div>
  )
}

export default Cart