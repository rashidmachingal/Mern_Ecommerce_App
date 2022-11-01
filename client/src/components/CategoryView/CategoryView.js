import { useEffect, useState } from 'react';
import { Close , FilterList } from '@mui/icons-material';
import { brandNames } from '../Filters/Data';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BrandFilter from '../Filters/BrandFilter';
import PriceFilter from '../Filters/PriceFilter';
import MobileFilter from '../Filters/MobileFilter';
import './CategoryView.css'

const CategoryView = () => {

  const [brandFilterData, setBrandFilterData] = useState([])
  const [brandData, setBrandData] = useState([]);
  const [isMobileFilter, setIsMobileFilter] = useState(false);

  useEffect(() => {
    setBrandData(brandNames)
  }, [])

  const removeBrandFilter = (id) => {
    const temp = brandFilterData
    const newFilter = temp.filter((item) => item.id !== id);
    setBrandFilterData(newFilter)

    //remove check
    const xyz = brandData
    for (let index = 0; index < brandData.length; index++) {
      if(xyz[index].id === id){
        xyz[index].checked = false
        setBrandData(xyz)
      }
    }
  }

  return (
    <>
    <div className="categoryViewContainer">
        <div className="catview-breadcrumps">
        <Breadcrumbs aria-label="breadcrumb">
          <span>Home</span>
          <span>Categories</span>
          <h5>Formal-Shirts</h5>
        </Breadcrumbs>
        </div>
        <div className="catview-title-filters">
            <div>
             <h4>Formal Shirts For Men</h4>
            </div>
            <div>
              {brandFilterData.map((i,idx)=>{
                return(
                <button key={idx} >{i.name} 
                  <Close onClick={()=>removeBrandFilter(i.id)} style={{fontSize:"15px", cursor:"pointer"}} /> 
                </button>
                )
              })}
            </div>
            <div onClick={()=>setIsMobileFilter(true)} className="mobile-filter">
              <span>Filter</span><FilterList style={{fontSize:"18px"}} />
            </div>
            <div className="sort-by">
            <select name="" id="">
                <option disabled selected>Sort By</option>
                <option value="">Recommended</option>
                <option value="">Price Low to Hight</option>
                <option value="">Price Hight to Low</option>
                <option value="">Newst Coming</option>
              </select>
            </div>
        </div>
        <div className="catview">
            <div className="catview-filter">
              <div className="catview-filter-title">
                <h4>FILTERS</h4>
              </div>
              <BrandFilter 
               finalData={brandFilterData} 
               setFinalData={setBrandFilterData} 
               brandData={brandData} 
               setBrandData={setBrandData}
               />
              <PriceFilter/>
              <div className="filter-clear">
                <span>CLEAR ALL</span>
              </div>
            </div>
            <div className="catview-products">
            </div>
        </div>
    </div>
    {isMobileFilter ? <MobileFilter setIsMobileFilter={setIsMobileFilter} /> : null}
    </>
  )
}

export default CategoryView