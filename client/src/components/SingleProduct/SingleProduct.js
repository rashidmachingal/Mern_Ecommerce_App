import { Rating } from '@mui/material';
import { AddShoppingCart, ArticleOutlined, FavoriteBorder, ShoppingCartCheckout } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../../api/products-api';
import { Link, useParams } from 'react-router-dom';
import { addToCartApi } from '../../api/cart-api';
import { add_to_cart } from '../../redux/cart';
import { useNavigate,  } from 'react-router-dom'
import Reviews from '../Reviews/Reviews';
import AlertMessage from '../AlertMessage/AlertMessage';
import './SingleProduct.css';
import ImageSlider from './ImageSlider';

const SingleProduct = () => {

  const { id } = useParams();
  const { cartItems } = useSelector((state)=> state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectSizeSnack, setSelectSizeSnack] = useState(false)
  const [addedSuccess, setAddedSuccess] = useState(false)

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
  

// add to cart api call
const addToCart = () => {
  const cartItemDetails = {
    userId: "user_1",
    cartItems: [
      {
        productId : product[0]?._id,
        quantity : 1,
        size : selectedSize,
        product_name: product[0]?.title,
        real_price: product[0]?.real_price,
        offer_price: product[0]?.offer_price,
      }
    ]
  }

addToCartApi(cartItemDetails).then((res)=> {
    dispatch(add_to_cart(res.data.cartItems))
  })
}

const handleAddToCart = () => {
  if(cartItems.length === 0){
    if(selectedSize === "") {
      setSelectSizeSnack(true)
      return
    }
    addToCart()
    setAddedSuccess(true)
    setSelectedSize("")
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
            <button onClick={handleAddToCart} ><AddShoppingCart/> ADD TO CART</button> 
           : <button onClick={()=>navigate("/cart")} ><ShoppingCartCheckout/>GO TO CART</button> }
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

    {/* alerts messages */}
     <AlertMessage type="warning"  open={selectSizeSnack} setOpen={setSelectSizeSnack} message="Please select a size" />
     <AlertMessage type="success"  open={addedSuccess} setOpen={setAddedSuccess} message="Product added to cart" />
    </>
  )
}

export default SingleProduct