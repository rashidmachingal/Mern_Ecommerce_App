import './HomeProducts.css'
import { topSellingData } from './Data'
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

const HomeProducts = () => {

  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const scrl = useRef()

  useEffect(() => {
    //Check width of the scollings
    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);

   //This will check scroll event and checks for scroll end
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const handleSlide = (shift) => {
    scrl.current.scrollLeft += shift;
  };

  return (
    <>
     <div className="homeProContainer">
      <div className="homepro-title">
        <h2>Top Selling Products</h2>
      </div>
      <div className="homepro-desc">
        <span>
         These are some of the most popular and top-selling items on Rash
         Cart that you can buy right now.
        </span>
      </div>
      <div onScroll={scrollCheck} ref={scrl} className="home-wrapper">
        {topSellingData.map((i)=>{
          return(
            <div key={i.id} className="homepro-box">
             <img src={i.image} alt="img" />
             <div className="homepro-titles">
              <h3>{i.brand}</h3>
              <h4>{i.title}</h4>
             </div>
             <div className="homepro-price">
              <h3>₹{i.price}</h3>
             </div>
            </div>
          )
        })}
      </div>
      { scrollX !== 0 && <div onClick={()=>handleSlide(-820)} style={{left:"70px"}}  className="homepro-arrow"><ArrowBackIos style={{marginLeft:"7px"}} /></div>}
      { !scrolEnd && <div onClick={()=>handleSlide(+820)} style={{right:"70px"}} className="homepro-arrow"><ArrowForwardIos/></div>}
     </div>
    </>
  )
}

export default HomeProducts