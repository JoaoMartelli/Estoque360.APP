import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './paginas/Login/Login';
import { Produtos } from './paginas/Produtos/Produtos';
import { Categorias } from './paginas/Categorias/Categorias';
import Home from './paginas/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Produtos' element={<Produtos />} />
        <Route path='/Categorias' element={<Categorias />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
