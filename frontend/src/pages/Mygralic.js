import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../asset/scss/Mygralic.module.scss";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";
import axios from 'axios';

// icons
import { RiKakaoTalkFill } from "react-icons/ri";
import {
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFrown,
  AiOutlineExport,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { BsReceiptCutoff } from "react-icons/bs";

const Mygralic = () => {
  const [notice, setNotice] = React.useState({ title: null, subTitle: null });
  const [show, setShow] = React.useState(false);
  const onClick = () => {
    setShow(false);
    return window.history.back();
  };

  React.useEffect(() => {
  }, []);

  return (
    <>
      <HeaderLogo />
      <main>
        <div className={styles.userProfile}>
          <div className={styles.userImg}>
            <img src="http://placekitten.com/g/75/75" alt="" />
          </div>
          <div className={styles.userInfo}>
            <h2>김동아</h2>
            <p>
              {" "}
              <RiKakaoTalkFill /> <span>kakaoid</span>
            </p>
          </div>
        </div>
        <Link to="/myprofile/" className={styles.toProfile}>
          프로필 보기
        </Link>
        <div className={styles.usagesList}>
          <Link to="/salelist" className={styles.usagesItem}>
            <div className={styles.sale}>
              <BsReceiptCutoff />
              <br />
              판매내역
            </div>
          </Link>
          <Link to="/buylist" className={styles.usagesItem}>
            <div className={styles.purchase}>
              <AiOutlineShoppingCart />
              <br />
              구매내역
            </div>
          </Link>
          <Link to="/likelist" className={styles.usagesItem}>
            <div className={styles.like}>
              <AiOutlineStar />
              <br />
              관심목록
            </div>
          </Link>
        </div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to="/notice">
              <AiOutlineNotification />
              공지사항
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/cavelife">
              <AiOutlineComment />
              나의 동굴생활
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/out">
              <AiOutlineFrown />
              탈퇴하기
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to='/' onClick={async(e)=>{
              e.preventDefault();
              let result = null;
              try {
                result = await axios.get('https://dangoon.duckdns.org/logout'); 
              } catch (err) {
                alert('error');
              }

              if(result.status === 200){
                setNotice({
                  title: '로그아웃되었습니다.',
                  subTitle: '감사합니다:)'
                })
                return setShow(true);
              }
            }}>
              <AiOutlineExport />
              로그아웃
            </Link>
          </li>
        </ul>
      </main>
      <Notice
        show={show}
        onClick={onClick}
        title={notice.title}
        subTitle={notice.subTitle}
      />
    </>
  );
};

export default Mygralic;
