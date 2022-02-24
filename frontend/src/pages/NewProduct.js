import React from "react";
import styled from 'styled-components';

import HeaderLogo from '../components/HeaderLogo'
import PostForm from '../components/PostForm'

const Main = styled.main`
  width: calc{100% - 50px}
  min-height: 375px;
  padding: 5px 25px;
`


const NewProduct = () => {
    return (
        <>
        <HeaderLogo/>
        <Main>
        <PostForm title='판매'/>
        </Main>
        </>
    )
}

export default NewProduct;