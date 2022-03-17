import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import BuylistComponent from "../components/BuylistComponent";


const Buylist = () => {
  return (
    <>
      <HeaderTitle title="구매내역" />
      <main>
        <BuylistComponent />
      </main>
    </>
  );
};

export default Buylist;
