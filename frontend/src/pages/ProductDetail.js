import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../scss/ProductDetail.module.scss";
import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import ReportIcon from "../img/warning.png";

import Report from '../components/Report';

const ProductDetail = () => {
const [show, setShow] = React.useState(false);

  return (
    <>
      <HeaderLogo />
      <main>
        <div className={styles.imgView}>
          <img src="http://placekitten.com/g/480/480" alt="" />
        </div>
        <div className={styles.profile}>
          <div className={styles.profileImg}>
            <img src="http://placekitten.com/40/40" alt="" />
          </div>
          <div className={styles.posterInfo}>
            <p className={styles.name}>판매자 이름</p>
            <p className={styles.desc}>졸려졸려조려조렺</p>
          </div>
        </div>
        <div className={styles.postCont}>
          <h2 className={styles.title}>제목</h2>
          <button type="button" className={styles.reportBtn} onClick={()=>{setShow(true)}}>
            <img src={ReportIcon} alt="신고아이콘" />
          </button>
          <div className={styles.text}>
        
            글영여열ㄴㅇㅁ리ㅜㅁ니ㅏㅍㅁ
            ㅁ푸미누피나ㅣㅁ
            ㅁ푸미ㅏ누핌ㄴ
            ㅁ퓌ㅏ누이팜ㅍ
            무피ㅏㅁ누피ㅏㅇㅁㄴ
            뭎니ㅏ퓐ㅁㅍ
            ㅁ퓐마윞ㅁ
            무피마ㅜ니ㅏ
            ㅁ푸미ㅏ누피ㅏㅁ
            뮘퓌ㅏㄴㅇ
            ㅜㅏㅣㅁ퓐
            ㅜㅏㅣㅍ무니ㅏ운
            ㅟㅍ마뉘ㅏㅍㅇㅁ
            ㅜ마퓜누
            무ㅏㅣㅍ무닢
            뮈파무니
            무피나우밒
            무피ㅜㅇ니ㅏㅁ
            문피ㅏㅁ뉲
        </div>
          <p className={styles.countView}>
            <AiOutlineHeart /> <span className={styles.count}>3</span>{" "}
            <AiOutlineSend /> <span className={styles.count}>1</span>
          </p>
          <div className={styles.makeH}></div>
        </div>
      </main>
      <button type="button" className={styles.requestBtn}>
        거래요청
      </button>
      <Report show={show}/>
    </>
  );
};

export default ProductDetail;
