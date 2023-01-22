import { useRef } from 'react';
import Slider from 'react-slick';
import './SingleProduct.css';

const ImageSlider = ({product}) => {
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
    <div className="product-img-slider-main">
          <div className="product-img-slider">
           <Slider ref={slider} {...settings}>
            {product[0]?.images?.map((img, idx) => (
              <img key={idx} src={img} alt={img} />
             ))}
           </Slider>
          </div>
          <div className="product-img-pagination">
            {product[0]?.images?.map((img, idx) => (
              <img onClick={()=>handlePagination(idx)} key={idx} src={img} alt={img} />
             ))}
          </div>
    </div>
    </>
  )
}

export default ImageSlider