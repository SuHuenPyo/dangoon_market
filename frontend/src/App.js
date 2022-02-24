import React from "react";
import { Route, Routes } from "react-router-dom";
import "./css/common.css";

import Home from './pages/Home';



function App() {
  return (
    <div style={{ margin: 'auto', padding: 0 }}>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/categori" element="" />
        <Route path="/cavelife" element="" />
        <Route path="/mygralic" element="" />
        <Route path="/" element=""/>
      </Routes>
    </div>
  );
}

export default App;
