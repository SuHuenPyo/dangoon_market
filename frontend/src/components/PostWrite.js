import React from "react";
import style from '../css/salewrite.module.css';
import { BsPlusLg } from "react-icons/bs";

const PostWrite = () => {
    return (
    <div classNameName={style.postproductpage}>
        <h2 className={style.pagetitle}>판매글 등록하기</h2>
        <form className={style.productpost} action="post" enctype="multipart/form-data">
            <input type="text" className={style.productcommon} placeholder="제목을 입력해주세요" />
            <select name="category" className={style.productcategory}>
                <option value="none" disabled selected hidden>카테고리</option>
                <option value="gajun">가전</option>
                <option value="life">생활</option>
                <option value="sports">스포츠</option>
                <option value="book">도서</option>
                <option value="beauti">뷰티</option>
                <option value="acc">잡화</option>
                <option value="cloth">의류</option>
                <option value="plant">식품</option>
                <option value="etc">기타</option>
            </select>

            <div className={style.productimgupload}>
                <img src="https://via.placeholder.com/75" alt="" />
                <div className={style.productuploadbtn}>
                    <label for="product-img"><BsPlusLg /></label>
                    <input type="file" id="product-img" className={style.productimg} />
                </div>
            </div>

            <textarea name="product-info" className={style.producttextarea} cols="30" rows="10"></textarea>

            <button id="product-post-btn" type="button" className={style.productpostbtn}>글쓰기 완료</button>
        </form>
    </div>
  );
};

export default PostWrite;
