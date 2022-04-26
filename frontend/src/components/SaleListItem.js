import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai"
import dayjs  from "dayjs";
import relativeTime   from "dayjs/plugin/relativeTime";
import config from '../utils/_config.json';


import 'dayjs/locale/ko';

// styled Component
const List = styled.li`
    width: 100%;
    height: 110px;
`

const Linked = styled(Link)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #eee;
`

const SaleImg = styled.div`
    flex-basis:100px;
    width: 200px;
    min-width:100px;
    height: 85px;
    text-align:center;
    margin: 0 5px 0 0;
    & img {
        width: 85px;
        height: 100%;
        border-radius: 5px;
    }
    overflow: hidden;
`

const SaleCont = styled.div`
    flex-basis: auto;
    min-width: 200px;
    width: 100%;
    height: 85px;   
    font-size: 14px; 
    position: relative;
    
    h2{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        line-height:27px;
        font-weight: normal;
    }

    .saleInfo{
        color: #bcbcbc;
        font-size: 13px;
        line-height: 22px;
        word-spacing: 4px;
    }

    .salePrice {
        font-size: 18px;
        font-weight: bold;
        line-height: 35px;
        letter-spacing: 0.05em;
    }

    .likeView {
      width: 80px;
      color: #bcbcbc;
      position:absolute;
      bottom: 9px;
      right: 5px;
      svg {
        position:relative;
        top: 2px;
      }
      span {
        margin: 0 4px;
        font-size: 0.8rem;
      }
    }
`


const SaleListItem = ({data,inview}) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  
  const categoryList = config.categoryList;

  

  return (
    <ul>
      { data.map((v,i)=>{
        return (
    <List key={v.b_id} {...(data.length-1 === i ? {ref: inview} : {})}>
      <Linked to={`/product/${v.b_id}`} className="post-link">
        <SaleImg className="sale-img">
          <img src="http://placekitten.com/85/85" alt=""/>
        </SaleImg>
        <SaleCont className="sale-content">
          <h2 className="sale-title">{v.b_title}</h2>
          <p className="saleInfo">
            <span className="postCategori">{categoryList[v.b_category.toLowerCase()]}</span> &middot;&nbsp;
            <span className="postTime">{dayjs(v.b_rdate).fromNow()}</span>
          </p>
          <p className="salePrice">
            {v.b_price}<span className="won">원</span>
          </p>
          <p className="likeView">
            <AiOutlineStar/><span>{v.b_like}</span>
            <AiOutlineEye/><span>{v.b_hits}</span>
          </p>
        </SaleCont>
      </Linked>
    </List>
        )
      })}
    </ul>
  );
};

SaleListItem.defaultProps = {
  data: [],
  inview: false
}

export default React.memo(SaleListItem);
