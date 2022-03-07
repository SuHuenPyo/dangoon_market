import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// styled Component
const List = styled.li`
    width: 100%;
    height: 100%;
`

const Linked = styled(Link)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
`

const SaleImg = styled.div`
    flex-basis:100px;
    width: 200px;
    min-width:100px;
    height: 85px;
    text-align:center;
    margin: 0 5px 0 0;
    & img {
        width: 85px;
        height: 100%;
        border-radius: 5px;
    }
    overflow: hidden;
`

const SaleCont = styled.div`
    flex-basis: auto;
    min-width: 200px;
    width: 100%;
    height: 85px;   
    font-size: 14px; 
    position: relative;
    
    & h2{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        line-height:27px;
        font-weight: normal;
    }

    & .saleInfo{
        color: #bcbcbc;
        font-size: 13px;
        line-height: 22px;
        word-spacing: 4px;
    }

    & .salePrice {
        font-size: 18px;
        font-weight: bold;
        line-height: 35px;
        letter-spacing: 0.05em;
    }
`

const SaleButton = styled.div`
    div {
        border: 1px solid black;
    }
    .sales-status {
        display: inline-block;
        width: 50%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        font-size: 14px;
        box-sizing: border-box;
    }
    .complete-status {
        display: inline-block;
        width: 50%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        font-size: 14px;
        float: right;
        box-sizing: border-box;
    }
    .accepted {
        background-color: rgba(252, 198, 123, 0.95);
    }
    .complete-status:after {
        content:'';
        display: block;
        float: none;
        clear: both;
    }
    // .sales-contact {
    //     width: 100%;
    //     height: 0px;
    //     text-align: center;
    //     border: 1px solid #e5e5e5;
    //     border-top: 0;
    //     font-size: 14px;
    //     display: none;
    // }
    .sales-contact >.contact-type {
        display: inline-block;
        width: 280px;
        height: 100%;
        line-height: 40px;
        margin-right: 80px;
    }

    .sales-contact >.sales-accept {
        display: inline-block;
        width: 70px;
        font-weight: bold;
        color: white;
        height: 35px;
        background-color: #f99d1b;
        line-height: 35px;
    }
    .sales-accept {
        border: 1px solid #d5d5d5;
        border-radius: 10px;
    }

    // .complete-contact {
    //     width: 100%;
    //     height: 0px;
    //     text-align: center;
    //     border: 1px solid #e5e5e5;
    //     border-top: 0;
    //     font-size: 14px;
    //     display: none;
    // }
    .complete-contact> .contact-types {
        display: inline-block;
        width: 280px;
        height: 100%;
        line-height: 40px;
        margin-right: 80px;
    }
    .complete-contact> .complete-accept {
        display: inline-block;
        width: 70px;
        font-weight: bold;
        color: white;
        height: 35px;
        line-height: 35px;
        background-color: #f99d1b;
    }
    .complete-accept {
        border: 1px solid #d5d5d5;
        border-radius: 10px;
    }
`


const SalelistComponent = () => {
  return (
    <List>
      <Linked to='' className="post-link">
        <SaleImg className="sale-img">
          <img src="http://placekitten.com/85/85" alt=""/>
        </SaleImg>
        <SaleCont className="sale-content">
          <h2 className="sale-title">아이패드</h2>
          <p className="saleInfo">
            <span className="postCategori">동네이름</span> &middot;
            <span className="postTime">한시간전</span>
          </p>
          <p className="salePrice">
            530,000<span className="won">원</span>
          </p>
        </SaleCont>
      </Linked>
      <SaleButton>
          <div className="sales-status accepted">거래요청</div>
          <div className="complete-status accepted">거래완료</div>
          <div className="sales-contact">
              <p className="contact-type">인간곰 님의  거래요청</p>
              <button className="sales-accept">거래수락</button>
          </div>
          <div className="complete-contact">
              <p className="contact-types">인간곰 님과</p>
              <button className="complete-accept">거래완료</button>
          </div>
      </SaleButton>
    </List>
  );
};

export default SalelistComponent;
