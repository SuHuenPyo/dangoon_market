import React from "react";
import style from "../asset/scss/SaleHistoryList.module.scss";
import { Link } from "react-router-dom";
import Notice from "./Notice";
import { AiOutlineMore } from "react-icons/ai";
import config from "../utils/_config.json";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import noImg from '../asset/img/noImg.png'
import { useSelector, useDispatch } from "react-redux";
import { doApprove,doCancel,doComplete } from "../Slices/DoContract"


const SalelistComponent = ({ inview, data }) => {
  const requestBtn = React.useRef([]);
  const completeBtn = React.useRef([]);
  const [show, setShow] = React.useState(false);
  const [notice, setNotice] = React.useState({ title: null, subTitle: null });
  const [open, setOpen] = React.useState(false);

  const categoryList = config.categoryList;

  const { a_rt, a_loading, c_rt, c_loading, d_rt, d_loading } = useSelector((state) => state.doContract);
  const dispatch = useDispatch();

  React.useEffect(() => {

    if(a_rt === 200){
      setNotice({
        title: "거래요청이 완료되었습니다.",
        subTitle: "구매자에게 단군님의 연락처가 전달됩니다. ",
      });
  
      return setShow(true);
      
    }

    if(a_rt > 200){
      console.log("if3");

      setNotice({
        title: "거래요청을 실패하였습니다..",
        subTitle: "다시 한번 시도해주세요. ",
      });
  
      return setShow(true);
    }
   
    return setShow(false)

  },[a_rt,a_loading])

  React.useEffect(() => {

    if(c_rt === 200){
      console.log("if2");
      setNotice({
        title: "거래취소가 완료되었습니다.",
        subTitle: "감사합니다. ",
      });
  
      return setShow(true);

    }

    if(c_rt > 200){
      console.log("if3");

      setNotice({
        title: "거래취소에 실패하였습니다..",
        subTitle: "다시 한번 시도해주세요. ",
      });
  
      return setShow(true);

    }
   
    return setShow(false)

  },[c_rt,c_loading])


  React.useEffect(() => {

    if(d_rt === 200){

      setNotice({
        title: "거래가 완료되었습니다.",
        subTitle: "감사합니다. ",
      });
  
      return setShow(true);

    }

    if(d_rt > 200){

      setNotice({
        title: "거래완료에 실패하였습니다..",
        subTitle: "다시 한번 시도해주세요. ",
      });
  
      return setShow(true);

    }
   
    return setShow(false)

  },[d_rt,d_loading])

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

  const makeComplete = (b_id,r_id) => {
    dispatch(doComplete({ 
      b_id: b_id,
      r_id: r_id
    }))
  };

  const makeApprove = (b_id,r_id) => {
      dispatch(doApprove({ 
        b_id: b_id,
        r_id: r_id
      }))
  };

  const makeCancel = (b_id,r_id) => {
    dispatch(doCancel({ 
      b_id: b_id,
      r_id: r_id
    }))
};
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  return (
    <>
      <main>
        <ul>
          {data && data.map((item, index) => {
            console.log(item);
            return (
              <li
                key={item.b_id}
                className={style.salesitem}
              >
                <Link
                  to={`/product/${item.b_id}`}
                  className={style.saleslink}
                >
                  <div className={style.salesimg}>
                    <img src={item.saleItem[0].b_img ? item.saleItem[0].b_img : noImg} alt="게시물사진" />
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
                    item.requestItem.length > 0 && !item.isAccepted ? style.accepted : null
                  }`}
                  onClick={() => {
                    onOpenRequest(index);
                  }}
                >
                  거래요청
                </button>
                <button
                  className={`${style.completestatus} ${
                    item.acceptedItem.length > 0 && !item.isDone ? style.accepted : null
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
                            onClick={()=>{
                              if(item.isAccepted){
                                makeCancel(item.b_id,v.r_id)
                              } else {
                                makeApprove(item.b_id,v.r_id)}
                              }
                            }
                            {...((v.r_flag === 0 && item.isAccepted) || item.isDone ? { disabled: true } : null)}
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
                        <li className={style.item} key={v.r_id}>
                          <p className={style.contacttypes}>{v.m_name} 님과</p>
                          <button
                            id="product-complete-btn"
                            type="button"
                            className={style.completeaccept}
                            onClick={()=>{makeComplete(item.b_id,v.r_id)}}
                            {...(v.r_done === 1 ? { disabled: true } : null)}
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

          window.location.reload();
        }}
      />
    </>
  );
};

SalelistComponent.defaultProps = {
  data: [
  ],
};

export default SalelistComponent;
