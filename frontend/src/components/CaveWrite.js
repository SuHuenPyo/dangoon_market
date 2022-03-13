import React from "react";
import style from '../css/cavewrite.module.css';
import { AiOutlinePlusSquare } from "react-icons/ai";

const CaveWrite2 = () => {
  return (
    <div className={style.postcavewritepage}>
        <h2 className={style.pgtitle}>동굴생활 글쓰기</h2>
        <form className={style.cavewritepost} action="post" enctype="multipart/form-data">
            <input type="text" id="ps-title" className={style.cavewritecommon} placeholder="제목을 입력해주세요" />

            <div className={style.cavewriteimgupload}>
                <img src="https://via.placeholder.com/75" alt="" />
                <div className={style.cavewriteuploadbtn}>
                    <label for="cavewrite-img"><AiOutlinePlusSquare /></label>
                    <input type="file" className={style.cavewriteimg} />
                </div>
            </div>

            <textarea name={style.cavewriteinfo} className={style.cavewritetextarea} cols="30" rows="10"></textarea>

            <button type="button" className={style.cavewritecommon}>글쓰기 완료</button>
        </form>
    </div>
  );
};

export default CaveWrite2;
