import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/common.scss";

import Home from './pages/Home';
import NewProduct from './pages/NewProduct'
import CaveLife from './pages/CaveLife';
import ProfileView from './components/ProfileView';
import Categori from "./pages/Categori";
import CategoriList from "./pages/CategoriList";
import ProductDetail from './pages/ProductDetail';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Mygralic from './pages/Mygralic';
import MyProfile from './pages/MyProfile';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/newproduct" element={<NewProduct/>}/>
        <Route path="/categori" element={<Categori/>} />
        <Route path="/categori/:categori" element={<CategoriList/>} />
        <Route path="/cavelife" element={<CaveLife/>} />
        <Route path="/mygralic" element={<Mygralic/>} />
        <Route path="/profile" element={<ProfileView/>} />
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path="/product/:b_id" element={<ProductDetail/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
  );
}

export default App;
