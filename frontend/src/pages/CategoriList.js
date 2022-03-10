import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import SaleListItem from '../components/SaleListItem';
import { useParams } from 'react-router-dom';

const CategoriList = () => {
    const { categori } = useParams();

    console.log(categori);

    const titleList = {gajun : '가전', life:'생활',sports: '스포츠',books:'도서',beauti: '뷰티', acc: '악세사리',cloth:'의류', plant:'식물',ect:'기타'}

    return (
        <>
        <HeaderTitle title={titleList[categori]}/>
        <main>
          <SaleListItem/>
        </main>
        </>
    );
};

export default CategoriList;