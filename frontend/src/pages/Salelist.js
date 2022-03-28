import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import SalelistComponent from "../components/SaleHistoryList";


const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="판매내역" />
      <SalelistComponent />
    </>
  );
};

export default CaveLife;
