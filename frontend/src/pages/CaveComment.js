import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import CaveCommentDown from "../components/CaveCommentDown";
import { BsCardImage } from "react-icons/bs";
import style from "../asset/css/cavecommentup.module.css";
import imgwarning from "../asset/img/warning.png";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Report from "../components/Report";
import { useSelector, useDispatch } from "react-redux";
import { getCaveDetails } from "../Slices/CavelifeSlice";

import { AiOutlineLike, AiFillLike, AiOutlineMessage } from "react-icons/ai";

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
  padding: 0 5px;

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
`;

const ContentImg = styled.div`
  width: calc(100% - 10px);
  height: auto;
  max-height: 80px;
  padding: 5px 5px 10px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;

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

const CaveComment = (props) => {
  const { rt, rtmsg, item, loading } = useSelector((state) => state.cavelife);
  const dispatch = useDispatch();
  const input = React.useRef();

  const [click, setClick] = React.useState(false);

  const [show, setShow] = React.useState(false);

  const onToggleReport = React.useCallback(() => {
    setShow(show ? false : true);
  }, [show]);

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getCaveDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <HeaderTitle title="동굴생활" />
      {loading && (
        <main className="loading">
          <ReactLoading type="bubbles" color="#f99d1b" />
        </main>
      )}

      {!loading && rt !== 200 && (
        <main className="error">
          <h2>Error!</h2>
          <p>{rtmsg}</p>
        </main>
      )}

      {!loading && rt === 200 && (
        <>
          <main>
            <div className={style.cavecomment}>
              <div className={style.cavecommentpost}>
                <div className={style.cavepostprofile}>
                  <img
                    src={item.writerImg}
                    alt={`${item.writerName}`}
                  />
                  <p>{item.writerName}</p>
                </div>
                <Content className={style.cavepostcont}>
                  <h2>{item.title}</h2>
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
                  <img src={imgwarning} /> &nbsp; 부적절한 게시글이라면
                  단군마켓에 알려주세요.
                </button>
              </div>

              <BtnLine className="likeBtn" like={click ? "#f99d1b" : "inherit"}>
                <button
                  onClick={(e) => {
                    click ? setClick(false) : setClick(true);
                  }}
                >
                  {click ? <AiFillLike /> : <AiOutlineLike />}{" "}
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
            <CaveCommentDown onClick={onToggleReport} />
          </main>
          <Report show={show} onClick={onToggleReport} />
          <form
            className={style.cavecommentwrite}
            encType="multipart/form-data"
          >
            <label htmlFor="comment-input-img" className={style.icons}>
              <BsCardImage />
            </label>
            <input
              type="file"
              id="comment-input-img"
              className={style.commentinputimg}
            />
            <input
              type="text"
              name="cavecomment-com"
              placeholder="댓글을 입력해주세요."
              className={style.commentwriteinput}
              ref={input}
            />
          </form>
        </>
      )}
    </>
  );
};

export default CaveComment;
