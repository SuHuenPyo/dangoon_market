import React from "react";
import style from "../asset/scss/salelistcomponent.module.scss";
import { Link } from "react-router-dom";
import Notice from "./Notice";

const SalelistComponent = () => {
  const requestBtn = React.useRef([]);
  const completeBtn = React.useRef([]);
  const [show, setShow] = React.useState(false);
  const [notice, setNotice] = React.useState({title: null,subTitle: null});
  const [open, setOpen] = React.useState(false);

  const onOpenRequest = (number) => {
    if(open){
      completeBtn.current.forEach((v, i) => {
        v.classList.remove(style.show);
      });
      requestBtn.current.forEach((v, i) => {
        if (i === number) {
          return;
        } else {
          v.classList.remove(style.show);
        }
      });
    }
      
    setOpen(requestBtn.current[number].classList.toggle(style.show));
  };

  const onOpenComplete = (number) => {
    if(open){
    completeBtn.current.forEach((v, i) => {
      if (i === number) {
        return;
      } else {
        v.classList.remove(style.show);
      }
    });
    requestBtn.current.forEach((v, i) => {
        v.classList.remove(style.show);
    });
  }

  setOpen(completeBtn.current[number].classList.toggle(style.show));
  };

  const doComplete = () => {
    setNotice({title: '거래가 완료되었습니다.',subTitle:null});

    setShow(true);
  }

  const doRequest = () => {
    setNotice({title: '거래요청이 완료되었습니다.',subTitle:'구매자에게 단군님의 연락처가 전달됩니다. '});

    setShow(true);
  }

  return (
    <>
      <main>
        <ul>
          <li className={style.salesitem}>
            <Link to="/home" className={style.saleslink}>
              <div className={style.salesimg}>
                <img src="http://placekitten.com/95/95" alt="게시물사진" />
              </div>
              <div className={style.salescont}>
                <h2>아이패드</h2>
                <p className={style.salesInfo}>
                  <span className={style.salesloc}>카테코리</span>
                  &middot;
                  <span className={style.salestime}>올린시간</span>
                </p>
                <p className={style.salesPrice}>6,000원</p>
              </div>
            </Link>
            <button
              className={`${style.salesstatus}`}
              onClick={() => {
                onOpenRequest(0);
              }}
            >
              거래요청
            </button>
            <button
              className={`${style.completestatus}`}
              onClick={() => {
                onOpenComplete(0);
              }}
            >
              거래완료
            </button>
            <div
              ref={(element) => (requestBtn.current[0] = element)}
              className={`${style.salescontact}`}
            >
              <p className={style.contacttype}>인간곰 님의 거래요청</p>
              <button
                id="product-sales-btn"
                type="button"
                className={style.salesaccept}
                onClick={doRequest}
              >
                거래수락
              </button>
            </div>
            <div
              ref={(element) => (completeBtn.current[0] = element)}
              className={`${style.completecontact}
              }`}
            >
              <p className={style.contacttypes}>인간곰 님과</p>
              <button
                id="product-complete-btn"
                type="button"
                className={style.completeaccept}
                onClick={doComplete}
              >
                거래완료
              </button>
            </div>
          </li>
        </ul>
      </main>
      <Notice show={show} title={notice.title} subTitle={notice.subTitle} onClick={()=>{setShow(false)}}/>
    </>
  );
};

export default SalelistComponent;
