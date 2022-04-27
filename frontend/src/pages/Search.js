import React from "react";
import HeaderTitle from "../components/HeaderTitle";
import SaleListItem from "../components/SaleListItem";
import { useParams } from "react-router-dom";
import { getSearch } from '../Slices/SearchSlice'
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import ReactLoading from "react-loading";
import styled from "styled-components";
import Meta from '../components/Meta';

const Form = styled.form`
  width: 100%;
  height: auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border: 2px solid #f99d1b;
  border-radius: 10px;
  background-color: #fff;
  margin: 20px auto;
  text-indent: 10px;
  padding: 0 10px 0 10px;
`;

const Search = () => {

  const { query } = useParams();
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const { rt, rtmsg, item, loading } = useSelector((state) => state.search);

  React.useEffect(()=>{
    if(!loading){
      dispatch(getSearch({  keywords: query, page: page,rows:10}))
    }
  },[query])


  React.useEffect(() => {
    if (!loading && inView && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [loading, inView]);

  return (
    <>
      <Meta title={`단군마켓 ${query} 검색결과`} description={`단군마켓 ${query} 검색결과 페이지`}/>
      <HeaderTitle title={query} link="/category" />
      <main>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/search/${e.currentTarget.query.value}`;
          }}
        >
          <Input
            type="search"
            name="query"
            placeholder="검색어를 입력해주세요"
          />
        </Form>
        {/* 로딩 */}
        {loading && (
          <div className="loading" >
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        )}
        {/* 에러발생 */}
        {!loading && rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>
              {rt}&nbsp;{rtmsg}
            </p>
          </div>
        )}
        {rt === 200 && <SaleListItem inview={ref} data={item.item} />}
      </main>
    </>
  );
};

export default Search;
