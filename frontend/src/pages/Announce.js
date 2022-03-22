import React from "react";

import HeaderLogo from '../components/HeaderLogo';
import Announcement from "../components/Announcement";
import Announcetitle from "../components/Announcementtitle";


const CaveLife = () => {
  return (
    <>
      <HeaderLogo/>
      <main>
        <Announcetitle />
        <Announcement />
        <Announcement />
        <Announcement />
        <Announcement />
      </main>
    </>
  );
};

export default CaveLife;
