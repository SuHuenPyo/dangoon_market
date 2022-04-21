import React from "react";
import ReactLoading from "react-loading";
import HeaderTitle from "../components/HeaderTitle";
import SaleHistoryList from "../components/SaleHistoryList";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../Slices/RequestSaleSlice";
import { getHomeList } from "../Slices/HomeSlice";
import Meta from "../components/Meta";

const CaveLife = () => {
  const [page, setPage] = React.useState(1);
  const { item } = useSelector((state) => state.home);
  const { r_rt, r_rtmsg, r_item, r_loading } = useSelector(
    (state) => state.requestSale
  );

  const [rData ,setRdata ] = React.useState([])
   
  
  React.useEffect(() => {
    if(r_rt !== 200 || r_loading){
      return;
    }

    
    if(r_rt === 200 && r_item){
      const requestData = r_item.map((v, i) => {
          const saleItem = item.filter((item)=>{
                return v.b_id === item.b_id
          });

          const acceptedItem = v.request_info.filter((request)=>{
               return request.r_flag === 1
          })

          const requestItem = v.request_info.filter((request)=>{
            return request.r_flag === 0
       })

          return {
            saleItem: saleItem,
            acceptedItem: acceptedItem,
            requestItem: requestItem
          }
          
        })

        setRdata(requestData)
      } else {
        return
      }

  },[r_rt])

  const [ref, inView] = useInView();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!item) {
      dispatch(getHomeList({ page: page }));
    }

    dispatch(getRequest());
  }, []);

  React.useEffect(() => {
    if (inView && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView, page]);

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
      {r_rt === 200 && <SaleHistoryList data={rData} inview={ref} />}
    </>
  );
};

export default CaveLife;
