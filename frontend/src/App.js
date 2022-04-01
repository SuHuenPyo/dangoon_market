import React from "react";
import { Route, Routes } from "react-router-dom";
import "./asset/scss/common.scss";

import Home from './pages/Home';
import NewProduct from './pages/NewProduct'
import NewCavelife from './pages/NewCavelife';
import CaveLife from './pages/CaveLife';
import CaveComment from './pages/CaveComment';
import Categori from "./pages/Category";
import CategoriList from "./pages/CategoryList";
import ProductDetail from './pages/ProductDetail';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Mygralic from './pages/Mygralic';
import MyProfile from './pages/MyProfile';
import Likelist from './pages/Likelist';
import Salelist from './pages/Salelist';
import Buylist from './pages/Buylist';
import Announce from './pages/Announce';
import Announcepage from "./pages/Announcepage";


function App() {
  // 모바일 full paging을 위한 이벤트
  React.useEffect(()=>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },[]);

  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/newproduct" element={<NewProduct/>}/>
        <Route path="/newcavelife" element={<NewCavelife/>}/>
        <Route path="/categori" element={<Categori/>} />
        <Route path="/categori/:categori" element={<CategoriList/>} />
        <Route path="/cavelife" element={<CaveLife/>} />
        <Route path="/cavelife/:id" element={<CaveComment/>} />
        <Route path="/mygralic" element={<Mygralic/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/likelist' element={<Likelist/>}/>
        <Route path='/salelist' element={<Salelist/>}/>
        <Route path='/buylist' element={<Buylist/>}/>
        <Route path='/notice' element={<Announce/>}/>
        <Route path='/notice/:id' element={<Announcepage/>}/>
      </Routes>
  );
}

export default App;
