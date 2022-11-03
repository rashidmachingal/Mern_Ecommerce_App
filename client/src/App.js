import './App.css';
import {Footer, Navbar} from './components';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryViewPage from './pages/CategoryViewPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/category/:category" element={<CategoryViewPage/>} />
       <Route path="/search" element={<CategoryViewPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
