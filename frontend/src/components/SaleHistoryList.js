import React from "react";
import style from "../asset/scss/SaleHistoryList.module.scss";
import { Link } from "react-router-dom";
import Notice from "./Notice";
import { AiOutlineMore } from "react-icons/ai";
import config from "../utils/_config.json";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const SalelistComponent = ({ inview, data }) => {
  const requestBtn = React.useRef([]);
  const completeBtn = React.useRef([]);
  const [show, setShow] = React.useState(false);
  const [notice, setNotice] = React.useState({ title: null, subTitle: null });
  const [open, setOpen] = React.useState(false);

  const categoryList = config.categoryList;

  const onOpenRequest = (number) => {
    if (open) {
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

    try {
      setOpen(requestBtn.current[number].classList.toggle(style.show));
    } catch (err) {
      if (err) {
        return;
      }
    }
  };

  const onOpenComplete = (number) => {
    if (open) {
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

    try {
      setOpen(completeBtn.current[number].classList.toggle(style.show));
    } catch (err) {
      if (err) {
        return;
      }
    }
  };

  const doComplete = () => {
    setNotice({ title: "거래가 완료되었습니다.", subTitle: null });

    setShow(true);
  };

  const doRequest = () => {
    setNotice({
      title: "거래요청이 완료되었습니다.",
      subTitle: "구매자에게 단군님의 연락처가 전달됩니다. ",
    });

    setShow(true);
  };

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  return (
    <>
      <main>
        <ul>
          {data.map((item, index) => {
            return (
              <li
                key={item.saleItem[0].b_id}
                className={style.salesitem}
                {...(data.length - 1 === index ? { ref: inview } : {})}
              >
                <Link to={`/product/${item.saleItem[0].b_id}`} className={style.saleslink}>
                  <div className={style.salesimg}>
                    <img src="http://placekitten.com/95/95" alt="게시물사진" />
                  </div>
                  <div className={style.salescont}>
                    <h2>{item.saleItem[0].b_title}</h2>
                    <p className={style.salesInfo}>
                      <span className={style.salesloc}>
                        {categoryList[item.saleItem[0].b_category]}
                      </span>{" "}
                      &middot;{" "}
                      <span className={style.salestime}>
                        {dayjs(item.saleItem[0].b_rdate).from()}
                      </span>
                    </p>
                    <p className={style.salesPrice}>
                      {item.saleItem[0].b_price}
                    </p>
                  </div>
                  <div className={style.seeMore}>
                    <AiOutlineMore className={style.seeMoreIcon} />
                    <ul className={style.seeMoreList}>
                      <li>수정하기</li>
                      <li>삭제하기</li>
                    </ul>
                  </div>
                </Link>

                <button
                  className={`${style.salesstatus} ${
                    item.requestItem.length > 0 ? style.accepted : null
                  }`}
                  onClick={() => {
                    onOpenRequest(index);
                  }}
                >
                  거래요청
                </button>
                <button
                  className={`${style.completestatus} ${
                    item.acceptedItem.length > 0 ? style.accepted : null
                  } `}
                  onClick={() => {
                    onOpenComplete(index);
                  }}
                >
                  거래완료
                </button>

                {item.requestItem.length > 0 && (
                  <ul
                    ref={(element) => (requestBtn.current[index] = element)}
                    className={`${style.salescontact}`}
                  >
                    {item.requestItem.map((v, i) => {
                      return (
                        <li key={v.r_id} className={style.item}>
                          <p className={style.contacttype}>
                            {v.m_name} 님의 거래요청  
                          </p>
                          <button
                            id="product-sales-btn"
                            type="button"
                            className={style.salesaccept}
                            onClick={doRequest}
                          >
                            {v.r_flag === 0 ? "거래수락" : "거래취소"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {item.acceptedItem.length > 0 && (
                  <ul
                    ref={(element) => (completeBtn.current[index] = element)}
                    className={`${style.completecontact}`}
                  >
                    {item.acceptedItem.map((v, i) => {
                      return (
                        <li className={style.item}>
                          <p className={style.contacttypes}>{v.m_name} 님과</p>
                          <button
                            id="product-complete-btn"
                            type="button"
                            className={style.completeaccept}
                            onClick={doComplete}
                            {...(v.r_done === 1 ? {disabled: true} : null)}
                          >
                            거래완료
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
          
        </ul>
      </main>
      <Notice
        show={show}
        title={notice.title}
        subTitle={notice.subTitle}
        onClick={() => {
          setShow(false);
        }}
      />
    </>
  );
};

SalelistComponent.defaultProps = {
  data: [],
  inview: false,
};

export default SalelistComponent;
