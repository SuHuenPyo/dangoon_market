import React from 'react';
import styled from "styled-components";

import HeaderLogo from '../components/HeaderLogo';
import SaleListItem from '../components/SaleListItem';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getHomeList } from '../Slices/HomeSlice';

const Main = styled.main`
  width: calc{100% - 50px}
  min-height: 375px;
  padding: 5px 20px;
`
const List = styled.ul`
    width: 100%;
    height: 100%;
`

const Home = () => {
    const { rt, rtmsg, item, loading} = useSelector((state)=>state.home);

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getHomeList());
    },[dispatch]);
    
    return (
        <>
        <HeaderLogo/>
        <Main>
                {rt === 200 &&
                <SaleListItem data={item.item}/>}
        </Main>
        </>
    )
}

export default Home;