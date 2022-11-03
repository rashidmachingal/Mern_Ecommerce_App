import './App.css';
import {Footer, Navbar} from './components';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryViewPage from './pages/CategoryViewPage';
import SearchViewPage from './pages/SearchViewPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/category/:category" element={<CategoryViewPage/>} />
       <Route path="/search" element={<SearchViewPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
