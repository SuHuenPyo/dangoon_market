import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCaveList } from "../Slices/CaveSlice";
import { useInView } from "react-intersection-observer";
import ReactLoading from "react-loading";

import HeaderTitle from "../components/HeaderTitle";
import CavePostVeiw from "../components/CavePostVeiw";
import WriteButton from "../components/WriteButton";

const CaveLife = () => {
  const { rt, rtmsg, item, loading } = useSelector((state) => state.cave);

  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  React.useEffect(() => {
    dispatch(getCaveList({ page: page }));
  }, [dispatch, page]);

  React.useEffect(() => {
    if (inView && !loading && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <>
      <HeaderTitle title="동굴생활" />
      <main>
        {loading && (
          <div className="loading">
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        )}
        {!loading && rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>{rtmsg}</p>
          </div>
        )}
        {!loading && rt === 200 && (
          <>
          <CavePostVeiw data={item.item} inview={ref} />
          <WriteButton path='/newcavelife'/>
          </>
        )}
      </main>
    </>
  );
};

export default CaveLife;
