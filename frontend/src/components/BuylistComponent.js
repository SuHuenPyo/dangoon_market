import React from "react";
import style from "../asset/css/Buylist.module.css";
import { Link } from "react-router-dom";

const BuylistComponent = () => {
    return (
    <div className={style.buylistpage}>
        <ul className={style.buylist}>
            <li className={style.buyitem}>
                <Link to="/home" className={style.postlink}>
                    <div className={style.buypost}>
                        <div className={style.postimg}>
                            <img src="http://placekitten.com/95/95" alt="게시물사진" />
                        </div>
                        <div className={style.postcont}>
                            <h2 className={style.posttitle}>아이패드</h2>
                            <p className={style.postinfo}>
                                <span className={style.postloc}>카테고리</span>
                                &middot;
                                <span className={style.posttime}>올린시간</span>
                            </p>
                            <p className={style.postprice}>
                                6,000원
                            </p>
                        </div>
                    </div>
                </Link>
                <div className={style.accepted}>판매자 연락처 보기</div>
                <div className={style.sellercontact}>
                    <p className={style.contacttype}>카카오톡 ID</p>
                    <p className={style.sellerinfo}>dangun1234</p>
                </div>
            </li>
        </ul>
        <ul className={style.buylist}>
            <li className={style.buyitem}>
                <Link to="/home" className={style.postlink}>
                    <div className={style.buypost}>
                        <div className={style.postimg}>
                            <img src="http://placekitten.com/95/95" alt="게시물사진" />
                        </div>
                        <div className={style.postcont}>
                            <h2 className={style.posttitle}>아이패드</h2>
                            <p className={style.postinfo}>
                            <span className={style.postloc}>카테고리</span>
                                    &middot;
                            <span className={style.posttime}>올린시간</span>
                            </p>
                            <p className={style.postprice}>
                                6,000원
                            </p>
                        </div>
                    </div>
                </Link>
                <div className={style.buystatus}>거래요청중</div>
                <div className={style.sellercontact}>
                    <p className={style.contacttype}>카카오톡 ID</p>
                    <p className={style.sellerinfo}>dangun1234</p>
                </div>
            </li>
        </ul>
    </div>
    );
};

export default BuylistComponent;
