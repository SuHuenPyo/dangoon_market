import React from "react";
import styled from "styled-components";

import HeaderTitle from "../components/HeaderTitle";
import SalelistComponent from "../components/SalelistComponent";


const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="판매내역" />
      <main>
        <SalelistComponent />
      </main>
    </>
  );
};

export default CaveLife;
