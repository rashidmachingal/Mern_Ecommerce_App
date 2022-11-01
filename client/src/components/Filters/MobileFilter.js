import BrandFilter from './BrandFilter'
import PriceFilter from './PriceFilter'
import { useEffect, useState } from 'react'
import { brandNames } from '../Filters/Data';
import './FilterStyles.css'
import { Close } from '@mui/icons-material';

const MobileFilter = ({setIsMobileFilter}) => {

  const [brandFilterData, setBrandFilterData] = useState([])
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    setBrandData(brandNames)
  }, [])

  return (
    <div className='mobile-filter-container'>
      <div onClick={()=>setIsMobileFilter(false)} className='filter-close'>
        <Close/>
      </div>
     <BrandFilter 
      finalData={brandFilterData} 
      setFinalData={setBrandFilterData} 
      brandData={brandData} 
      setBrandData={setBrandData} 
     />
      <PriceFilter/>
    </div>
  )
}

export default MobileFilter