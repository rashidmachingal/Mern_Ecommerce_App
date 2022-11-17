import './App.css';
import {Footer} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryViewPage, HomePage, MobileSearchPage, ProductPage, SearchViewPage } from './pages';

const App = ()=> {
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/product/:id" element={<ProductPage/>} />
       <Route path="/category/:category" element={<CategoryViewPage/>} />
       <Route path="/search" element={<SearchViewPage/>} />
       <Route path="/mobile-search" element={<MobileSearchPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
