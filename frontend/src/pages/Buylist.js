import React from "react";

import HeaderTitle from "../components/HeaderTitle";
import BuylistComponent from "../components/BuylistComponent";

import ReactLoading from "react-loading";
import { useSelector, useDispatch } from "react-redux";
import { getBuyHistory } from "../Slices/BuyHistorySlice";
import Meta from '../components/Meta';

const Buylist = () => {

  const { rt, rtmsg, item, loading } = useSelector((state) => state.buyhistory);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (rt === null) {
      dispatch(getBuyHistory());
    }
  }, [rt, loading]);

  console.log(item);

  return (
    <>
      <Meta title='단군마켓 구매내역' description='단군마켓 구매내역 페이지' />
      <HeaderTitle title="구매내역" link="/mygralic"/>
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

        {rt === 200 && (
          <ul>
            <BuylistComponent data={item} />
          </ul>
        )}
      </main>
    </>
  );
};

export default Buylist;
