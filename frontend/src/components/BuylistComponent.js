import React from "react";
import style from "../asset/scss/Buylist.module.scss";
import { Link } from "react-router-dom";
import dayjs  from "dayjs";
import relativeTime   from "dayjs/plugin/relativeTime";


const BuylistComponent = ({ data }) => {
  const contact = React.useRef([]);

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  const doOpenContact = (number) => {
      contact.current[number].classList.toggle(style.show);
  }

  return (
    <>
      {data.map((v, i) => {
        return (
          <li key={i} className={style.buyitem}>
            <Link to={`/product/${v.b_id}`} className={style.postlink}>
              <div className={style.postimg}>
                <img src="http://placekitten.com/95/95" alt="게시물사진" />
              </div>
              <div className={style.postcont}>
                <h2>{v.board_info[0].b_title}</h2>
                <p className={style.postInfo}>
                  <span>{v.board_info[0].b_category}</span>
                  &middot;
                  <span>{dayjs(v.board_info[0].b_rdate).from()}</span>
                </p>
                <p className={style.postPrice}>{v.board_info[0].b_price}</p>
              </div>
            </Link>
            <div
              className={v.r_flag === 1 && v.r_done === 0 ? style.accepted : style.buystatus}
              onClick={()=>{
                  doOpenContact(i)
                }}
            >

             { v.r_done === 1 ? "거래가 완료되었습니다." : v.r_flag === 1 ? '판매자 연락처 보기' : '거래중입니다..'}
            </div>
            <div
              className={`${style.sellercontact}`}
              ref={(element) => contact.current[i] = element }
            >
              <p className={style.contacttype}>카카오톡 ID</p>
              <p className={style.sellerinfo}>dangun1234</p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default BuylistComponent;
