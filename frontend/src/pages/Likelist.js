import React from "react";
import styled from "styled-components";

import HeaderTitle from "../components/HeaderTitle";
import LikeComment from "../components/LikeComment";


const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="구매내역" />
      <main>
        <LikeComment />
      </main>
    </>
  );
};

export default CaveLife;
