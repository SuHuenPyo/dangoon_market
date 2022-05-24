import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styles from "../asset/scss/ProductDetail.module.scss";
import { AiOutlineStar, AiOutlineEye, AiFillStar } from "react-icons/ai";
import ReportIcon from "../asset/img/warning.png";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../Slices/ProductDetailSlice";
import { getLike, doLike, doDislike } from "../Slices/LikeSlice";
import { postRequest } from "../Slices/RequestSaleSlice";
import ReactLoading from "react-loading";

import Report from "../components/Report";
import Notice from "../components/Notice";
import Meta from "../components/Meta";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import config from "../utils/_config.json";

const ProductDetail = () => {
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  const { l_rt, l_item, l_loading } = useSelector((state) => {
    return state.like;
  });

  const { id } = useParams();
  const type = "S";

  const [reportShow, setReportShow] = React.useState(false);
  const [noticeShow, setNoticeShow] = React.useState(false);
  const [notice, setNotice] = React.useState({ title: null, subTitle: null });
  const [clickLike, setClickLike] = React.useState(l_item[id] || false);
  const categoryList = config.categoryList;

  const { rt, rtmsg, item, loading } = useSelector(
    (state) => state.productdetails
  );

  const { r_rt, r_loading } = useSelector((state) => state.requestSale);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id]);

  React.useEffect(() => {
    try {
      if (l_rt === null) {
        return;
      }
      if (l_rt === 200 && clickLike) {
  
        dispatch(doLike(id));
      } else if (l_rt === 200 && !clickLike) {
        dispatch(doDislike(id));
      }
    } catch(err){
        alert('다시 시도해주세요.')
    }
  }, [l_loading]);

  React.useEffect(() => {
    if (r_rt === 200) {
      setNotice({
        title: "거래요청이 완료되었습니다.",
        subTitle: "거래상황은 구매내역에서 확인 가능합니다.",
      });
      return;
    }

    if (r_rt !== 200) {
      console.log("if2");
      setNotice({
        title: "거래요청을 실패하였습니다.",
        subTitle: "다시 시도해주세요.",
      });
      return;
    }

    return () => {
      setNoticeShow(false);
    };
  }, [r_rt,r_loading]);

  // 클릭이벤트를 위한 콜백함수
  const onToggleReport = React.useCallback(() => {
    setReportShow(reportShow ? false : true);
  }, [reportShow]);

  const onToggleNotice = React.useCallback(() => {
    setNoticeShow(noticeShow ? false : true);
  }, [noticeShow]); 

  const doRequestForSale = () => {
    dispatch(postRequest(id));
    setNoticeShow(true);
  };

  const onToggleLike = () => {
    setClickLike((prevLike) => !prevLike);

    dispatch(
      getLike({
        boardId: id,
        type: type,
        flag: !clickLike,
      })
    );
  };

  return (
    <>
      <Meta title={item?.title.slice(0,5) || "단군마켓" } description={item?.content.slice(0,14)}  />
      <HeaderLogo />
      {loading && (
        <main>
        <div className="loading">
          <ReactLoading type="bubbles" color="#f99d1b" />
        </div>
        </main>
      )}

      {!loading && rt !== 200 && (
        <main>
        <div className="error">
          <h2>Error!</h2>
          <p>{rtmsg}</p>
        </div>
        </main>
      )}

      {rt === 200 && (
        <>
          <main>
            <div className={styles.imgView}>
              {item.imageUrls.map((v, i) => {
                return (
                  <div className={styles.image}>
                  <img
                    key={i}
                    src={item.imageUrls[i]}
                    alt={`${item.title}이미지${i}`}
                    />
                    </div>
                );
              })}
            </div>
            <div className={styles.profile}>
              <Link to="/profile" className={styles.profileImg}>
                <img src={item.sellerImg} alt={item.sellerName} />
              </Link>
              <div className={styles.posterInfo}>
                <p className={styles.name}>{item.sellerName}</p>
                <p className={styles.desc}>{item.price.toLocaleString('ko-KR')}원</p>
              </div>
              <div className={styles.likeBtn} onClick={onToggleLike}>
                {clickLike ? (
                  <AiFillStar className={styles.full} />
                ) : (
                  <AiOutlineStar />
                )}
              </div>
            </div>
            <div className={styles.postCont}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.postInfo}>
                <span className={styles.categori}>
                  {categoryList[item.category]}
                </span>
                &nbsp;&middot;&nbsp;
                <span className={styles.postTime}>
                  {dayjs(item.rDate).fromNow()}
                </span>
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
              <div className={styles.text}>{item.content}</div>
              <p className={styles.countView}>
                <AiOutlineStar /> <span className={styles.count}>0</span>{" "}
                <AiOutlineEye />{" "}
                <span className={styles.count}>{item.hits}</span>
              </p>
              <div className={styles.makeH}></div>
            </div>
          </main>
          <button
            type="button"
            className={styles.requestBtn}
            onClick={doRequestForSale}
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
            title={notice.title}
            subTitle={notice.subTitle}
          />
        </>
      )}
    </>
  );
};

export default ProductDetail;
