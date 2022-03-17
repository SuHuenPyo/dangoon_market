import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";


const NewProduct = () => {

  return (
    <>
      <HeaderLogo />
      <main>
        <PostForm title="판매" />
      </main>
    </>
  );
};

export default NewProduct;
