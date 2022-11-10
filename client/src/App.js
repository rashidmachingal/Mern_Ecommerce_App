import './App.css';
import {Footer, Navbar} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryViewPage, HomePage, ProductPage, SearchViewPage } from './pages';

const App = ()=> {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/product/:id" element={<ProductPage/>} />
       <Route path="/category/:category" element={<CategoryViewPage/>} />
       <Route path="/search" element={<SearchViewPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
