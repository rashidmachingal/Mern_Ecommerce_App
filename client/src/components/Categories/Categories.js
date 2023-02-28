import { categoriesData } from './Data'
import './Categories.css'
import { Link } from 'react-router-dom'

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
               <Link to={"/category/"+i.title.toLocaleLowerCase()} key={i.id} className='category-in'>
                <div className="category-image" style={{background: i.color}} >
                 <img src={i.image} alt="img" />
                </div>
                <div className="category-name">
                 <h3>{i.title}</h3>
                </div>
               </Link>
              )
            })}
        </div>
     </div>
    </>
  )
}

export default Categories
