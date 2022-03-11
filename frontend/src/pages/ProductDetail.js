import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../scss/ProductDetail.module.scss";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import ReportIcon from "../img/warning.png";

import Report from '../components/Report';
import Notice from  '../components/Notice'

const ProductDetail = () => {
const [reportShow, setReportShow] = React.useState(false);
const [noticeShow, setNoticeShow] = React.useState(false);

// 클릭이벤트를 위한 콜백함수
const onToggleReport = React.useCallback(()=>{
  setReportShow(false ? true : false);
},[])

const onToggleNotice = React.useCallback(()=>{
  setNoticeShow(false ? true : false);
},[])


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
          <p className={styles.postInfo}>
            <span className={styles.categori} >카테고리</span>&nbsp;&middot;&nbsp;<span className={styles.postTime}>1시간전</span>
          </p>
          <button type="button" className={styles.reportBtn} onClick={()=>{setReportShow(true)}}>
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
            <AiOutlineEye /> <span className={styles.count}>5</span>
          </p>
          <div className={styles.makeH}></div>
        </div>
      </main>
      <button type="button" className={styles.requestBtn}  onClick={()=>setNoticeShow(true)}>
        거래요청
      </button>
      <Report show={reportShow} onClick={onToggleReport}/>
      <Notice show={noticeShow} onClick={onToggleNotice} title='정상적으로 거래요청이 완료되었습니다.' subTitle='거래진행 상황은 나의 마늘 > 구매목록 에서 확인 가능합니다.'/>
    </>
  );
};

export default ProductDetail;
