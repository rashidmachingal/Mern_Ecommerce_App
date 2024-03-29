import { CircularProgress, Rating } from '@mui/material';
import { AddShoppingCart, ArticleOutlined, FavoriteBorder, ShoppingCartCheckout } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom'
import { getSingleProduct } from '../../api/products-api';
import { addToCart } from '../../api/cart-api';
import { add_to_cart } from '../../redux/cart';
import { useDispatch, useSelector } from 'react-redux'
import Reviews from '../Reviews/Reviews';
import ImageSlider from './ImageSlider';
import './SingleProduct.css';
import { toast } from 'react-toastify';

const SingleProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state)=> state.cart)
  const { userId, token } = useSelector((state)=> state.user)

  const [product, setProduct] = useState([])
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [isCliked, setIsClicked] = useState(false)

  // product details for cart
  const itemForCart = {
    productId : product[0]?._id,
    quantity : 1,
    size : selectedSize,
    product_name: product[0]?.title,
    product_brand: product[0]?.brand_name,
    product_image: product[0]?.images[0],
    real_price: product[0]?.real_price,
    offer_price: product[0]?.offer_price,
  }

  // fetch single product
  useEffect(() => {
    getSingleProduct(id).then((res) => {
      setProduct([res.data]);
    })
  }, [id])

  // check this product added to cart
  useEffect(() => {
    const isAdded = cartItems.find(item => item.productId ===  product[0]?._id);
    if(isAdded) setIsAddedToCart(true)
  }, [cartItems,product])
  

// add to cart 
const handleAddToCart = () => {
  if(selectedSize.length === 0) return toast.warn("Please select a size")
  setIsClicked(true)
  const cartItemDetails = {
    userId: userId,
    cartItems: [itemForCart],
    updatedItem  : itemForCart
  }

  // guest user add to cart
  if(token === null){
    let guestCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    guestCart.push(itemForCart)
    localStorage.setItem('cartItems', JSON.stringify(guestCart))
    dispatch(add_to_cart(itemForCart))
    setIsClicked(false)
    toast.success("Product added to cart")
    setSelectedSize("")
  }else{
    // add to cart api call
    addToCart(cartItemDetails).then(()=> {
      dispatch(add_to_cart(itemForCart))
      setIsClicked(false)
      toast.success("Product added to cart")
      setSelectedSize("")
    })
  }

}

  return (
    <>
    <div className="product-container">
        <ImageSlider product={product} />
      <div className="product-details-section">
        <div className="product-brand-name">
          <h2>{product[0]?.brand_name}</h2>
        </div>
        <div className="product-title">
          <h3>{product[0]?.title}</h3>
        </div>
        <div className="product-rating">
         <Rating name="size-medium" value={3} style={{color:"#418cd2"}} readOnly={true} />
         <span style={{color:"grey"}} >- 23 Ratings</span>
        </div>
        <div className="breaking-line"></div>
        <div className="product-price">
          <h2>{product[0]?.offer_price}</h2> 
          <h3>{product[0]?.real_price}</h3>
          <h3>35% OFF</h3>
        </div>
        <div className="size-chart">
          <h4>SELECT SIZE</h4>
          <button>SIZE CHART</button>
        </div>
        <div className="product-select-size">
          {product[0]?.sizes?.map((size, idx) => (
              <button 
               className={size===selectedSize ? "selected-size" : null } 
               onClick={()=>setSelectedSize(size)} key={idx} >{size}</button>
           ))}
        </div>
        <div className="add-to-cart">
          {isAddedToCart === false ? 
            <button onClick={handleAddToCart} disabled={isCliked} >
              {isCliked === false && <AddShoppingCart/>}
              {isCliked ? <CircularProgress color="inherit"  size="23px" /> : " ADD TO CART"}
            </button> 
           : <button style={{background:"orange"}} onClick={()=>navigate("/cart")} ><ShoppingCartCheckout/>GO TO CART</button> }
             <button><FavoriteBorder/> WISHLIST</button>
        </div>
        <div className="product-info">
          <h4>PRODUCT DETAILS <ArticleOutlined/></h4>
          <p>{product[0]?.description}</p>
          {product[0]?.other_details?.map((i,idx)=>{
            return (
              <div key={idx} className="other-info">
                <h4>{i.title}</h4>
                {i?.det.map((i,idx)=>{
                  return <p key={idx} >{i}</p>
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
    <Reviews/>
    </>
  )
}

export default SingleProduct