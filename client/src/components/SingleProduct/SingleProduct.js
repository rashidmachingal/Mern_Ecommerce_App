import {sampleProducts} from '../HomeProducts/Data';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { ArticleOutlined, FavoriteBorder, ShoppingBag } from '@mui/icons-material';
import './SingleProduct.css';
import Slider from "react-slick";

const SingleProduct = () => {

const [slideIndex, setSlideIndex] = useState(0)
const handleSlide = (idx) => {
  let value = idx*23.33
  setSlideIndex(value)
}

let settings = {
  dots: true,
  infinite: false,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};


  return (
    <>
    <div className="product-container">
        <div className="product-img-slider">
          <div className="mobile-img-slider">
            <Slider {...settings}>
            {sampleProducts.slice(1,5).map((i) => {
              return <img src={i.image} alt={i.id} key={i.id} />
            })}
            </Slider>
          </div>
          <div className="top">
            {sampleProducts.slice(1,5).map((i) => {
              return <img style={{transform:`translateX(${-slideIndex}rem)`}} src={i.image} alt={i.id} key={i.id} />
            })}
          </div>
          <div className="bottom">
          {sampleProducts.slice(1,5).map((i,idx) => {
              return <img onClick={()=>handleSlide(idx)} src={i.image} alt={i.id} key={i.id} />
            })}
          </div>
        </div>
      <div className="product-details-section">
        <div className="product-brand-name">
          <h2>Louis Philippe</h2>
        </div>
        <div className="product-title">
          <h3>Men Navy Blue Polo Collar T-shirt</h3>
        </div>
        <div className="product-rating">
         <Rating name="size-medium" value={3} style={{color:"#418cd2"}} readOnly />
         <span style={{color:"grey"}} >- 23 Ratings</span>
        </div>
        <div className="breaking-line"></div>
        <div className="product-price">
          <h2>₹1259</h2> 
          <h3>₹1899</h3>
          <h3>35% OFF</h3>
        </div>
        <div className="size-chart">
          <h4>SELECT SIZE</h4>
          <button>SIZE CHART</button>
        </div>
        <div className="product-select-size">
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <button>XL</button>
        </div>
        <div className="add-to-cart">
          <button><ShoppingBag/> ADD TO BAG</button>
          <button><FavoriteBorder/> WISHLIST</button>
        </div>
        <div className="product-info">
          <h4>PRODUCT DETAILS <ArticleOutlined/></h4>
          <p>
            Navy blue striped opaque Formal shirt ,has a 
            button-down collar, button placket, 1 patch 
            pocket, long regular sleeves, curved hem
          </p>
          <div className="other-info">
            <h4>Size & Fit</h4>
            <p>Fit: Slim Fit</p>
            <p>The model (height 6') is wearing a size 40</p>
          </div>
          <div className="other-info">
            <h4>Material & Care</h4>
            <p>100% Cotton</p>
            <p>Machine-wash</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleProduct