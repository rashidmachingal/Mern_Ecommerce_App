import {Banner, Categories, ExploreBanner, HomeProducts,MobileSearch} from "../components";
//import { topSellingData, topSellingShoes } from '../components/HomeProducts/Data';

const HomePage = () => {
  return (
    <>
    <MobileSearch/>
    <Banner/>
    <Categories/>
    <HomeProducts Category="Shirt" /> 
    <ExploreBanner/>
    </>
  )
}

export default HomePage