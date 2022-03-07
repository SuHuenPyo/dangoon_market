import React from "react";
import styled from "styled-components";

import HeaderTitle from "../components/HeaderTitle";
import CaveCommentUp from "../components/CaveCommentUp";
import CaveCommentDown from "../components/CaveCommentDown";


const CaveComment = () => {
  return (
    <>
      <HeaderTitle title="동굴생활" />
      <main>
        <CaveCommentUp />
        <CaveCommentDown />
      </main>
    </>
  );
};

export default CaveComment;
