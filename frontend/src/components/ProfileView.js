import React from "react";
import styles from "../asset/scss/ProfileView.module.scss";
import { BsReceiptCutoff, BsCart2 } from "react-icons/bs";

const ProfileView = (props) => {
  const container = React.useRef();

  console.log(props.show);
  React.useEffect(() => {
    const style = container.current.style;
      if(props.show){
        style.display = 'flex';
        style.top = `${props.top}px`;
      } else {
        style.display = 'none';
      }
  },[props.show,props.top])

  return (  
    <div ref={container} className={styles.container} onClick={props.onClick}>
      <div className={styles.view}>
        <div className={styles.image}>
          <img src="http://placekitten.com/110/110" alt="" />
        </div>
        <h3 className={styles.name}>김단군</h3>
        <p className={styles.desc}>단군단군! 빰빠라~</p>
        <div className={styles.totalCnt}>
          <div className={styles.counter}>
            <BsReceiptCutoff className={styles.icons} />
            <p className={styles.cntTitl}>판매횟수</p>
            <div className={styles.cnt}>4</div>
          </div>
          <div className={styles.counter}>
            <BsCart2 className={styles.icons} />
            <p className={styles.cntTitl}>구매횟수</p>
            <div className={styles.cnt}>1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
