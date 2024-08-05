import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from './Homepage'
import { NavBar } from './Navbar'
import { Game } from './Game'
import './App.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-dark-indigo/theme.css"

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/Game' element={<Game/>} />
        <Route path='/' element={<HomePage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
