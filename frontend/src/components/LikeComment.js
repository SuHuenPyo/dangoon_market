import React from "react";
import { Link } from "react-router-dom";
import style from "../css/Likelist.module.css";

import { AiFillStar, AiOutlineStar} from "react-icons/ai";

const Announcement = () => {
    const [click, setClick] = React.useState(false);
    return (
        <div className={style.likelistpage}>
        <ul className="like-list">
            <li className={style.likeitem}>
                <Link to="/home" className={style.postlink}>
                    <div className={style.postimg}>
                        <img src="http://placekitten.com/95/95" alt="" />
                    </div>
                    <div className={style.postcontent}>
                        <h2 className={style.posttitle}>
                            아이패드 미니 판매 합니다.
                        </h2>
                        <p className={style.postinfo}>
                            <span className={style.salearea}>동네이름</span> &middot;
                            <span className={style.saletime}>한시간전</span>
                        </p>
                        <p className={style.postprice}>530,000
                        <span className={style.won}>원</span></p>
                    </div>
                </Link>
                <button className={style.likebtn}onClick={(e)=>{ click ? setClick(false) :setClick(true)}}>
         { click ? <AiFillStar/> : <AiOutlineStar />  }</button>
            </li>
        </ul>
    </div>
    );
};

export default Announcement;