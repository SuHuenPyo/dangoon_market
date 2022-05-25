import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../asset/scss/Mygralic.module.scss";
import { Link,useNavigate } from "react-router-dom";
import Notice from "../components/Notice";
import axios from "axios";
import { getMyProfile } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Meta from '../components/Meta';

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
  const { rt, rtmsg, m_item, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onClick = () => {
    setShow(false);
    if(rt === 401){
        return window.location.href = '/login';
    }
    return navigator(-1);
  };

  React.useEffect(() => {
    if (rt === null) {
      dispatch(getMyProfile());
    }

    if(rt === 401){
      setNotice({title: '로그인되어 있지 않습니다.',subTitle: "로그인 해주세요."});
      setShow(true);
    }

  }, [rt,loading]);

  return (
    <>
      <Meta title="단군마켓 나의 마늘" description="단군마켓 나의 마늘 페이지"  />
      <HeaderLogo />
      <main>
        {/* 로딩 */}
        {loading && (
          <div className="loading">
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        )}

        {/* 에러발생 */}
        {!loading && rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>
              {rt}&nbsp;{rtmsg}
            </p>
          </div>
        )}

        {rt === 200 && (
          <>
            <div className={styles.userProfile}>
              <div className={styles.userImg}>
                <img src={m_item.m_pic} alt={`${m_item.m_name}의 프로필`} />
              </div>
              <div className={styles.userInfo}>
                <h2>{m_item.m_name}</h2>
                <p>
                  {" "}
                  <RiKakaoTalkFill /> <span>{m_item.m_kakao_id}</span>
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
                <Link
                  to="/"
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = null;
                    try {
                      result = await axios.get(
                        "https://dangoon.duckdns.org/api/logout"
                      );
                    } catch (err) {
                      alert("error");
                    }

                    if (result.status === 200) {
                      setNotice({
                        title: "로그아웃되었습니다.",
                        subTitle: "감사합니다:)",
                      });
                      return setShow(true);
                    }
                  }}
                >
                  <AiOutlineExport />
                  로그아웃
                </Link>
              </li>
            </ul>
          </>
        )}
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
