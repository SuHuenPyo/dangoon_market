import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AiOutlineLike, AiFillLike , AiOutlineMessage} from "react-icons/ai";

const PostVeiw = styled.div`
  width: 100%;
  height: auto;
  min-height: 200px;
  margin: 10px 0;
`;

const Poster = styled(Link)`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0 0 3px 0;
  div {
    flex-basis: 60px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 30px;
    }
  }

  p {
    line-height: 60px;
  }
`;

const Content = styled(Link)`
  display: block;
  width: calc(100% - 10px);
  height: auto;
  padding: 0 5px;

  h2 {
    font-size: 1.2rem;
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
    max-height:80px;
    padding: 5px 5px 10px 5px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    border-bottom: 1px solid #eee;

    button {
      width: 100%;
      text-align: left;
      background-color:#fff;
      border: 0;
      color: #ccc;
      font-size: 12px;
      bottom: 5px;
    }

    img {
      width: 15px;
    }
`;
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
        background-color:transparent;
        position:relative;
        text-align:left;

        svg{
            font-size: 17px;
        }
        span{
            position:relative;
            top: -3px;
        }

        &:hover {
            color:#f99d1b;         
        }
    }

    button:first-child{
        color:${(props)=>props.like}
    }
`;


const Gap = styled.div`
    width: 100%;
    height: 10px;
    background-color: #ccc;
    opacity: 0.1;
`

const CaveCommentUp = () => {
    const [click, setClick] = React.useState(false);
  return (
    <PostVeiw>
      <Poster to="/home">
        <div>
          <img src="http://placekitten.com/45/45" alt="" />
        </div>
        <p>작성자1</p>
      </Poster>
      <Content to="/home">
        <div>
          작성글 예시입니다.
        </div>
      </Content>
      <ContentImg>
      <button>
          <img src="../img/warning.png" />
          부적절한 게시글이라면 단군마켓에 알려주세요.
      </button>
      </ContentImg>
      <BtnLine like={click ? '#f99d1b' : 'inherit'}>
        <button onClick={(e)=>{setClick(true)}}>
         { click ? <AiFillLike/> : <AiOutlineLike />  }  <span>좋아요</span>
        </button>
        <button>
          <AiOutlineMessage /> <span>답변하기</span>
        </button>
      </BtnLine>
      <Gap/>
    </PostVeiw>
  );
};

export default CaveCommentUp;
