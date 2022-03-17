import React from "react";
import style from '../asset/css/cavewrite.module.css';
import { BsPlusLg } from "react-icons/bs";

import Notice from './Notice';

const CaveWrite2 = () => {
  const [show, setShow] = React.useState(false);

  const onCheck = React.useCallback(()=>{
  window.location.href = '/home';
  },[])

  return (
    <>
    <div className={style.postcavewritepage}>
        <h2 className={style.pgtitle}>동굴생활 글쓰기</h2>
        <form className={style.cavewritepost} action="post" enctype="multipart/form-data">
            <input type="text" id="ps-title" className={style.cavewritecommon} placeholder="제목을 입력해주세요" />

            <div className={style.cavewriteimgupload}>
                <img src="https://via.placeholder.com/75" alt="" />
                <div className={style.cavewriteuploadbtn}>
                    <label for="cavewrite-img"><BsPlusLg /></label>
                    <input type="file" id="cavewrite-img" className={style.cavewriteimg} />
                </div>
            </div>

            <textarea name="cavewrite-info" className={style.cavewritetextarea} cols="30" rows="10"></textarea>

            {console.log(show)}
            <button type="button" className={style.cavewritepostbtn} onClick={()=>{setShow(true)}}>글쓰기 완료</button>
        </form>
    </div>
    <Notice show={show} onClick={onCheck}/>
    </>
  );
};

export default CaveWrite2;
