import React from "react";
import style from "../asset/css/cavecommentdown.module.css";
import imgwarning from "../asset/img/warning.png";


import Report from "./Report";

const CaveCommentDown = () => {
  const [show, setShow] = React.useState(false);

  const onCheck = React.useCallback(()=>{
  setShow(false);
    },[])

  return (
    <>
    <div className={style.cavecomment}>
      <div className={style.comment}>
        <div className={style.commenterprofile}>
          <img src="http://placekitten.com/40/40" alt="댓글 작성자 프로필 이미지" />
          <p className={style.commentername}>인간곰</p>
        </div>
          <button className={style.commentreport} onClick={()=>{setShow(true)}}>
            <img src={imgwarning} />
          </button> 
        <p className={style.commentcont}>댓글 예시입니다.</p>
      </div>

 
    </div>

    <Report show={show} onClick={onCheck}/>
    </>
  );
};

export default CaveCommentDown;
