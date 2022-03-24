import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";


   /* 안내창 위치떄문에 여기 페이지는 main 제외 */
const NewCavelife = () => {

  return (
    <>
      <HeaderLogo />
        <PostForm title="동굴생활" />
    </>
  );
};

export default NewCavelife;
