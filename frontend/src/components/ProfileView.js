import React from "react";
import styles from "../asset/scss/ProfileView.module.scss";
import { BsReceiptCutoff, BsCart2 } from "react-icons/bs";
import { getProfile } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileView = (props) => {
  const container = React.useRef();

  const { rt, item, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.show) {
      dispatch(getProfile(props.id));
    }

    if (rt > 200) {
      return alert(` [${rt}] 에러가 발생했습니다.`);
    }
  }, [props.show]);

  React.useEffect(() => {
    if(rt === 200){
      const style = container.current.style;
      if (props.show) {
        style.display = "flex";
        style.top = `${props.top}px`;
      } else {
        style.display = "none";
      }
    }
  }, [props.show, props.top]);

  return (
    <>
      {!loading && rt === 200 && (
        <div
          ref={container}
          className={styles.container}
          onClick={props.onClick}
        >
          <div className={styles.view}>
            <div className={styles.image}>
              <img
                src={
                  props.data.m_pic ? item.m_pic : "http://placekitten.com/85/85"
                }
                alt={`${item.m_name} 의 프로필`}
              />
            </div>
            <h3 className={styles.name}>{item.m_name || "test"}</h3>
            <p className={styles.desc}>단군단군! 빰빠라~</p>
            <div className={styles.totalCnt}>
              <div className={styles.counter}>
                <BsReceiptCutoff className={styles.icons} />
                <p className={styles.cntTitl}>판매횟수</p>
                <div className={styles.cnt}>
                  {item.sellBuyCnt ? item.sellBuyCnt[0] : 0}
                </div>
              </div>
              <div className={styles.counter}>
                <BsCart2 className={styles.icons} />
                <p className={styles.cntTitl}>구매횟수</p>
                <div className={styles.cnt}>
                  {item.sellBuyCnt ? item.sellBuyCnt[1] : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProfileView.defaultProps = {
  data: {
    m_name: "test",
    m_pic: null,
    sellBuyCnt: [0, 0],
  },
};

export default ProfileView;
