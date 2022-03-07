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
.pagination_section {
  position: absolute;
  top: 100%;
    .a {
      color: black;
      padding: 0 11px;
      text-decoration: none;
    }
    .pagination_section :hover:not(.active) {
      background-color: #031F3B;
      color: white;
    }
}
`;

const Announcement = () => {
  return (
    <PostVeiw>
    <Poster to="/home">
      <div className="pagination_section">
        <Link to='#' className="a">&lt;&lt;</Link>
        <Link to='#' className="a">&lt;</Link>
        <Link to='#' title="Algorithm" className="active">1</Link>
        <Link to='#' title="DataStructure" className="a">2</Link>
        <Link to='#' title="Languages" className="a">3</Link>
        <Link to='#' title="Interview" className="a">4</Link>
        <Link to='#' title="practice" className="a">5</Link>
        <Link to='#' className="a">&gt;</Link>
        <Link to='#' className="a">&gt;&gt;</Link>
      </div>
    </Poster>
    </PostVeiw>
  );
};

export default Announcement;
