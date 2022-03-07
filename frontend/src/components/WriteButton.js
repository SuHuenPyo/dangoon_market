import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi"

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
  display: block;
  width: 60px;
  height: 60px;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  background-color: #ff9500;
  border-radius: 30px;
  position: fixed;
  left: 80%;
  top: 80%;
  z-index: 1;
  &:active {
    transform: scale(0.7);
    transition: transform 0.1s ease-in-out;
  }
}
`;

const WriteButton = () => {
  return (
    <PostVeiw>
    <Poster to="/home">
        <button>
            <FiEdit />
        </button>
    </Poster>
    </PostVeiw>
  );
};

export default WriteButton;
