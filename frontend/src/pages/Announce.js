import React from "react";

import HeaderLogo from '../components/HeaderLogo';
import Announcement from "../components/Announcement";
import Announcetitle from "../components/Announcementtitle";
import Announcementbutton from "../components/Announcementbutton";


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
        <Announcementbutton />
      </main>
    </>
  );
};

export default CaveLife;
