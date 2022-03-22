import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import Announcement from "../components/Announcement";

const CaveLife = () => {
  return (
    <>
      <HeaderTitle title="공지사항" />
      <main>
        <Announcement />
        <Announcement />
        <Announcement />
        <Announcement />
      </main>
    </>
  );
};

export default CaveLife;
