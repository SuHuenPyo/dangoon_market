import React from "react";
import styled from "styled-components";

import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";


const NewProduct = () => {

  return (
    <>
      <HeaderLogo />
        <PostForm title="판매" />
    </>
  );
};

export default NewProduct;
