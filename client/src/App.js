import './App.css';
import { Categories } from './components/Categories/Categories';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <Categories/>
    </>
  );
}

export default App;
