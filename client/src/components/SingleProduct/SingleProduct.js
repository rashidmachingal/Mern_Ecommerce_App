import './SingleProduct.css';
import {sampleProducts} from '../HomeProducts/Data';
import Slider from "react-slick";
import { useState } from 'react';

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

      </div>
    </div>
    </>
  )
}

export default SingleProduct