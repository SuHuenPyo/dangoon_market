import React from "react";
import style from "../css/request.module.css";
import styled from "styled-components";

const RequestComment = () => {
    const sales_status = document.querySelectorAll('.salesstatus');

        sales_status.forEach((v, i) => {
            if (v.classList.contains('accepted')) {
                const sales_contact = v.parentElement.querySelector('.salescontact');
                v.addEventListener('click', e => {
                    sales_contact.classList.toggle('show');
                });
            }
        });

    return (
        <>
        <div className={`${style.salesstatus} ${style.accepted}`}>거래요청</div>
        <div className={`${style.completestatus} ${style.accepted}`}>거래완료</div>
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