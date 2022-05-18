import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import SaleListItem from "../components/SaleListItem";
import ReactLoading from "react-loading";
import { useInView } from "react-intersection-observer";
import WriteButton from "../components/WriteButton";
import Notice from "../components/Notice";
import Meta from '../components/Meta';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getHomeList } from "../Slices/HomeSlice";

const Home = () => {
  // 페이징
  const [page, setPage] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [notice, setNotice] = React.useState({
    title: null,
    subTitle: null,
  });

  const { rt, rtmsg, item, loading } = useSelector((state) => state.home);

  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  

  const onClick = React.useCallback(() => {
    if(rt === 401){
      console.log(rt === 401);
      window.location.href = '/login';
    }

    return setShow(false);
  },[rt,navigator])

  React.useEffect(() => {
    if (rt === 401) {
      setNotice({
        title: "로그인되어 있지 않습니다.",
        subTitle: "로그인 해주세요.",
      });
      setShow(true);
    }

  }, [rt,loading]);

  React.useEffect(() => {
    if (!loading) {
      dispatch(getHomeList({ page: page }));
    }
  }, [page]);

  React.useEffect(() => {
    if (inView && !loading && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView,page]);

  return (
    <>
      <Meta title='단군마켓 홈' description='단군마켓 홈 페이지' />
      <HeaderLogo />
      <main>
        {/* 로딩 */}
        {loading && (
          <div className="loading">
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

        {/* 정상작동 */}
        {!loading && rt === 200 && (
          <>
            <SaleListItem data={item.data} inview={ref} />
            <WriteButton path="/newproduct" />
          </>
        )}
      </main>

      <Notice
        show={show}
        onClick={onClick}
        title={notice.title}
        subTitle={notice.subTitle}
      />
    </>
  );
};

export default Home;
