import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import LikeComment from "../components/LikeComment";
import Meta from '../components/Meta';

const CaveLife = () => {
  return (
    <>
      <Meta title="단군마켓" description="단군마켓 관심목록 페이지"  />
      <HeaderTitle title="관심내역" link="/mygralic" />
      <main>
        <LikeComment />
      </main>
    </>
  );
};

export default CaveLife;
