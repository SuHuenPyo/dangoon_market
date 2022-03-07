import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostVeiw = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
  .Announcementtitle {
    font-size: 1.7rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
`;

const Poster = styled(Link)`
width: 100%;
height: 100%;
display: flex;
align-items: center;
font-size: 16px;
margin: 0 0 3px 0;
padding-bottom: 10px;
border-bottom: 1px solid #eee;
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
.Announcementlist{
    width: 100%;
    padding-left: 10px;
    h2 {
        font-size: 1.2rem;
    }
    p {
        font-size: 0.8rem;
        color: #919191;
    }
  }
`;

const Announcement = () => {
  return (
    <PostVeiw>
    <Poster to="/home">
        <div>
            <img src="https://via.placeholder.com/95/af713c?text=" alt="" />
        </div>
        <div className='Announcementlist'>
            <h2>공지사항</h2>
            <p>
                <span>관리자</span> &middot; <span>2022-01-19</span>
            </p>
            <p>
                안녕하세요. 항상 저희 단군마켓을 이용해주시는 단군님들께 감사드리며 이번 새해를 맞아..
            </p>
        </div>
    </Poster>
    </PostVeiw>
  );
};

export default Announcement;
