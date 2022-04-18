import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import CaveCommentDown from "../components/CaveCommentDown";
import { BsCardImage } from "react-icons/bs";
import style from "../asset/scss/cavecommentup.module.scss";
import imgwarning from "../asset/img/warning.png";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Report from "../components/Report";
import { useSelector, useDispatch } from "react-redux";
import { getLike, doLike, doDislike} from "../Slices/LikeSlice";
import { getCaveDetails } from "../Slices/CaveDetails";
import { getCaveComment,postCaveComment } from "../Slices/CaveCommentSlice";
import onImgUpload from "../utils/ImgPreview";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "react-intersection-observer";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineEye,
  AiOutlineMore,
} from "react-icons/ai";

const BtnLine = styled.div`
  width: calc(100% - 10px);
  height: 30px;
  line-height: 30px;
  padding: 5px;
  font-size: 15px;

  button {
    border: 0px;
    width: 80px;
    height: 30px;
    background-color: transparent;
    position: relative;
    text-align: left;
    color: #333;

    svg {
      font-size: 17px;
    }
    span {
      position: relative;
      top: -3px;
    }

    &:hover {
      color: #f99d1b;
    }
  }

  & button:first-child {
    color: ${(props) => props.like};
  }
  & button:first-child:hover {
    color: #f99d1b;
  }
`;

const Content = styled.div`
  width: calc(100% - 10px);
  height: auto;

  h2 {
    font-size: 1.1rem;
    line-height: 2.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div {
    display: -webkit-box;
    font-size: 0.9rem;
    line-height: 1.15rem;
    max-height: 120px;
    overflow: hidden;
    white-space: break-spaces;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5; /* 표시하고자 하는 라인 수 */
    -webkit-box-orient: vertical;
  }

  p {
    font-size: 0.7rem;
    line-height: 1rem;
    color: #b5b5b5;
    margin: 0 0 10px 0;

    svg {
      position: relative;
      top: 1.5px;
    }
  }
`;

const ContentImg = styled.div`
  width: calc(100% - 10px);
  height: auto;
  max-height: 80px;
  padding: 5px 5px 10px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin: 0 7px 0 0;
  }
`;

const Gap = styled.div`
  width: 100%;
  margin: 5px 0 0 0;
  height: 10px;
  background-color: #ccc;
  opacity: 0.1;
`;

const CommentImg = styled.div`
  width: 100%;
  height: auto;
  max-height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(229, 229, 229, 0.3);
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    flex-basis: 100px;
    width: 100px;
    height: 100px;
    margin: 0 5px 0 0;
  }
`;

const CaveComment = (props) => {
  const { id } = useParams();

  const { rt, rtmsg, item, loading } = useSelector(
    (state) => state.cavedetails
  );

  const { c_rt, c_rtmsg, c_item,} = useSelector(
    (state) => state.cavecomment
  );

  const { l_rt, l_item } = useSelector((state) => {
    return state.like;
  });

  const dispatch = useDispatch();

  const type = "C";


  const input = React.useRef();

  const main = React.useRef();

  const [like, setLike] = React.useState(l_item[id] || false);

  const [show, setShow] = React.useState(false);

  const [page, setPage] = React.useState(1);

  const [ref, inView] = useInView();

  const onToggleReport = React.useCallback(() => {
    setShow(show ? false : true);
  }, [show]);

  const onSubmitComment = async(e) => {
    e.preventDefault();

    const target = e.target;
    const content = target.commentCont.value.trim();
    const images = target.commentImgs.files;

    if(!content){
      target.commentCont.focus();
      return;
    }

    const commentForm = new FormData();

    commentForm.append('boardId',id);
    commentForm.append('userId',1);
    commentForm.append('content',content);
    commentForm.append('board',images);

   await dispatch(postCaveComment(commentForm)); 

   target.commentCont.value = '';

   await dispatch(getCaveComment(id));

   main.current.scrollIntoView({block: "end",behavior: 'smooth'});
  
  }

  // 좋아요 기능구현
  const hanldeLike = () => {
    dispatch(getLike({boardId: id, type: type, flag: !like}));
    setLike((prevLike)=> !prevLike);
  }

  React.useEffect(() => {
    dispatch(getCaveDetails(id));
    dispatch(getCaveComment(id));
  }, []);

  React.useEffect(() => {
    if (inView && !loading && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView, page]);

  React.useEffect(() => {
    if(like && l_rt===200){
      dispatch(doLike(id))
    } else if(l_rt === 200 && !like){
      dispatch(doDislike(id))
    }
  },[like])

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  return (
    <>
      <HeaderTitle title="동굴생활" />
      {loading && (
        <main className="loading">
          <ReactLoading type="bubbles" color="#f99d1b" />
        </main>
      )}

      {rt !== 200 && (
        <main className="error">
          <h2>Error!</h2>
          <p>{rtmsg}</p>
        </main>
      )}

      {rt === 200 && (
        <>
          <main ref={main}>
            <div className={style.cavecomment}>
              <div className={style.cavecommentpost}>
                <div className={style.cavepostprofile}>
                  <img src={item.writerImg} alt={`${item.writerName}`} />
                  <p>{item.writerName}</p>
                  <div className={style.seeMore}>
                    <AiOutlineMore className={style.seeMoreIcon} />
                    <ul className={style.seeMoreList}>
                      <li>수정하기</li>
                      <li>삭제하기</li>
                    </ul>
                  </div>
                </div>
                <Content className={style.cavepostcont}>
                  <h2>{item.title}</h2>
                  <p>
                    {dayjs(item.rDate).fromNow()} &middot;&nbsp;{" "}
                    <AiOutlineEye /> {item.hits}
                  </p>
                  <div>{item.content}</div>
                </Content>
                <ContentImg>
                  {item.imageUrls
                    ? item.imageUrls.map((v, i) => {
                        return <img src={v} alt={`${item.title}${i}`} />;
                      })
                    : null}
                </ContentImg>
                <button className={style.postreport} onClick={onToggleReport}>
                  <img src={imgwarning} alt="신고아이콘" /> &nbsp; 부적절한
                  게시글이라면 단군마켓에 알려주세요.
                </button>
              </div>

              <BtnLine className="likeBtn" like={like ? "#f99d1b" : "inherit"}>
                <button onClick={hanldeLike}>
                  {like ? <AiFillLike /> : <AiOutlineLike />}{" "}
                  <span>좋아요</span>
                </button>
                <button
                  onClick={() => {
                    input.current.focus();
                  }}
                >
                  <AiOutlineMessage /> <span>답변하기</span>
                </button>
              </BtnLine>
            </div>
            <Gap />
            <CaveCommentDown
              onClick={onToggleReport}
              data={c_item}
              inview={ref}
            />
          </main>
          <Report show={show} onClick={onToggleReport} />
          <div className={style.cavecommentWrite}>
            <CommentImg id="commentImg"></CommentImg>
            <form
              className={style.cavecommentform}
              encType="multipart/form-data"
              onSubmit={(e) => {
                onSubmitComment(e);
              }}
            >
              <label htmlFor="comment-input-img" className={style.icons}>
                <BsCardImage />
              </label>
              <input
                type="file"
                id="comment-input-img"
                name="commentImgs"
                className={style.commentinputimg}
                onChange={(event) => {
                  onImgUpload(event, "#commentImg", item.b_id);
                }}
              />
              <input
                type="text"
                name="commentCont"
                placeholder="댓글을 입력해주세요."
                className={style.commentwriteinput}
                ref={input}
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CaveComment;
