import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCaveList } from "../Slices/CaveSlice";
import { getLike, doLike, doDislike } from "../Slices/LikeSlice";
import { useInView } from "react-intersection-observer";
import ReactLoading from "react-loading";

import HeaderTitle from "../components/HeaderTitle";
import CavePostVeiw from "../components/CavePostVeiw";
import WriteButton from "../components/WriteButton";

const CaveLife = () => {
  const type = 'C';
  const { rt, rtmsg, item, loading } = useSelector((state) => state.cave);
  const { l_rt, l_item } = useSelector((state) => state.like);
  const [boardId, setBoardId ] = React.useState(0);


  const [page, setPage] = React.useState(1);
  const [like, setLike ] = React.useState(l_item);

  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  React.useEffect(() => {
    dispatch(getCaveList({ page: page }));
  }, [page]);

  React.useEffect(() => {
    if (inView && !loading && item.pageEnd > page) {
      setPage(page + 1);
    }
  }, [inView]);

  const onBtnClick = React.useCallback(async(e)=>{
    const id = e.currentTarget.dataset.id;

    setBoardId(id);

    try {
      await dispatch(getLike({boardId:id, type: type, flag: !like[id]}));
    } catch (err) {
      if(err){
        alert('다시 시도해주세요.');
        return;
      }
    }

    setLike((prevLike)=> {
      const newLike = Object.assign({},like);

      newLike[id] = !like[id];

      return newLike;
    })
  },[like]);

  React.useEffect(()=>{
    if(!l_rt && loading){
      return;
    } else if(l_rt === 200 && like[boardId]){
      dispatch(doLike(boardId));
    } else if(l_rt === 200 && !like[boardId]){
      dispatch(doDislike(boardId));
    }

  },[like,boardId]);

  return (
    <>
      <HeaderTitle title="동굴생활" />
      <main>
        {loading && (
          <div className="loading">
            <ReactLoading type="bubbles" color="#f99d1b" />
          </div>
        )}
        
        {rt !== 200 && (
          <div className="error">
            <h2>Error!</h2>
            <p>{rtmsg}</p>
          </div>
        )}

        {rt === 200 && (
          <>
          <CavePostVeiw data={item} inview={ref} likeList={l_item} onBtnClick={onBtnClick}/>
          <WriteButton path='/newcavelife'/>
          </>
        )}
      </main>
    </>
  );
};

export default CaveLife;
