import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AiFillStar, AiOutlineStar} from "react-icons/ai";

const PostVeiw = styled.div`
  width: 100%;
  height: auto;
  min-height: 200px;
  margin: 10px 0;
`;

const Poster = styled(Link)`
width: 100%;
height: 100%;
display: flex;
align-items: center;
font-size: 16px;
margin: 0 0 3px 0;
padding-bottom: 10px;
border-bottom: 1px solid #e5e5e5;
div {
    display: flex;
    flex-flow: column;
    width: 110px;
    height: 100%;
    img {
        width: 95px;
        height: 95px;
        margin-top: 10px;
        border-radius: 10px;
    }
}
.Buylist{
    width: 100%;
    padding: 20px 0 0 10px;
    line-height: 20px;
    h2 {
        font-size: 1rem;
    }
    p {
        font-size: 0.8rem;
        color: #d5d5d5;
        line-height: 30px;
    }
    .Buylistpride {
        font-size: 1rem;
        color: black;
        font-weight: bold;
    }
}
`;

const Content = styled(Link)`
  display: block;
  width: calc(100% - 10px);
  height: auto;
  padding: 0 5px;

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

const BtnLine = styled.div`
    width: calc(100% - 10px);
    height: 30px;
    line-height: 30px;
    padding: 5px;
    font-size: 15px;

    button {
        position: absolute;
            top: 35%;
            right: 20%;
            background-color: transparent;
            border: 0;
            color: #dbdbdb;
        svg{
            position: absolute;
            background-color: transparent;
            font-size: 40px;
            color: #dbdbdb;
        }

        &:hover {
            color:#ffd119;         
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

const Announcement = () => {
    const [click, setClick] = React.useState(false);
    return (
    <PostVeiw>
    <Poster to="/home">
        <div>
            <img src="http://placekitten.com/95/95" alt="" />
        </div>
        <div className='Buylist'>
            <h2>아이패드 미니 판매 합니다.</h2>
            <p>
                <span>동네이름</span> &middot; <span>한시간전</span>
            </p>
            <p className='Buylistpride'>
                530,000원
            </p>
        </div>
    <button className='AiOutlineStar'></button>
    </Poster>
    <BtnLine like={click ? '#ffd119' : 'inherit'}>
        <button onClick={(e)=>{setClick(true)}}>
        { click ? <AiFillStar/> : <AiOutlineStar />  }
        </button>
    </BtnLine>
    <Content to="/home">
    </Content>
    
    <Gap/>

    </PostVeiw>
  );
};

export default Announcement;
