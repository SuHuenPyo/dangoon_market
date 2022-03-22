import React from "react";
import style from "../asset/scss/salelistcomponent.module.scss";
import { Link } from "react-router-dom";


const SalelistComponent = () => {
    const requestBtn = React.useRef();
    const completeBtn = React.useRef();
    const [request,setRequest] = React.useState(false);
    const [complete,setComplete] = React.useState(false);


  return (
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
            <>
              <button className={`${style.salesstatus}`} onClick={()=>{if(complete){setComplete(false)} setRequest(request ? false : true)}}>
                거래요청
              </button>
              <button className={`${style.completestatus}`} onClick={()=>{if(request){setRequest(false)} setComplete(complete ? false : true)}}>
                거래완료
              </button>

              
              <div ref={requestBtn} className={`${style.salescontact} ${request ? style.show : null}`}>
                <p className={style.contacttype}>인간곰 님의 거래요청</p>
                <button
                  id="product-sales-btn"
                  type="button"
                  className={style.salesaccept}
                >
                  거래수락
                </button>
              </div>
              <div ref={completeBtn} className={`${style.completecontact} ${complete ? style.show : null}`}>
                <p className={style.contacttypes}>인간곰 님과</p>
                <button
                  id="product-complete-btn"
                  type="button"
                  className={style.completeaccept}
                >
                  거래완료
                </button>
              </div>
            </>
          </li>
  );
};

export default SalelistComponent;
