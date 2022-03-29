import React from "react";
import style from "../asset/css/Announcement.module.css";
import { Link } from 'react-router-dom';

const Announcement = () => {
  return (
    <ul className={style.noticeList}>
      <li>
        <Link to='/notice/:id ' className={style.noticeitem}>
          <div className={style.noticeimg}>
            <img src="http://placekitten.com/85/85" alt="" />
          </div>
          <div className={style.noticecontent}>
            <h2 className={style.noticetitle}>공지사항이 넘치면 어떻게 될까요???????</h2>
            <p className={style.noticeinfo}>
              <span className={style.noticename}>관리자</span> &middot;
              <span className={style.noticedate}>2022-01-19</span>
            </p>
            <p className={style.noticecontents}>
              안녕하세요. 항상 저희 단군마켓을 이용해주시는 단군님들께 감사드리며 이번 새해를 맞아..
            </p>
          </div>
        </Link>
      </li>
      <div className={style.gap}></div>
    </ul>
  );
};

export default Announcement;
