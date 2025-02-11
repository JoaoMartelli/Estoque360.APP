import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './paginas/Login/Login';
import { Produtos } from './paginas/Produtos/Produtos';
import { Categorias } from './paginas/Categorias/Categorias';
import Home from './paginas/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import { Relatorios } from './paginas/Relatorios/Relatorios';
import { Perfil } from './paginas/Perfil/Perfil';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="587181083846-4ak4mskviifn6t2uc0al7dc0dt2ehjs8.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Produtos' element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
          <Route path='/Categorias' element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
          <Route path='/Relatorios' element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
          <Route path='/Perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
