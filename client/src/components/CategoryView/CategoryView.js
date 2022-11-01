import { Close } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useEffect, useState } from 'react';
import BrandFilter from '../Filters/BrandFilter';
import './CategoryView.css'
import { brandNames } from '../Filters/Data';
import PriceFilter from '../Filters/PriceFilter';

const CategoryView = () => {

  const [brandFilterData, setBrandFilterData] = useState([])
  const [brandData, setBrandData] = useState([]);

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
    </>
  )
}

export default CategoryView