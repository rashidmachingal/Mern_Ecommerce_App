import {Banner,Categories, ExploreBanner, HomeProducts} from "../components";
import { topSellingData, topSellingShoes } from '../components/HomeProducts/Data';

const HomePage = () => {
  return (
    <>
    <Banner/>
    <Categories/>
    <HomeProducts data={topSellingData} />
    <ExploreBanner/>
    <HomeProducts data={topSellingShoes} />
    </>
  )
}

export default HomePage