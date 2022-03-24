import React from "react";
import styled from "styled-components";

const StyledReport = styled.div`
  @media only screen and (max-width: 500px) {
    width: 100%;
    left:0;
    right:0;
  }
  background-color: rgba(252, 198, 123, 0.97);
  width: 375px;
  height: ${(props) => (props.show ? "60%" : 0)};
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 20% 20% 0 0;
  font-size: 14px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  margin: 0 auto;
  z-index: 97;
  display: ${(props) => (props.show ? "flex" : "none")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.4s ease-in-out;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    line-height: 50px;
  }

  form {
    width: 100%;
    height: auto;
  }

  #reportBtn {
    margin-top: ${(props) => (props.ect ? "25px" : "50px")};
  }

  button {
    background-color: #f99d1b;
    font-size: 0.85rem;
    color: white;
    width: 260px;
    height: 50px;
    border: 0;
    border-radius: 40px;
    margin: 10px 0 0 0;
  }

  p {
    font-size: 1.1em;
    line-height: 40px;
    color: white;
  }

  select {
    width: 230px;
    height: 40px;
    margin: 10px 0 0 0;
    border: 1px solid #eee;
    border-radius: 20px;
    text-indent: 10px;
    background-color: #fff;
    color:inherit;
  }

  input {
    width: 230px;
    height: 38px;
    border: 1px solid #eee;
    border-radius: 20px;
    margin: 3px auto;
    display: ${(props) => (props.ect ? "block" : "none")};
    text-indent: 10px;
    background-color: #fff;
    box-shadow: 0;
  }
`;

const Report = (props) => {
  const [isEct, setIsEct] = React.useState(false);

  const onSelectValue = (e) => {
    if (e.currentTarget.value === "ect") {
      setIsEct(true);
    } else {
      setIsEct(false);
    }
  };

  return (
    <StyledReport bottom={props.bottom} show={props.show} ect={isEct}>
      <h2>신고사유를 말씀해주세요.</h2>
      <form action="">
        <select name="report" id="report-type" onChange={onSelectValue}>
          <option value="bannedItem">판매 금지 상품이예요.</option>
          <option value="scamArticle">사기 글이예요.</option>
          <option value="notUsedItem">중고거래 게시글이 아니예요.</option>
          <option value="ect">기타사유</option>
        </select>
        <input type="text" />
        <button
          id="reportBtn"
          type="button"
          onClick={(e) => {
            window.location.href = "/home";
          }}
        >
          확인
        </button>
        <button type="button" onClick={props.onClick}>
          취소
        </button>
      </form>
    </StyledReport>
  );
};

export default React.memo(Report);
