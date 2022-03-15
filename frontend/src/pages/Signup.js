import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styled from "styled-components";
import styles from "../scss/SignupForm.module.scss";
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import Notice from "../components/Notice";
import axios from 'axios';

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
  const imgInput = React.useRef();
  const imgView = React.useRef();

  // 안내창 관련 이벤트 정의
  const [validShow, setValidShow] = React.useState(false);


  const onToggleShow = React.useCallback(() => {
    setValidShow(validShow ? false : true);
    console.log(validShow);
  }, [validShow]);


  // 인증메일 발송하기 
  const sendValidNum = async (e) => {
    let result = null;
    const emailAddr = userEmail.current.value;

    if(!emailAddr){
      alert('인증번호를 발송할 이메일을 입력해주세요.');
      return;
    }

    try {
        const response = await axios.post("http://dg-market.iptime.org:28019/mail",{
            'user_email' : emailAddr,
        });

        result = response;

    } catch(err) {
       console.log(err.reponse);
       alert('에러가 발생했습니다. 관리자에게 문의해주세요.');
       return;
    }

    console.log(result.status === 200);
    console.dir(result);
    console.dir(result.status);
    
    if(result.status === 200){
      console.log(e.currentTarget);
      e.currentTarget.innerText = "인증번호 확인";
      return onToggleShow();
    }

  }

  // 프로필 미리보기 이미지관련 함수
  const onImgUpload = () => {
    if(imgInput.current.files[0]){
        const reader = new FileReader();

        reader.onload = (event) => {
          imgView.current.innerHTML = `<img src=${event.target.result} />`;
        }

        reader.readAsDataURL(imgInput.current.files[0]);
    }
  }

  return (
    <>
      <HeaderLogo />
      <main>
        <form action="" method="post" encType="multipart/form-data">
          {/* 이미지 업로드 영역 */}
          <div className={styles.UploadImg}>
            <input ref={imgInput} id="update_img" type="file" name="userImg" accept='image/*' onChange={onImgUpload}/>
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
              영어 소문자, 숫자를 조합하여 8자리 이상
            </p>
            <ErrText>
              아이디는 영어 소문자, 숫자를 조합하여 8~45자로 작성해주세요.
            </ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input type="password" placeholder="패스워드" name="password" />
            <p className={styles.info}>
              영어 소문자, 숫자, 특수문자를 조합하여 8자리 이상
            </p>
            <ErrText></ErrText>
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
            <Input type="text" placeholder="인증번호" name="validationNum" />
            <Button
              type="button"
              onClick={sendValidNum}
            >
              인증번호 전송
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
          title="인증메일 발송이 완료되었습니다."
          subTitle={`작성하신 이메일의 메일함을 확인해주세요.`}
          onClick={onToggleShow}
        />
    </>
  );
};

export default Signup;
