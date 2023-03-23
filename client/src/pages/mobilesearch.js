import { SearchOutlined } from '@mui/icons-material'
import '../components/MobileSearch/MobileSearch.css'

const MobileSearchPage = () => {
  return (
    <div className='mobile-search-page'>
        <div style={{marginTop:"0"}} className="mobile-search">
            <div>
             <SearchOutlined style={{color:"grey"}} />
             <input type="text" placeholder='Search for Products' />
            </div>
        </div>
        <div className="trending-keywords">
              <div>
                <h4>Trending</h4>
              </div>
              <div>
                <button>Shirts</button>
                <button>Pants</button>
                <button>T-Shirts</button>
                <button>Formal Shirts</button>
              </div>
            </div>
    </div>
  )
}

export default MobileSearchPage