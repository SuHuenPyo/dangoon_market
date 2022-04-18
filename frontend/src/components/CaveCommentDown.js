import React from "react";
import style from "../asset/css/cavecommentdown.module.css";
import imgwarning from "../asset/img/warning.png";
import dayjs  from "dayjs";
import relativeTime   from "dayjs/plugin/relativeTime";

const CaveCommentDown = ({ data, onClick, inview }) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  return (<>
    {data.map((v, i) => {
      return (
        <div className={style.cavecomment} key={i} {...(data.length-1 === i ? {ref: inview} : {})}>
          <div className={style.comment}>
            <div className={style.commenterprofile}>
              <img
                src={v.writerPic}
                alt={`${v.writerName}의 프로필 이미지`}
              />
              <div>
                <p className={style.commentername}>{v.writerName}</p>
                <p className={style.time}>{dayjs(v.rDate).fromNow()}</p>
              </div>
            </div>
            <button
              className={style.commentreport}
              onClick={() => {
                onClick();
              }}
            >
              <img src={imgwarning} alt="신고하기" />
            </button>
            <p className={style.commentcont}>{v.content}</p>
          </div>
        </div>
      );
    })}
    {
    data.length > 4 ? (
      <div className={style.bottomHeight}>
        
      </div>
    ) : null}
  </>);
};

CaveCommentDown.defaultProps = {
  data: [],
  onClick: null,
  inview: false
}

export default CaveCommentDown;
