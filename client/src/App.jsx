import React from 'react';
import { Button } from 'antd';
import './resources/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;