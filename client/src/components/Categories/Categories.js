import { ArrowRight } from '@mui/icons-material'
import './Categories.css'
import { categoriesData } from './Data'

const Categories = () => {
  return (
    <>
     <div className="categoryContainer">
        <div className="category-title">
         <h2>CATEGORIES</h2>
         <span>View All Categories <ArrowRight/></span>
        </div>
        <div className="category">
            {categoriesData.map((i)=>{
              return (
               <div className='category-in'>
                <div className="category-image">
                 <img src={i.image} alt="img" />
                </div>
                <div className="category-name">
                 <h3>{i.title}</h3>
                </div>
               </div>
              )
            })}
        </div>
     </div>
    </>
  )
}

export default Categories
