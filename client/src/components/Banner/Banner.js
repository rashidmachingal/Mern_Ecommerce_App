import "./Banner.css";
import Slider from "react-slick";
import { BannerData } from "./Data";
import { useRef } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Banner = () => {
  const slider = useRef(null);
  let settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
      <div className="bannerContainer">
      <Slider ref={slider} {...settings}>
        {BannerData.map((data)=> {
          return(
          <div key={data.id} className="banner-item-main">
           <div className="banner-item">
            <div className="banner-left">
             <h1>{data.offer}</h1>
             <p>{data.item}</p>
             <button>SHOP NOW!</button>
            </div>
            <div className="banner-right">
             <div style={{background:data.color}} className="banner-circle"></div>
             <img src={data.url} alt="img" />
            </div>
           </div>
          </div>
          )
        })}
      </Slider>
        <div style={{left:"10px"}} className="banner-arrow"  onClick={() => slider?.current?.slickPrev()}><ArrowLeftIcon/></div>
        <div style={{right:"10px"}}  className="banner-arrow" onClick={() => slider?.current?.slickNext()}><ArrowRightIcon/></div>
      </div>
  )
};

export default Banner;
