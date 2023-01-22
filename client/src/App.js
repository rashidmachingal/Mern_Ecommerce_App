import './App.css';
import {Footer} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartPage, CategoryViewPage, HomePage, MobileSearchPage, OrderFlowPage, ProductPage, SearchViewPage } from './pages';
import { useFetchCartData } from './api/cart-api';

const App = ()=> {
  
  // fetch user cart
  useFetchCartData()

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage/>} />
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
