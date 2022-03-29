import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../asset/scss/ProductDetail.module.scss";
import { AiOutlineStar, AiOutlineEye, AiFillStar } from "react-icons/ai";
import ReportIcon from "../asset/img/warning.png";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../Slices/ProductDetailSlice";
import ReactLoading from "react-loading";

import Report from "../components/Report";
import Notice from "../components/Notice";

const ProductDetail = () => {
  const [reportShow, setReportShow] = React.useState(false);
  const [noticeShow, setNoticeShow] = React.useState(false);
  const [clickStar, setClickStar] = React.useState(false);
  const titleList = {gajun : '가전', life:'생활',sports: '스포츠',books:'도서',beauti: '뷰티', acc: '악세사리',cloth:'의류', plant:'식물',ect:'기타'}

  const { rt, rtmsg, item, loading } = useSelector(
    (state) => state.productdetails
  );

  const dispatch = useDispatch();

  const { b_id } = useParams();

  React.useEffect(() => {
    dispatch(getProductDetail(b_id));
  }, [b_id]);

  // 클릭이벤트를 위한 콜백함수
  const onToggleReport = React.useCallback(() => {
    setReportShow(reportShow ? false : true);
  }, [reportShow]);

  const onToggleNotice = React.useCallback(() => {
    setNoticeShow(noticeShow ? false : true);
  }, [noticeShow]);

  const onToggleStar = React.useCallback(() => {
    setClickStar(clickStar ? false : true);
  }, [clickStar]);

  return (
    <>
      {loading && (
        <div className="loading">
          <ReactLoading type="bubbles" color="#f99d1b" />
        </div>
      )}

      {!loading && rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>{rtmsg}</p>
          </div>
        )}

      {!loading && rt === 200 && (
        <>
          <HeaderLogo />
          <main>
            <div className={styles.imgView}>
              {item.imageUrls.map((v,i)=>{
                return <img key={i} src={item.imageUrls[i]} alt={`${item.title}이미지${i}`} />
              })}
            </div>
            <div className={styles.profile}>
              <Link to="/profile" className={styles.profileImg}>
                <img src={item.sellerImg} alt={item.sellerName} />
              </Link>
              <div className={styles.posterInfo}>
                <p className={styles.name}>{item.sellerName}</p>
                <p className={styles.desc}>{item.price}원</p>
              </div>
              <div className={styles.likeBtn} onClick={onToggleStar}>
                {clickStar ? (
                  <AiFillStar className={styles.full} />
                ) : (
                  <AiOutlineStar />
                )}
              </div>
            </div>
            <div className={styles.postCont}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.postInfo}>
                <span className={styles.categori}>{titleList[item.category]}</span>
                &nbsp;&middot;&nbsp;
                <span className={styles.postTime}>{item.rDate}</span>
              </p>
              <button
                type="button"
                className={styles.reportBtn}
                onClick={() => {
                  setReportShow(true);
                }}
              >
                <img src={ReportIcon} alt="신고아이콘" />
              </button>
              <div className={styles.text}>
                {item.content}
              </div>
              <p className={styles.countView}>
                <AiOutlineStar /> <span className={styles.count}>{item.hits}</span>{" "}
                <AiOutlineEye /> <span className={styles.count}>5</span>
              </p>
              <div className={styles.makeH}></div>
            </div>
          </main>
          <button
            type="button"
            className={styles.requestBtn}
            onClick={() => setNoticeShow(true)}
          >
            거래요청
          </button>
          <Report
            bottom={"-70px"}
            show={reportShow}
            onClick={onToggleReport}
            type="sale"
          />
          <Notice
            bottom={"-70px"}
            show={noticeShow}
            onClick={onToggleNotice}
            title="정상적으로 거래요청이 완료되었습니다."
            subTitle="거래진행 상황은 나의 마늘 > 구매목록 에서 확인 가능합니다."
          />
        </>
      )}
    </>
  );
};

export default ProductDetail;
