import React from "react";
import style from "../css/request.module.css";
import styled from "styled-components";

const RequestComment = () => {
    
    return (
        <>
        <form>
        <button className={`${style.salesstatus} ${style.accepted}`}>거래요청</button>
        <button className={`${style.completestatus} ${style.accepted}`}>거래완료</button>
        </form>
            <div className={style.salescontact}>
                <p className={style.contacttype}>인간곰 님의  거래요청</p>
                <button id="product-sales-btn" type="button" className={style.salesaccept}>거래수락</button>
            </div>
            <div className={style.completecontact}>
                <p className={style.contacttypes}>인간곰 님과</p>
                <button id="product-complete-btn" type="button" className={style.completeaccept}>거래완료</button>
            </div>
        </>
    );
};

export default RequestComment;