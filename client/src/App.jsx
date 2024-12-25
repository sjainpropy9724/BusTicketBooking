import React from 'react';
import { Button } from 'antd';
import './resources/global.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;