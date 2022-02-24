import React from "react";
import styles from "../scss/PostForm.module.scss";
import { BsPlusSquareDotted } from "react-icons/bs";
import styled from "styled-components";

const ImgUploadBtn = styled.label`
  display: block;
  flex-basis: 75px;
  width: 75px;
  height: 75px;
  text-align: center;
  background-color: white;
  color: white;
  z-index:999;

  & svg {
      color: #ddd;
      width: 100%;
      height: 100%;
  }
`;

const ImgSpace = styled.div`
  width: calc(100% - 75px);
  height: 75px;
  max-height: 75px;
  display: flex;
  overflow: auto;
  scrollbar-width: none; /* Firefox */    

  &::-webkit-scrollbar {
      display: none;
  }
`

const PostForm = (props) => {
  return (
    <>
      <h2 className={styles.pageTitle}>{props.title}글 등록</h2>
      <form
        className={styles.productPost}
        action="post"
        enctype="multipart/form-data"
      >
        <input
          type="text"
          className={styles.productCommon}
          placeholder="제목을 입력해주세요"
        />
        {props.title === "판매" ? (
          <select name="category" className={`${styles.productCommon} ${styles.productCategory}`}>
            <option value="none" disabled selected hidden>
              카테고리
            </option>
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
        ) : (
          <></>
        )}

        <div className={styles.productImgUpload}>
          <div className={styles.productUploadBtn}>
            <ImgUploadBtn for="product-img">
              <BsPlusSquareDotted />
            </ImgUploadBtn>
            <input type="file" accept="image/*" id='product-img' className={styles.productImg} />
          </div>

          <ImgSpace>
              <img src="https://via.placeholder.com/75" alt="" />
              <img src="https://via.placeholder.com/75" alt="" />
              <img src="https://via.placeholder.com/75" alt="" />
              <img src="https://via.placeholder.com/75" alt="" />
              <img src="https://via.placeholder.com/75" alt="" />
              <img src="https://via.placeholder.com/75" alt="" />
          </ImgSpace>
        </div>

        <textarea
          name="product-info"
          className={styles.productTextarea}
          cols="30"
          rows="10"
        ></textarea>

        <button
          type="button"
          className={`${styles.productCommon} ${styles.productPostBtn}`}
        >
          글쓰기 완료
        </button>
      </form>
    </>
  );
};

export default PostForm;
