import React from "react";
import style from "../asset/scss/Buylist.module.scss";
import { Link } from "react-router-dom";

const BuylistComponent = () => {
    const [accepted, setAccepted] = React.useState(false); 

    return (
            <li className={style.buyitem}>
                <Link to="/home" className={style.postlink}>
                        <div className={style.postimg}>
                            <img src="http://placekitten.com/95/95" alt="게시물사진" />
                        </div>
                        <div className={style.postcont}>
                            <h2>아이패드</h2>
                            <p className={style.postInfo}>
                                <span>카테고리</span>
                                &middot;
                                <span>올린시간</span>
                            </p>
                            <p className={style.postPrice}>
                                6,000원
                            </p>
                        </div>
                </Link>
                <div className={style.accepted} onClick={()=>{setAccepted( accepted ? false : true)}}>판매자 연락처 보기</div>
                <div className={`${style.sellercontact} ${accepted ? style.show : null }`}>
                    <p className={style.contacttype}>카카오톡 ID</p>
                    <p className={style.sellerinfo}>dangun1234</p>
                </div>
            </li>
    );
};

export default BuylistComponent;
