import React from "react";
import style from "../asset/css/cavecommentdown.module.css";
import imgwarning from "../img/warning.png";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";

import Report from "./Report";

const CaveCommentDown = () => {
  const [show, setShow] = React.useState(false);

  const onCheck = React.useCallback(()=>{
  window.location.href = '/home';
    },[])

  return (
    <>
    <div className={style.cavecomment}>
      <div className={style.comment}>
        <div className={style.commenterprofile}>
          <img src="http://placekitten.com/40/40" alt="댓글 작성자 프로필 이미지" />
          <p className={style.commentername}>인간곰</p>
        </div>
        {console.log(show)}
        <p className={style.commentreport}>
          <button onClick={()=>{setShow(true)}}>
            <img src={imgwarning} />
          </button> 
        </p>
        <p className={style.commentcont}>댓글 예시입니다.</p>
      </div>

      <form className={style.cavecommentwrite} enctype='multipart/form-data'>
        <label for="comment-input-img" className={style.faimages}><FaRegImages /></label>
        <input type="file" id="comment-input-img" className={style.commentinputimg} />
        <input type="text" name="cavecomment-com" placeholder="댓글을 입력해주세요." className={style.commentwriteinput} />
      </form>
    </div>

    <Report show={show} onClick={onCheck}/>
    </>
  );
};

export default CaveCommentDown;
