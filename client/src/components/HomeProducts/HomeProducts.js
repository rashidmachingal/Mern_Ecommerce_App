import './HomeProducts.css'
import '../CategoryView/CategoryView.css'
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'
import { getCategoryProducts } from '../../api/products-api';

const HomeProducts = ({Category}) => {

  const [products, setProducts] = useState([])
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const scrl = useRef()

  useEffect(() => {
    getCategoryProducts(Category).then((res) => {
      setProducts(res.data)
    })
  }, [Category])
  

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
        <span>These are some of the most popular and top-selling items on Rash Cart that you can buy right now.</span>
      </div>
      <div onScroll={scrollCheck} ref={scrl} className="home-wrapper">
        {products.map((i)=>{
          return(
            <Link className="catview-product-box" to={"/product/"+i._id} style={{ textDecoration: 'none' }} key={i._id}>
             <div className="catview-product-image">
              <img src={i.images[0]} alt={i.title} />
             </div>
             <div className="catview-product-brand">
              <h3>{i.brand_name}</h3>
             </div>
             <div className="catview-product-title">
             {i.title.length <24 ? <h4>{i.title + " "+ i.title}</h4> : <h4>{i.title}</h4>}
             </div>
             <div className="catview-product-price">
               <h3>{i.offer_price}</h3> 
               <h6>{i.real_price}</h6>
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