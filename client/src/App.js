import './App.css';
import {Footer, Navbar} from './components';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/categories" element={<CategoriesPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
