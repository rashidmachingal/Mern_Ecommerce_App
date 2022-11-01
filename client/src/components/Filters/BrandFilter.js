import { useState } from 'react';
import './FilterStyles.css';

const BrandFilter = ({finalData,setFinalData,brandData,setBrandData}) => {

    const [noOfElements, setnoOfElements] = useState(7);

    const handleFilter = (id,idx) => {
      const temp = brandData

      if(brandData[idx].checked===false){
        //add brand to brand filter array
        temp[idx].checked = true
        let newData = {name:brandData[idx].brandname,id:brandData[idx].id}
        setFinalData(prev=> [...prev,newData])
      }else{
        //remove brand from brand filter array
        temp[idx].checked = false
        const xyz = finalData
        const newFilter = xyz.filter((item) => item.id !== id);
        setFinalData(newFilter)
      }
      setBrandData(temp)
    }

  return (
   <>
   <div className="brand-filter">
     <div className="brand-filter-search"> 
         <h4>BRAND</h4>
     </div>
     <div className="filter-brand-names">
        {brandData.slice(0,noOfElements).map((i,idx)=>{
          return(
            <div key={i.id}>
              <input checked={i.checked} onChange={()=>{handleFilter(i.id,idx)}} type="checkbox" />
              <label>{i.brandname}</label>
             </div>
          )
        })}
        {noOfElements === 7 ? 
         <span 
          onClick={()=> setnoOfElements(brandData.length)}>
         +{brandData.length - noOfElements} more
         </span> : null}
     </div>
    </div>
   </>
  )
}

export default BrandFilter