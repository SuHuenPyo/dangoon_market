import React from "react";
import styled from "styled-components";

const StyledNotice = styled.div`
@media only screen and (max-width: 500px) {
  width: 100%;
  left:0;
  right:0;
}
  background-color: rgba(252, 198, 123,0.97);
  width: 375px;
  height: ${(props) => (props.show ? "60%" : 0)};
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 17% 17% 0 0;
  font-size: 14px;
  text-align: center;
  position: fixed;
  bottom: 0px;;
  margin: 0 auto;
  display: ${(props) => (props.show ? "flex" : "none")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.4s ease-in-out;

   & h2 {
    font-size:  ${(props) => (props.show ? "1.2rem" : 0)};;
    font-weight: bold;
    color: white;
    line-height: 40px;
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
     line-height: 20px;
     color: white;
     width: 80%;
  }
`;

const Notice = (props) => {
  // props.title은 제목, props.subTitle은 부제목
  return (
    <StyledNotice bottom={props.bottom} show={props.show}>
      <h2>{props.title}</h2>
      <p>{props.subTitle}</p>
      <button type="button" onClick={props.onClick}>
        확인
      </button>
    </StyledNotice>
  );
};

Notice.defaultProps = {
  title: "요청하신 부분이 정상적으로 처리되었습니다.",
  subTitle: null,
};

export default React.memo(Notice);
