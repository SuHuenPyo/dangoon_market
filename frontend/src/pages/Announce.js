import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import Announcement from "../components/Announcement";
import Meta from "../components/Meta";

const CaveLife = () => {
  return (
    <>
      <Meta title="단군마켓 공지사항" description="단군마켓 공지사항 페이지" />
      <HeaderTitle title="공지사항" />
      <main>
        <Announcement />
      </main>
    </>
  );
};

export default CaveLife;
