import React from "react";
import styled from "styled-components";

import { Link } from 'react-router-dom'
import HeaderTitle from '../components/HeaderTitle';

import { useNavigate } from 'react-router-dom';

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
import Meta from '../components/Meta';

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

  const navigator = useNavigate();
  return (
    <>
    <Meta title='단군마켓 카테고리' description='단군마켓 카테고리 페이지' />
    <HeaderTitle title='카테고리' link="/"/>
      <main>
        <Form  onSubmit={(e) => {
            e.preventDefault();
            navigator(`/search/${e.currentTarget.query.value}`)
          }}>
          <Search type="search" name='query' placeholder='검색어를 입력해주세요' />
        </Form>
        <List>
          <Item>
            <Link to="/category/gajun">
              <FaDesktop /> 가전
            </Link>
          </Item>
          <Item icon="1.45rem">
            <Link to="/category/life">
              <FaHome />
              생활
            </Link>
          </Item>
          <Item icon="1.45rem">
            <Link to="/category/sports">
              <MdOutlineSportsHandball />
              스포츠
            </Link>
          </Item>
          <Item>
            <Link to="/category/book">
              <FaBook />
              도서
            </Link>
          </Item>
          <Item>
            <Link to="/category/beauty">
              <FaAirFreshener />
              뷰티
            </Link>
          </Item>
          <Item>
            <Link to="/category/acc">
              <FaShoppingBag />
              잡화
            </Link>
          </Item>
          <Item>
            <Link to="/category/cloth">
              <FaTshirt />
              의류
            </Link>
          </Item>
          <Item>
            <Link to="/category/plant">
              <FaSeedling />
              식물
            </Link>
          </Item>
          <Item>
            <Link to="/category/etc">
              <FaBox />
              기타
            </Link>
          </Item>
        </List>
      </main>
    </>
  );
};

export default Categori;
