import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import SaleListItem from "../components/SaleListItem";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import WriteButton from "../components/WriteButton";
import Notice from "../components/Notice";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getHomeList } from "../Slices/HomeSlice";

const Home = () => {
  const [page, setPage] = React.useState(1);
  const [notice, setNotice] = React.useState({
    show: false,
    title: null,
    subTitle: null,
  });

  const { rt, rtmsg, item, loading } = useSelector((state) => state.home);

  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onClick = () => {
    setNotice({ ...notice, show: false });
    navigator("/login");
  }

  React.useEffect(() => {
    if(rt !== 200 && item === '로그인을 하세요'){
      return setNotice({show: true, title: '로그인을 해주세요.', subTitle: '로그인창으로 이동합니다.'});
    }
  },[rt,item])

  React.useEffect(() => {
    if (!loading) {
      dispatch(getHomeList({ page: page }));
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    if (inView && !loading && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <>
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
            <p>{rt}&nbsp;{rtmsg}</p>
          </div>
        )}

        {/* 정상작동 */}
        {rt === 200 && (
          <>
            <SaleListItem data={item.item} inview={ref} />
            <WriteButton path="/newproduct" />
          </>
        )}
      </main>
      <Notice
        show={notice.show}
        onClick={onClick}
        title={notice.title}
        subTitle={notice.subTitle}
      />
    </>
  );
};

export default Home;
