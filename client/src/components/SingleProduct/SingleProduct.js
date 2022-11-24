import {sampleProducts} from '../HomeProducts/Data';
import { Rating } from '@mui/material';
import { ArticleOutlined, FavoriteBorder, ShoppingBag } from '@mui/icons-material';
import { useRef } from 'react';
import Slider from "react-slick";
import './SingleProduct.css';

const SingleProduct = () => {

  const slider = useRef(null);

let settings = {
  infinite: false,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  dontAnimate:true
};

const handlePagination = (index) => {
  slider?.current?.slickGoTo(index);
}


  return (
    <>
    <div className="product-container">
        <div className="product-img-slider-main">
          <div className="product-img-slider">
            <Slider ref={slider} {...settings}>
            {sampleProducts.slice(1,5).map((i) => {
              return <img src={i.image} alt={i.id} key={i.id} />
            })}
            </Slider>
          </div>
          <div className="product-img-pagination">
            {sampleProducts.slice(1,5).map((i,index) => {
              return <img onClick={()=>handlePagination(index)} src={i.image} alt={i.id} key={i.id} />
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