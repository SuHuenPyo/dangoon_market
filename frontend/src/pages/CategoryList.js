import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import SaleListItem from '../components/SaleListItem';
import { useParams } from 'react-router-dom';
import config from '../utils/_config.json'
import { getCategory } from '../Slices/CategorySlice'
import { useSelector, useDispatch } from 'react-redux'
import {useInView} from 'react-intersection-observer';
import ReactLoading from 'react-loading';


const CategoriList = () => {
    const { category } = useParams();
    const [page, setPage ] = React.useState(1);
    const dispatch = useDispatch();
    const [ref, inView] = useInView();

    const { rt, rtmsg, item, loading } = useSelector((state)=> state.category)

    const categoryList = config.categoryList;

    React.useEffect(() => {
        if(!loading){
          dispatch(getCategory({ category: category,  page: page, rows: 10 }))
        }
    },[])

    React.useEffect(()=>{
      if(!loading && inView && item.pageEnd > page){
        setPage(page+1)
      }
    },[loading,inView])


    return (
        <>
        <HeaderTitle title={categoryList[category]}/>
        <main>
           {/* 로딩 */}
        {loading && (
          <div className="loading">
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        )}
        {/* 에러발생 */}
        {rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>
              {rt}&nbsp;{rtmsg}
            </p>
          </div>
        )}

        { rt === 200 && <SaleListItem inview={ref} data={item.item}/>
         }

        </main>
        </>
    );
};

export default CategoriList;