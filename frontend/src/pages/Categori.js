import React from "react";
import styled from "styled-components";

import { Link } from 'react-router-dom'
import HeaderTitle from '../components/HeaderTitle';

import { MdOutlineSportsHandball } from "react-icons/md";
import {
  FaDesktop,
  FaAirFreshener,
  FaHome,
  FaBook,
  FaShoppingBag,
  FaTshirt,
  FaSeedling,
  FaBox,
} from "react-icons/fa";

const List = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto 0 auto;
`;

const Form = styled.form`
  width: 100%;
  height: auto;
`;

const Item = styled.li`
  flex-basis: 30.5%;
  height: auto;
  margin: 7px 0;
  text-align: center;
  border: 2px solid #f99d1b;
  border-radius: 15px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  
  a {
    display: flex;
    padding: 23px 0 21px 0;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    color: #f99d1b;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;

    svg {
      margin: 0 0 9px 0;
      font-size: ${(props) => props.icon || "1.3rem"};
    }
  }

  &:hover {
    background-color: #f99d1b;
  }

  &:hover a {
    color: #fff;
  }
`;

const Main = styled.main`
  width: calc{100% - 50px};
  min-height: 375px;
  padding: 5px 20px;
`;

const Search = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border: 2px solid #f99d1b;
  border-radius:10px;
  background-color: #fff;
  margin: 40px auto;
  text-indent: 10px;
  padding: 0 10px 0 10px;
`;

const Categori = () => {
  return (
    <>
    <HeaderTitle title='카테고리' />
      <Main>
        <Form>
          <Search type="search" placeholder='검색어를 입력해주세요' />
        </Form>
        <List>
          <Item>
            <Link to="/categori/gajun">
              <FaDesktop /> 가전
            </Link>
          </Item>
          <Item icon="1.45rem">
            <Link to="/categori/life">
              <FaHome />
              생활
            </Link>
          </Item>
          <Item icon="1.45rem">
            <Link to="/categori/sports">
              <MdOutlineSportsHandball />
              스포츠
            </Link>
          </Item>
          <Item>
            <Link to="/categori/books">
              <FaBook />
              도서
            </Link>
          </Item>
          <Item>
            <Link to="/categori/beauti">
              <FaAirFreshener />
              뷰티
            </Link>
          </Item>
          <Item>
            <Link to="/categori/acc">
              <FaShoppingBag />
              잡화
            </Link>
          </Item>
          <Item>
            <Link to="/categori/cloth">
              <FaTshirt />
              의류
            </Link>
          </Item>
          <Item>
            <Link to="/categori/plant">
              <FaSeedling />
              식물
            </Link>
          </Item>
          <Item>
            <Link to="/categori/ect">
              <FaBox />
              기타
            </Link>
          </Item>
        </List>
      </Main>
    </>
  );
};

export default Categori;
