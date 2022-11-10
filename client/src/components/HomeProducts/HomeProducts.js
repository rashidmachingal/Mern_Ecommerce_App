import './HomeProducts.css'
import '../CategoryView/CategoryView.css'
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'

const HomeProducts = ({data}) => {

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
        <h2>{data[0].heading}</h2>
      </div>
      <div className="homepro-desc">
        <span>{data[0].desc}</span>
      </div>
      <div onScroll={scrollCheck} ref={scrl} className="home-wrapper">
        {data[1].map((i)=>{
          return(
            <Link className="catview-product-box" to={"/product/"+i.id} style={{ textDecoration: 'none' }} key={i.id}>
             <div className="catview-product-image">
              <img src={i.image} alt={i.title} />
             </div>
             <div className="catview-product-brand">
              <h3>{i.brand}</h3>
             </div>
             <div className="catview-product-title">
             {i.title.length <24 ? <h4>{i.title + " "+ i.title}</h4> : <h4>{i.title}</h4>}
             </div>
             <div className="catview-product-price">
               <h3>₹{i.price}</h3> 
               <h6>₹2000</h6>
               <h5>(35% OFF)</h5>
             </div>
            </Link>
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