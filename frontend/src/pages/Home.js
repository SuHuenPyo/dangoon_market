import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import SaleListItem from "../components/SaleListItem";
import ReactLoading from "react-loading";
import { useInView } from "react-intersection-observer";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getHomeList } from "../Slices/HomeSlice";

const Home = () => {
  const [page, setPage] = React.useState(1);

  const { rt, rtmsg, item, loading } = useSelector((state) => state.home);

  const [ref, inView] = useInView();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getHomeList({ page: page }));
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
            <p>{rtmsg}</p>
          </div>
        )}
        {/* 정상작동 */}
        {!loading && rt === 200 && (
          <SaleListItem data={item.item} inview={ref} />
        )}
      </main>
    </>
  );
};

export default Home;
