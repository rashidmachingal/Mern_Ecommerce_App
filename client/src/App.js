import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartPage, CategoryViewPage, HomePage, LoginPage, MobileSearchPage, OrderFlowPage, ProductPage, RegisterPage, SearchViewPage } from './pages';
import {Footer} from './components';
import { FetchCartData, GetPriceDetails } from './functions/cartFunctions';
import './App.css';

const App = ()=> {
  
  // fetch user cart
  FetchCartData()
  // update summary price details
  GetPriceDetails()

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/product/:id" element={<ProductPage/>} />
       <Route path="/category/:category" element={<CategoryViewPage/>} />
       <Route path="/search" element={<SearchViewPage/>} />
       <Route path="/mobile-search" element={<MobileSearchPage/>} />
       <Route path="/cart" element={<CartPage/>} />
       <Route path="/checkout" element={<OrderFlowPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
