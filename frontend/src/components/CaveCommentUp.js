import React from "react";
import style from "../css/cavecommentup.module.css";
import imgwarning from "../img/warning.png";

import { AiOutlineLike, AiFillLike , AiOutlineMessage} from "react-icons/ai";

const CaveCommentUp = () => {
  const [click, setClick] = React.useState(false);
  return (
    <div className={style.cavecomment}>
      <div className={style.cavecommentpost}>
        <div className={style.cavepostprofile}>
          <img src="http://placekitten.com/40/40" alt="작성자 프로필 이미지" />
          <p>작성자1</p>
        </div>
        <div className={style.cavepostcont}>작성글 예시입니다.</div>
          <button className={style.postreport}>
            <img src={imgwarning} />
            부적절한 게시글이라면 단군마켓에 알려주세요.
          </button>
      </div>
        <div className={style.cavecommentbutton}>
          <button className={style.goodbtn} onClick={(e)=>{ click ? setClick(false) :setClick(true)}} >
         { click ? <AiFillLike/> : <AiOutlineLike />  }<span>좋아요</span></button>
          <button className="comment-btn"><AiOutlineMessage /> 답변하기</button>
        </div>
    </div>
  );
};

export default CaveCommentUp;
