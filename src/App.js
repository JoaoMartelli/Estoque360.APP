import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './paginas/Login/Login';
import { Produtos } from './paginas/Produtos/Produtos';
import { Categorias } from './paginas/Categorias/Categorias';
import { EditarCategoria } from './paginas/EditarCategoria/EditarCategoria';
import { EditarProduto } from './paginas/EditarProduto/EditarProduto';
import { AdicionarCategoria } from './paginas/AdicionarCategoria/AdicionarCategoria';
import { AdicionarProduto } from './paginas/AdicionarProduto/AdicionarProduto';
import { Perfil } from './paginas/Perfil/Perfil';
import { EditarPerfil } from './paginas/EditarPerfil/EditarPerfil';
import { EditarSenha } from './paginas/EditarSenha/EditarSenha';
import Home from './paginas/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Produtos' element={<Produtos />} />
        <Route path='/Categorias' element={<Categorias />} />
        <Route path='/Categorias/EditarCategoria' element={<EditarCategoria />} />
        <Route path='/Produtos/EditarProduto' element={<EditarProduto />} />
        <Route path='/Categorias/AdicionarCategoria' element={<AdicionarCategoria />} />
        <Route path='/Produtos/AdicionarProduto' element={<AdicionarProduto />} />
        <Route path='/Perfil' element={<Perfil />} />
        <Route path='/Perfil/EditarPerfil' element={<EditarPerfil />} />
        <Route path='/Perfil/EditarSenha' element={<EditarSenha />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
