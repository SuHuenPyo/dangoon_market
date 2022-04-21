import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileView from "./ProfileView";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineMore,
} from "react-icons/ai";

const PostVeiw = styled.div`
  width: 100%;
  height: auto;
  min-height: 200px;
  margin: 10px 0;
`;

const Poster = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0 0 3px 0;
  position: relative;

  div {
    flex-basis: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 30px;
    }
  }

  p {
    position: relative;
    top: -1.5px;
  }

  .seeMore {
    position: absolute;
    top: 1rem;
    right: 0.5rem;

    &:hover > .seeMoreList {
      display: block;
    }

    .seeMoreIcon {
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }

    .seeMoreList {
      position: absolute;
      width: 5rem;
      top: 1.3rem;
      right: 0.2rem;
      border: 1px solid #e5e5e5;
      text-align: center;
      display: none;

      li {
        width: 100%;
        height: auto;
        padding: 5px;
        box-sizing: border-box;
        font-size: 0.9rem;

        &:hover {
          background: #fefefe;
        }
      }

      li:first-child {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
`;

const Content = styled(Link)`
  display: block;
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

  p {
    font-size: 0.7rem;
    line-height: 1rem;
    color: #b5b5b5;
    margin: 0 0 10px 0;
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


const BtnLine = styled.div`
  width: calc(100% - 10px);
  height: 30px;
  line-height: 30px;
  padding: 5px;
  font-size: 15px;
  display: flex;

  button {
    display: block;
    border: 0px;
    width: 80px;
    height: 30px;
    background-color: transparent;
    position: relative;
    text-align: left;
    color: #333;

    svg {
      display: inline;
      font-size: 17px;
    }
    span {
      display: inline;
      position: relative;
      top: -3px;
    }

    &:hover {
      color: #f99d1b;
    }

    &:hover > a {
      color: #f99d1b;
    }

    &.like {
      color: #f99d1b;
    }
  }
`;

const Gap = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ccc;
  opacity: 0.1;
`;

const CavePostVeiw = ({ data, inview, likeList,onBtnClick}) => {

  const onClick = React.useCallback(() => {
    setProfile(false);
  }, []);


  const [member, setMember] = React.useState(0);
  const [profile, setProfile] = React.useState({ show: false, top: 0 });

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  return (
    <>
      {data.map((v, i) => {
        return (
          <PostVeiw
            key={v.b_id}
            {...(data.length - 1 === i ? { ref: inview } : {})}
          >
            <Poster
              onClick={(e) => {
                const getTop = document.body.scrollTop - 60;
                setMember(v.b_writer);
                setProfile({ show: true, top: getTop });
              }}
            >
              <div>
                <img src={v.profilePic} alt="" />
              </div>
              <p>{v.b_writer}</p>
              <div className="seeMore">
                <AiOutlineMore className="seeMoreIcon" />
                <ul className="seeMoreList">
                  <li>수정하기</li>
                  <li>삭제하기</li>
                </ul>
              </div>
            </Poster>
            <Content to={`/cavelife/${v.b_id}`}>
              <h2>{v.b_title} </h2>
              <p>{dayjs(v.b_rdate).fromNow()}</p>
              <div>{v.b_content}</div>
            </Content>
            <ContentImg>
              {v.b_img ? <img src={v.b_img} alt="" /> : null}
            </ContentImg>
            <BtnLine>
              <button type="button" data-id={v.b_id} onClick={(event)=>{onBtnClick(event)}} className={likeList[v.b_id] ? 'like' : null }>
                {likeList[v.b_id] ? <AiFillLike/> : <AiOutlineLike />}
                &nbsp;
                <span>좋아요</span> 
              </button>
              <button>
                <Link to={`/cavelife/${v.b_id}`}>
                  <AiOutlineMessage /> <span>답변하기</span>
                </Link>
              </button>
            </BtnLine>
            <Gap />
          </PostVeiw>
        );
      })}
      <ProfileView
        show={profile.show}
        top={profile.top}
        onClick={onClick}
        query={member}
      />
    </>
  );
};

CavePostVeiw.defaultProps = {
  data: [],
  likeList: []
};

export default React.memo(CavePostVeiw);
