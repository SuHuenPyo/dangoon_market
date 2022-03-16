import React from 'react';
import styled from "styled-components";

import HeaderLogo from '../components/HeaderLogo';
import SaleListItem from '../components/SaleListItem';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getHomeList } from '../Slices/HomeSlice';

const Home = () => {
    const { rt, rtmsg, item, loading} = useSelector((state)=>state.home);

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getHomeList());
    },[dispatch]);
    
    return (
        <>
        <HeaderLogo/>
        <main>
                {rt === 200 &&
                <SaleListItem data={item.item}/>}
        </main>
        </>
    )
}

export default Home;