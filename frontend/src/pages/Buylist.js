import React from "react";
import styled from "styled-components";

import HeaderTitle from "../components/HeaderTitle";
import BuylistComponent from "../components/BuylistComponent";


const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="구매내역" />
      <main>
        <BuylistComponent />
      </main>
    </>
  );
};

export default CaveLife;
