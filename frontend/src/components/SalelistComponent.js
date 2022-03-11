import React from "react";
import style from "../css/salelistcomponent.module.css";
import { Link } from "react-router-dom";

const SalelistComponent = () => {
    return (
    <div className={style.saleslistpage}>
        <ul className={style.saleslist}>
            <li className={style.salesitem}>
                <Link to="/home" className={style.saleslink}>
                    <div className={style.salespost}>
                        <div className={style.salesimg}>
                            <img src="http://placekitten.com/95/95" alt="게시물사진" />
                        </div>
                        <div className={style.salescont}>
                            <h2 className={style.salestitle}>아이패드</h2>
                            <p className={style.salesinfo}>
                                <span className={style.salesloc}>동네이름</span>
                                &middot;
                                <span className={style.salestime}>올린시간</span>
                            </p>
                            <p className={style.salesprice}>
                                6,000원
                            </p>
                        </div>
                    </div>
                </Link>
                <div className={style.salesstatus}>거래요청</div>
                <div className={style.completestatus}>거래완료</div>
                <div className={style.salescontact}>
                    <p className={style.contacttype}>인간곰 님의  거래요청</p>
                    <button id="product-sales-btn" type="button" className={style.salesaccept}>거래수락</button>
                </div>
                <div className={style.completecontact}>
                    <p className={style.contacttypes}>인간곰 님과</p>
                    <button id="product-complete-btn" type="button" className={style.completeaccept}>거래완료</button>
                </div>
            </li>
        </ul>
    </div>
    );
};

export default SalelistComponent;
