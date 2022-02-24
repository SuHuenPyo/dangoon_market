import React from 'react';
import styled from "styled-components";

import HeaderLogo from '../components/HeaderLogo';
import SaleListItem from '../components/SaleListItem';

const Main = styled.main`
  width: calc{100% - 50px}
  min-height: 375px;
  padding: 5px 25px;
`
const List = styled.ul`
    width: 100%;
    height: 100%;
`

const Home = () => {
    return (
        <>
        <HeaderLogo/>
        <Main>
            <List>
                <SaleListItem/>
                <SaleListItem/>
                <SaleListItem/>
                <SaleListItem/>
                <SaleListItem/>
            </List>
        </Main>
        </>
    )
}

export default Home;