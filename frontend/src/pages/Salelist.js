import React from "react";
import ReactLoading from "react-loading";
import HeaderTitle from "../components/HeaderTitle";
import SaleHistoryList from "../components/SaleHistoryList";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../Slices/RequestSaleSlice";
import Meta from "../components/Meta";

const Salelist = () => {
  const { r_rt, r_rtmsg, r_item, r_loading } = useSelector(
    (state) => state.requestSale
  );

  const { a_loading, c_loading } = useSelector((state) => state.doContract);

  const [rData, setRdata] = React.useState([]);

  React.useEffect(() => {
    if (r_rt !== 200) {
      return;
    }

    if (r_rt === 200) {
      const requestData = r_item.map((v, i) => {
    
        const saleItem =  v.board_info.filter((item) => {
          return item;
        });

        let isAccepted = false;
        let isDone = false;

        const acceptedItem = v.request_info.filter((request) => {
          return request.r_flag === 1;
        });

        const requestItem = v.request_info;

        requestItem.forEach((value, index, array) => {
          if (value.r_flag === 1) {
            isAccepted = true;
          }
          if (value.r_done) {
            isDone = true;
          }

          return isAccepted, isDone;
        });

        return {
          b_id: v.b_id,
          saleItem: saleItem,
          acceptedItem: acceptedItem,
          requestItem: requestItem,
          isAccepted: isAccepted,
          isDone: isDone,
        };
      });

      setRdata(requestData);
    }
  }, [r_rt, r_item, a_loading, c_loading, r_loading]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!r_item) {
      dispatch(getRequest());
    }
  }, [r_item]);

  return (
    <>
      <Meta title="단군마켓 홈" description="단군마켓 홈입니다." />
      <HeaderTitle title="판매내역" />

      {/* 로딩 */}
      {r_loading && (
        <main>
          <div className="loading">
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        </main>
      )}

      {/* 에러발생 */}
      {!r_loading && r_rt !== 200 && (
        <main>
          <div className="error">
            <h2>Error!</h2>
            <p>
              {r_rt}&nbsp;{r_rtmsg}
            </p>
          </div>
        </main>
      )}

      {r_rt === 200 && <SaleHistoryList data={rData} />}
    </>
  );
};

export default Salelist;
