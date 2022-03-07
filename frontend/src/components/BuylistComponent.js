import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const BuylistInfo = styled(Link)`
    .Buylistcontent {
        border: 1px solid red;
        background-color: rgba(252, 198, 123, 0.95);
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        font-size: 14px;
    }
    p {
        display: inline-block;
        width: 110px;
        height: 100%;
    }
    .Buylistrequest {
        border: 1px solid red;
        background-color: #e5e5e5;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        font-size: 14px;
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

const Gap = styled.div`
    width: 100%;
    height: 10px;
    background-color: #ccc;
    opacity: 0.1;
`

const Announcement = () => {
  return (
    <PostVeiw>
    <Poster to="/home">
        <div>
            <img src="http://placekitten.com/95/95" alt="" />
        </div>
        <div className='Buylist'>
            <h2>아이패드</h2>
            <p>
                <span>동네이름</span> &middot; <span>올린시간</span>
            </p>
            <p className='Buylistpride'>
                6,000원
            </p>
        </div>
    </Poster>
    <BuylistInfo to="/home">
        <div className='Buylistcontent'>
            판매자 연락처 보기
        </div>
        <div>
            <p>카카오톡 ID</p>
            <p>dangun1234</p>
        </div>
    </BuylistInfo>
    <Poster to="/home">
        <div>
            <img src="http://placekitten.com/95/95" alt="" />
        </div>
        <div className='Buylist'>
            <h2>아이패드</h2>
            <p>
                <span>동네이름</span> &middot; <span>올린시간</span>
            </p>
            <p className='Buylistpride'>
                6,000원
            </p>
        </div>
    </Poster>
    <BuylistInfo to="/home">
        <div className='Buylistrequest'>
            거래요청중
        </div>
        <div>
            <p>카카오톡 ID</p>
            <p>dangun1234</p>
        </div>
    </BuylistInfo>
    <Content to="/home">
    </Content>
    <Gap/>

    </PostVeiw>
  );
};

export default Announcement;
