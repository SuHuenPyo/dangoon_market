import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import LikeComment from "../components/LikeComment";


const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="관심내역" />
      <main>
        <LikeComment />
      </main>
    </>
  );
};

export default CaveLife;
