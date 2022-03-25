import React from "react";
import { Link } from "react-router-dom";
import style from "../asset/scss/Likelist.module.scss";

const LikeComment = () => {

    return (
            <li className={style.likeitem}>
                <Link to="/home" className={style.postlink}>
                    <div className={style.postimg}>
                        <img src="http://placekitten.com/95/95" alt="" />
                    </div>
                    <div className={style.postcontent}>
                        <h2>
                            아이패드 미니 판매 합니다.
                        </h2>
                        <p className={style.postInfo}>
                            <span className={style.salearea}>카테고리</span> &middot;
                            <span className={style.saletime}>한시간전</span>
                        </p>
                        <p className={style.postPrice}>530,000
                        <span className={style.won}>원</span></p>
                    </div>
                </Link>
            </li>
    );
};

export default LikeComment;