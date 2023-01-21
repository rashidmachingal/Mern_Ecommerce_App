import {Banner,Categories, ExploreBanner, HomeProducts,MobileSearch, Navbar} from "../components";
//import { topSellingData, topSellingShoes } from '../components/HomeProducts/Data';

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <MobileSearch/>
    <Banner/>
    <Categories/>
    <HomeProducts Category="Shirt" /> 
    <ExploreBanner/>
    </>
  )
}

export default HomePage