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
  console.log(page);
  
  React.useEffect(() => {
    dispatch(getHomeList({ page: page }));
  }, [dispatch, page]);

  React.useEffect(() => {
    if (inView && !loading) {
      setPage(page+1);
    }
  }, [inView]);

  return (
    <>
      {/* 로딩 */}
      {loading && <ReactLoading type="bubbles" color="#f99d1b" />}
      {/* 에러발생 */}
      {rt !== 200 && (
        <div className="error">
          <h2>Error!</h2>
          <p>{rtmsg}</p>
        </div>
      )}
      {/* 정상작동 */}
      {rt === 200 && (
        <>
          <HeaderLogo />
          <main>
            <SaleListItem data={item.item} inview={ref} />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
