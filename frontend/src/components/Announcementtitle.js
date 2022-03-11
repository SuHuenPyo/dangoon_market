import React from "react";
import styled from "styled-components";

const PostVeiw = styled.div`
  width: 100%;
  height: auto;
  margin: 5px 0;
  .Announcementtitle {
    font-size: 1.7rem;
    padding-bottom: 5px;
    border-bottom: 1px solid #d5d5d5;
  }
`;

const Announcement = () => {
  return (
    <PostVeiw>
        <h2 className='Announcementtitle'>공지사항</h2>
    </PostVeiw>
  );
};

export default Announcement;
