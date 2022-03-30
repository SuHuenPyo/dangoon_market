import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";
import {postNewProduct} from "../Slices/ProductSlice";
import { useSelector, useDispatch } from 'react-redux';
import RegexHelper from "../utils/RegexHelper";
import styles from '../asset/scss/SignupForm.module.scss';

   /* 안내창 위치떄문에 여기 페이지는 main 제외 */
const NewProduct = () => {
  const [notice, setNotice] = React.useState({ title: null, subTitle: null, type:null });
  const form = React.useRef();

  const { rt, loading } = useSelector((state) => state.newproduct);

  const dispatch = useDispatch();


  React.useEffect(() => {
    const isLogin = window.sessionStorage.getItem("userId");

    console.log(isLogin);

    if (isLogin === null) {
      setNotice({
        title: "현재 로그인되어있지 않습니다.",
        subTitle: "로그인해주세요.",
        type: 'notAMember'
      });
    } 

  }, []);

  const doPost = async(e) => {
    e.preventDefault();


    document.querySelectorAll(`.${styles.errMsg}`).forEach((v,i)=>{
      v.remove();
    })

    const regex = new RegexHelper();

    if(!regex.value('postTitle','제목을 입력해주세요.')){return;};
    if(!regex.value('productPrice','가격을 입력해주세요.')){return;};
    if(!regex.selected('productCategory','카테고리를 선택해주세요.')){return;};
    if(!regex.value('postContent','내용을 입력해주세요.')){return;};
    const postForm = new FormData();
    const memberId = window.sessionStorage.getItem('mId')
    postForm.append('memberId', memberId);
    postForm.append('title', form.current.postTitle.value);
    postForm.append('price',  form.current.productPrice.value);
    postForm.append('category', form.current.category.value);
    postForm.append('content',form.current.postContent.value);
    postForm.append('board', form.current.postImg.files);


    dispatch(postNewProduct(postForm));

  }

  React.useEffect(() => {

    if(rt === null){
      return;
    }

    if(!loading && rt === 200){
      setNotice({
        title: "등록이 완료되었습니다.",
        subTitle: null,
        type: 'compelete'
      });
    } 
    if (!loading && rt !== 200 ){
      console.log(rt);
      setNotice({
        title: "등록에 실패하였습니다.",
        subTitle: null,
        type: 'fail'
      });
    }

  },[rt,loading,dispatch])

  return (
    <>
      <HeaderLogo />
        <PostForm ref={form} onSubmit={doPost} title="판매" noticeTitle={notice.title} noticeSubTitle={notice.subTitle} noticeType={notice.type}/>
    </>
  );
};

export default NewProduct;
