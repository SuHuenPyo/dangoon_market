import React from "react";
import { Route, Routes } from "react-router-dom";
import "./css/common.css";

import Home from './pages/Home';
import NewProduct from './pages/NewProduct'
import ResponsiveView from './components/ResponsiveVeiw';
import CaveLife from './pages/CaveLife';
import ProfileView from './components/ProfileView';
import Categori from "./pages/Categori";
import CategoriList from "./pages/CategoriList";
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <ResponsiveView>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/newproduct" element={<NewProduct/>}/>
        <Route path="/categori" element={<Categori/>} />
        <Route path="/categori/:categori" element={<CategoriList/>} />
        <Route path="/cavelife" element={<CaveLife/>} />
        <Route path="/mygralic" element="" />
        <Route path="/profile" element={<ProfileView/>} />
        <Route path="/product" element={<ProductDetail/>} />
      </Routes>
    </ResponsiveView>
  );
}

export default App;
