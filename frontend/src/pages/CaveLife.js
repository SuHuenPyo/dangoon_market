import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCaveList } from '../Slices/CaveSlice';

import HeaderTitle from "../components/HeaderTitle";
import CavePostVeiw from "../components/CavePostVeiw";

const CaveLife = () => {
  const {rt, rtmsg, item, loading } = useSelector((state)=> state.cave);

  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getCaveList());
  },[dispatch]);

  return (
    <>
      <HeaderTitle title="동굴생활" />
      <main>
        { 
        rt === 200 && <CavePostVeiw data={item.item}/>
        }
      </main>
    </>
  );
};

export default CaveLife;
