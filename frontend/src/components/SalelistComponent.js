import React from "react";
import style from "../asset/css/salelistcomponent.module.css";
import { Link } from "react-router-dom";
import Request from "../components/RequestComment";

const SalelistComponent = () => {
    return (
    <>
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
                                <span className={style.salesloc}>조회수</span>
                                &middot;
                                <span className={style.salestime}>올린시간</span>
                            </p>
                            <p className={style.salesprice}>
                                6,000원
                            </p>
                        </div>
                    </div>
                </Link>
                <Request></Request>
            </li>
        </ul>
    </div>
    </>
    );
};

export default SalelistComponent;
