import React from "react";
import styled from "styled-components";

import HeaderLogo from '../components/HeaderLogo';
import Cavewrite from "../components/CaveWrite";


const CaveWrite = () => {
  return (
    <>
      <HeaderLogo/>
      <main>
        <Cavewrite />
      </main>
    </>
  );
};

export default CaveWrite;
