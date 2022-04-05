import React from "react";
import styles from "../asset/scss/PostForm.module.scss";
import { BsPlusSquareDotted } from "react-icons/bs";
import styled from "styled-components";
import onImgUpload from "../utils/ImgPreview";
import Notice from "./Notice";
import { useNavigate } from 'react-router-dom';

const ImgUploadBtn = styled.label`
  display: block;
  flex-basis: 75px;
  width: 75px;
  height: 75px;
  text-align: center;
  background-color: white;
  color: white;
  z-index: 999;

  & svg {
    color: #ddd;
    width: 100%;
    height: 100%;
  }
`;

const ImgSpace = styled.div`
  width: 100vh;
  height: 75px;
  display: flex;
  overflow-x: scroll;
  position:relative;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    display: block;
    width: 75px;
    height: 75px;
  }
`;

const PostForm = React.forwardRef((props,ref) => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  
  const onClick = () => {
    setShow(false);
    
    if(props.noticeType === 'notAMember'){
      return navigate('/login');
    }

    if(props.noticeType === 'compelete'){
      return navigate('/home');
    }
  }
  
  React.useEffect(() => {

    if(props.noticeType !== null){
      setShow(true);
    } else {
      return;
    }

  },[props.noticeType])

  return (
    <>
      <main>
        <h2 className={styles.pageTitle}>{props.title}글 등록</h2>
        <form
          className={styles.productPost}
          action="post"
          encType="multipart/form-data"
          ref={ref}
          onSubmit={props.onSubmit}
        >
          <input
            type="text"
            className={styles.productCommon}
            placeholder="제목을 입력해주세요"
            id='postTitle'
            name='postTitle'
          />
          {props.title === "판매" ? (
            <>
             <input
               type="text"
               className={styles.productCommon}
               placeholder="가격을 입력해주세요."
               id='productPrice'
               name='productPrice'
               />
            <select
              defaultValue="none"
              name="category"
              className={`${styles.productCommon} ${styles.productCategory}`}
              id='productCategory'
              >
              <option value="none" disabled hidden>
                카테고리
              </option>
              <option value="gajun">가전</option>
              <option value="life">생활</option>
              <option value="sports">스포츠</option>
              <option value="book">도서</option>
              <option value="beauti">뷰티</option>
              <option value="acc">잡화</option>
              <option value="cloth">의류</option>
              <option value="plant">식물</option>
              <option value="etc">기타</option>
            </select>
              </>
          ) : (
            <></>
          )}

          <div className={styles.productImgUpload}>
            <div className={styles.productUploadBtn}>
              <ImgUploadBtn htmlFor="postImg">
                <BsPlusSquareDotted />
              </ImgUploadBtn>
              <input
                type="file"
                accept="image/*"
                id="postImg"
                name="postImg"
                className={styles.productImg}
                onChange={(event)=>{onImgUpload(event,"#imgView")}}
                multiple
              />
            </div>

            <ImgSpace id='imgView'>
  
            </ImgSpace>
          </div>

          <textarea
            name="postContent"
            id='postContent'
            className={styles.productTextarea}
            cols="30"
            rows="10"
          ></textarea>

          <button
            type="submit"
            className={`${styles.productCommon} ${styles.productPostBtn}`}
          >
            글쓰기 완료
          </button>
        </form>
      </main>
      <Notice
        show={show}
        onClick={onClick}
        title={props.noticeTitle}
        subTitle={props.noticeSubTitle}
      />
    </>
  );
});

PostForm.defaultProps = {
  title: '판매',
  noticeTitle: '정상처리되었습니다.',
  noticeSubTitle: null,
  noticeType: null,
  onSubmit: () => { alert('Give me Function') },
}

export default PostForm;
