import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import style from "../asset/css/Announcepage.module.css";
import Meta from "../components/Meta";

const Announcepage = () => {
  return (
    <>
      <Meta title="단군마켓 공지사항" description="단군마켓 공지사항 페이지" />
      <HeaderTitle title="공지사항" />
      <main>
        <div className={style.title}>
          <h2>
            공지사항 제목 테스트 중입니다.공지사항 제목 테스트 중입니다.공지사항
            제목 테스트 중입니다.
          </h2>
          <p>
            <span className={style}>관리자</span> &middot;
            <span className={style}>2022.03.24</span>
          </p>
          <img src="https://via.placeholder.com/95/af713c?text" alt="" />
        </div>
        <div className={style.content}>
          <p>
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
            안녕하세요. 항상 저희 단군마켓을 이용해주셔서 감사합니다.
          </p>
        </div>
      </main>
    </>
  );
};

export default Announcepage;
