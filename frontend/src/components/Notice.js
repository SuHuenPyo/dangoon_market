import React from "react";
import styled from "styled-components";

const StyledNotice = styled.div`
  background-color: rgba(252, 198, 123, 0.95);
  min-width: 360px;
  width: calc(100%);
  height: ${props=>props.show ? '60%' : 0};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 17% 17% 0 0;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  right:0px;
  opacity: ${props=> props.show ? 1: 0};
  transition: all 0.4s ease-in-out;

   & h2 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    line-height: 50px;
  }

  & button {
    background-color: #f99d1b;
    font-size: 0.85rem;
    color: white;
    width: 260px;
    height: 50px;
    border: 0;
    border-radius: 40px;
    margin: 40px; 0 0 0;
  }

  &  p {
    font-size: 1.1em;
     line-height: 40px;
     color: white;
  }
`;

const Notice = (props) => {

  return (
    <StyledNotice show={props.show} >
      <h2>정상적으로 등록이 완료되었습니다.</h2>
      <p>{props.children}</p>
      <button type="button" onClick={props.onClick}>
        확인
      </button>
    </StyledNotice>
  );
};

export default React.memo(Notice);
