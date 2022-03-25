import React from "react";
import style from "../asset/css/cavecommentdown.module.css";
import imgwarning from "../asset/img/warning.png";


import Report from "./Report";

const CaveCommentDown = (props) => {

  return (
    <>
    <div className={style.cavecomment}>
      <div className={style.comment}>
        <div className={style.commenterprofile}>
          <img src="http://placekitten.com/40/40" alt="댓글 작성자 프로필 이미지" />
          <p className={style.commentername}>인간곰</p>
        </div>
          <button className={style.commentreport} onClick={()=>{props.onClick()}}>
            <img src={imgwarning} />
          </button> 
        <p className={style.commentcont}>댓글 예시입니다.</p>
      </div>

 
    </div>
    </>
  );
};



export default CaveCommentDown;
