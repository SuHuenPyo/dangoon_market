import React from "react";
import style from "../asset/css/cavecommentup.module.css";
import imgwarning from "../asset/img/warning.png";
import styled from "styled-components";

import Report from "./Report";

import { AiOutlineLike, AiFillLike , AiOutlineMessage} from "react-icons/ai";

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
        color: #333;

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

    & button:first-child{
        color:${(props)=>props.like};
    }
    & button:first-child:hover{
      color:#f99d1b; 
  }
`;

const Gap = styled.div`
    width: 100%;
    margin: 5px 0 0 0;
    height: 10px;
    background-color: #ccc;
    opacity: 0.1;
`

const CaveCommentUp = () => {
  const [click, setClick] = React.useState(false);

  const [show, setShow] = React.useState(false);

  const onCheck = React.useCallback(()=>{
    setShow(false);
    },[]);

  return (
    <>
    <div className={style.cavecomment}>
      <div className={style.cavecommentpost}>
        <div className={style.cavepostprofile}>
          <img src="http://placekitten.com/40/40" alt="작성자 프로필 이미지" />
          <p>작성자1</p>
        </div>
        <div className={style.cavepostcont}>작성글 예시입니다.</div>
          <button className={style.postreport} onClick={()=>{setShow(true)}}>
            <img src={imgwarning}/>&nbsp;
            부적절한 게시글이라면 단군마켓에 알려주세요.
          </button>
      </div>
      
      <BtnLine className='likeBtn' like={click ? '#f99d1b' : 'inherit'}>
        <button onClick={(e)=>{ click ? setClick(false) :setClick(true)}}>
        { click ? <AiFillLike/> : <AiOutlineLike />  }  <span>좋아요</span>
        </button>
        <button>
          <AiOutlineMessage /> <span>답변하기</span>
        </button>
      </BtnLine>
    </div>
    <Gap/>
    <Report show={show} onClick={onCheck}/>
    </>
  );
};

export default React.memo(CaveCommentUp);
