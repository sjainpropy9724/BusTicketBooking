import React from 'react';
import { Button } from 'antd';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
const App = () => (
  <div className="App m-5">
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