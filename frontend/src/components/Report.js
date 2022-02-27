import React from "react";
import styled from "styled-components";

const StyledNotice = styled.div`
  background-color: rgba(252, 198, 123, 0.95);
  min-width: 360px;
  width: calc(100%);
  height: ${props=>props.show ? '60%' : 0};
  height: 60%;
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

   h2 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    line-height: 50px;
  }

  button {
    background-color: #f99d1b;
    font-size: 0.85rem;
    color: white;
    width: 260px;
    height: 50px;
    border: 0;
    border-radius: 40px;
    margin: 30px; 0 0 0;
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

  }

  input{
    width: 230px;
    height: 38px;
    border: 1px solid #eee;
    border-radius: 20px;
    margin: 3px auto;
    display: ${(props)=> props.ect};
    text-indent: 10px;
  }
`;

const Notice = (props) => {

  const [isEct , setIsEct ] = React.useState(false);

  const onSelectValue = (e) => {
    if(e.currentTarget.value === 'ect'){
      setIsEct(true);
    } else {
      setIsEct(false);
    }
  }

  return (
    <StyledNotice show={props.show} ect={isEct ? 'block' : 'none'} >  
        <h2>신고사유를 말씀해주세요.</h2>
        <form action="">
          <select name="report" id="report-type" onChange={onSelectValue}>
              <option value="bannedItem">판매 금지 상품이예요.</option>
              <option value="scamArticle">사기 글이예요.</option>
              <option value="notUsedItem">중고거래 게시글이 아니예요.</option>
              <option value="ect">기타사유</option>
          </select>
           <input type="text"/>
          <button type="button" onClick={(e)=>{ window.location.href = '/home'}}>확인</button>
        </form>
    </StyledNotice>
  );
};

export default React.memo(Notice);
