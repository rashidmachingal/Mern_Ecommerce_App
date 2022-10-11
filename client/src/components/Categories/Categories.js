import { categoriesData } from './Data'
import './Categories.css'

const Categories = () => {
  return (
    <>
     <div className="categoryContainer">
        <div className="category-title">
         <h2>CATEGORIES TO BAG</h2>
        </div>
        <div className="category">
            {categoriesData.map((i)=>{
              return (
               <div key={i.id} className='category-in'>
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
