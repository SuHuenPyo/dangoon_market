import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";
import { postNewProduct, setInital } from "../Slices/ProductSlice";
import { useSelector, useDispatch } from 'react-redux';
import RegexHelper from "../utils/RegexHelper";
import styles from '../asset/scss/SignupForm.module.scss';
import Meta from '../components/Meta';

   /* 안내창 위치떄문에 여기 페이지는 main 제외 */
const NewProduct = () => {

  const [notice, setNotice] = React.useState({ title: null, subTitle: null, type:null });
  const form = React.useRef();

  const { rt, loading } = useSelector((state) => state.newproduct);

  const dispatch = useDispatch();


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
    postForm.append('title', form.current.postTitle.value);
    postForm.append('price',  form.current.productPrice.value);
    postForm.append('category', form.current.category.value);
    postForm.append('content',form.current.postContent.value);
    [...form.current.postImg.files].forEach((img,index)=>{
      postForm.append('board', form.current.postImg.files[index]);
    });


    dispatch(postNewProduct(postForm));

  }

  React.useEffect(() => {

    if(rt === null){
      console.log('if1');
      return;
    }

    if(rt === 200){

      dispatch(setInital())

      return setNotice({
        title: "등록이 완료되었습니다.",
        subTitle: null,
        type: 'compelete'
      });
    } 

    if (rt !== 200 ){
      dispatch(setInital())

      return setNotice({
        title: "등록에 실패하였습니다.",
        subTitle: null,
        type: 'fail'
      });
    }

    return setNotice({ title: null, subTitle: null, type:null });

  },[rt,loading])

  return (
    <>
      <Meta title="판매글쓰기" description="단군마켓 판매글쓰기 페이지"  />
      <HeaderLogo />
        <PostForm ref={form} loading={loading} onSubmit={doPost} title="판매" noticeTitle={notice.title} noticeSubTitle={notice.subTitle} noticeType={notice.type}/>
    </>
  );
};

export default NewProduct;
