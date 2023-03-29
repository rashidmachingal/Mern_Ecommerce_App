import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartPage, CategoryViewPage, HomePage, LoginPage, MobileSearchPage, OrderFlowPage, OtpVerificationPage, ProductPage, RegisterPage, SearchViewPage } from './pages';
import { FetchUserCartDataAndUpdate, CreatePriceDetails } from './helpers/updateStoreData';
import { Footer, Navbar } from './components';
import './styles/App.css';

const App = ()=> {
  
  // fetch user cart data and update store cart data if user logged in
  FetchUserCartDataAndUpdate()
  // create order price details
  CreatePriceDetails()

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/otp" element={<OtpVerificationPage/>} />
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
