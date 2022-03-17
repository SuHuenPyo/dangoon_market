import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styled from "styled-components";
import styles from "../asset/scss/SignupForm.module.scss";
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import Notice from "../components/Notice";
import axios from "axios";
import Authentication from "../utils/Authentication";

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  margin: 3px auto;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  text-indent: 10px;
`;

const ErrText = styled.p`
  width: 100%;
  color: red;
  display: none;
`;

const Button = styled.button`
  border: 1px solid #e5e5e5;
  color: white;
  background-color: #f99d1b;
`;

const Signup = () => {
  const userEmail = React.useRef();
  const vaildNum = React.useRef();
  const imgInput = React.useRef();
  const imgView = React.useRef();

  // 안내창 관련 이벤트 정의
  const [validShow, setValidShow] = React.useState(false);
  const [isAct, setisAct] = React.useState("받기");
  const [NoticeTitle, setNoticeTitle] = React.useState({ title: null, subTitle: null})

  const onToggleShow = React.useCallback(() => {
    setValidShow(validShow ? false : true);
    console.log(validShow);
  }, [validShow]);



  // 인증메일 발송하기
  const reqValidNum = async(event) => {
    const auth = new Authentication(userEmail.current.value, vaildNum.current.value);

    const result = await auth.send;

    if (result.status === 200) {
      setisAct("확인");
      setNoticeTitle({title:  '인증메일 발송이 완료되었습니다.',subTitle: `5분 이내로 인증해주세요.`})
      return onToggleShow();
    }
  };
  
  
  // 인증번호 전송하기
  const postValidNum = async (event) => {
    const auth = new Authentication(userEmail.current.value, vaildNum.current.value);

    const result = await auth.check;
    console.log(result);
    if (result.status === 200) {
      setNoticeTitle({title:'인증이 완료되었습니다.',subTitle:null});
      onToggleShow();
      vaildNum.current.readOnly = true;
      userEmail.current.readOnly = true;
      console.log(event);
      return event.target.disabled = true;
    } else if (result.status !== 200 ){
      setNoticeTitle({title: '인증에 실패했습니다.',subTitle:`인증번호를 다시 확인해주세요.`});
      onToggleShow(); 
      setTimeout(()=>{setisAct('받기')},1000 * 60 * 5);
      return vaildNum.current.focus();
    }
  };

  // 인증번호 발송하기 인증하기
  const AuthFunc = React.useCallback((event) => {
    
    return isAct === "받기" ? reqValidNum(event) : postValidNum(event);
  }, [isAct]);

  // 프로필 미리보기 이미지관련 함수
  const onImgUpload = async (e) => {
    if (imgInput.current.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        imgView.current.innerHTML = `<img src=${event.target.result} />`;
      };

      reader.readAsDataURL(imgInput.current.files[0]);
    }
  };

  return (
    <>
      <HeaderLogo />
      <main>
        <form action="" method="post" encType="multipart/form-data">
          {/* 이미지 업로드 영역 */}
          <div className={styles.UploadImg}>
            <input
              ref={imgInput}
              id="update_img"
              type="file"
              name="userImg"
              accept="image/*"
              onChange={onImgUpload}
            />
            <label className={styles.uploader} htmlFor="update_img">
              <AiOutlineCamera />
            </label>
            <div ref={imgView} className={styles.imgView}>
              {/* 업로드된 이미지 영역 */}
              {/* 이미지 업로드 전 표시될 아이콘 */}
              <AiOutlineUser />
            </div>
          </div>
          <div className={styles.inputArea}>
            <Input type="text" placeholder="이름" name="userName" />
            <ErrText>이름은 30자 이하로 작성해주세요.</ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input type="text" placeholder="아이디" name="userId" />
            <p className={styles.info}>
              영어 소문자, 숫자를 조합하여 6자리 이상
            </p>
            <ErrText>
              아이디는 영어 소문자, 숫자를 조합하여 6~20자로 작성해주세요.
            </ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input type="password" placeholder="패스워드" name="password" />
            <p className={styles.info}>
              영어 소문자, 숫자, 특수문자를 조합하여 8자리 이상
            </p>
            <ErrText>아이디는 영어 소문자, 숫자,특수문자를 조합하여 8~30자로 작성해주세요.</ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input type="password" placeholder="패스워드 확인" />
            <ErrText></ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input type="email" placeholder="이메일" ref={userEmail} />
            <ErrText></ErrText>
          </div>
          <div className={`${styles.inputArea} ${styles.validation}`}>
            <Input
              ref={vaildNum}
              type="text"
              placeholder="인증번호"
              name="validationNum"
            />
            <Button type="button" onClick={AuthFunc}>
              인증번호 {isAct}
            </Button>
          </div>
          <div className={styles.inputArea}>
            <Input type="text" placeholder="kakao ID" />
          </div>
          <Button type="submit" className={styles.signupBtn}>
            가입하기
          </Button>
        </form>
      </main>
      <Notice
        show={validShow}
        title={NoticeTitle.title}
        subTitle={NoticeTitle.subTitle}
        onClick={onToggleShow}
      />
    </>
  );
};

export default Signup;
