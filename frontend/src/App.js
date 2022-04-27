import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./asset/scss/common.scss";
import ReactLoading from "react-loading";

const Home = lazy(() => import("./pages/Home"));
const NewProduct = lazy(() => import("./pages/NewProduct"));
const NewCavelife = lazy(() => import("./pages/NewCavelife"));
const CaveLife = lazy(() => import("./pages/CaveLife"));
const CaveComment = lazy(() => import("./pages/CaveComment"));
const Categori = lazy(() => import("./pages/Category"));
const CategoriList = lazy(() => import("./pages/CategoryList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SignUp = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Mygralic = lazy(() => import("./pages/Mygralic"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Likelist = lazy(() => import("./pages/Likelist"));
const Salelist = lazy(() => import("./pages/Salelist"));
const Buylist = lazy(() => import("./pages/Buylist"));
const Announce = lazy(() => import("./pages/Announce"));
const Announcepage = lazy(() => import("./pages/Announcepage"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  // 모바일 full paging을 위한 이벤트
  React.useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <main>
            <div className="loading">
              <ReactLoading type="bubbles" color="#f99d1b" />
            </div>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/newcavelife" element={<NewCavelife />} />
          <Route path="/category" element={<Categori />} />
          <Route path="/category/:category" element={<CategoriList />} />
          <Route path="/cavelife" element={<CaveLife />} />
          <Route path="/cavelife/:id" element={<CaveComment />} />
          <Route path="/mygralic" element={<Mygralic />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/likelist" element={<Likelist />} />
          <Route path="/salelist" element={<Salelist />} />
          <Route path="/buylist" element={<Buylist />} />
          <Route path="/notice" element={<Announce />} />
          <Route path="/notice/:id" element={<Announcepage />} />
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
