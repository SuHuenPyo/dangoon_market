import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styled from "styled-components";
import styles from "../asset/scss/SignupForm.module.scss";
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import Notice from "../components/Notice";
import Authentication from "../utils/Authentication";
import RegexHelper from "../utils/RegexHelper";

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
  const vaildCode = React.useRef();
  const imgInput = React.useRef();
  const imgView = React.useRef();

  const [isAct, setisAct] = React.useState("받기");

  // 안내창 관련 이벤트 정의
  const [validShow, setValidShow] = React.useState(false);
  const [NoticeTitle, setNoticeTitle] = React.useState({
    title: null,
    subTitle: null,
  });

  const onToggleShow = React.useCallback(() => {
    setValidShow(validShow ? false : true);
    console.log(validShow);
  }, [validShow]);

  // 인증메일 발송하기
  const reqValidNum = async (event) => {
    const regex = new RegexHelper();
    
    if(!regex.value("userEmail", "이름을 입력해주세요.")){return;}
    if(!regex.email('userEmail','이메일 형식으로 입력해주세요.')){return;}

    const auth = new Authentication(
      userEmail.current.value,
      vaildCode.current.value
    );

    const result = await auth.send;

    if (result.status === 200) {
      setisAct("확인");
      setNoticeTitle({
        title: "인증메일 발송이 완료되었습니다.",
        subTitle: `5분내로 인증해주세요.`,
      });

      return onToggleShow();
    }
  };

  // 인증번호 확인하기
  const postValidNum = async (event) => {
    const auth = new Authentication(
      userEmail.current.value,
      vaildCode.current.value
    );

    const result = await auth.check;

    if (result.status === 200) {
      setNoticeTitle({ title: "인증이 완료되었습니다.", subTitle: null });
      onToggleShow();

      vaildCode.current.readOnly = true;
      userEmail.current.readOnly = true;
      return (event.target.disabled = true);
    } else if (result.status !== 200) {
      setNoticeTitle({
        title: "인증에 실패했습니다.",
        subTitle: `인증번호를 다시 확인해주세요.`,
      });

      onToggleShow();

      return vaildCode.current.focus();
    }
  };

  // 인증번호 발송하기 인증하기
  const AuthFunc = React.useCallback(
    (event) => {
      return isAct === "받기" ? reqValidNum(event) : postValidNum(event);
    },
    [isAct]
  );

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

  const validation = (e) => {
    e.preventDefault();

    const regex = new RegexHelper();

    document.querySelectorAll(`.${styles.errMsg}`).forEach((v,i)=>{
      v.remove();
    })


    //이름
    if(!regex.value("name", "이름을 입력해주세요.")){return;}
    if(!regex.maxLen("name",20,"20글자 이내로 입력가능합니다.")){return;}

    // 아이디
    if(!regex.value("userId", "아이디를 입력해주세요.")){return;}
    if(!regex.minLen("userId",6,"6글자 이상 입력해주세요.")){return;}
    if(!regex.maxLen("userId",20,"6~20글자 이내로 입력가능합니다.")){return;}
    if(!regex.engNum("userId","영어와 숫자를 포함하여 입력해주세요.")){return;}
    // 패스워드
    if(!regex.value("password", "패스워드를 입력해주세요.")){return;}
    if(!regex.minLen("password",8,"8글자 이상 입력해주세요.")){return;}
    if(!regex.maxLen("password",30,"8~30글자 이내로 입력가능합니다.")){return;}
    if(!regex.engNumSp("password","영어와 숫자,특수문자를 포함하여 입력해주세요.")){return;}
    // 패스워드 체크
    if(!regex.value("password_check", "비밀번호를 다시 입력해주세요.")){return;}
    if(!regex.compare_to("password","password_check","비밀번호가 일치하지않습니다.")){return;}

    // 이메일
    if(!regex.value("userEmail", "이메일을 입력해주세요.")){return;}
    if(!regex.email('userEmail','이메일 형식으로 입력해주세요.')){return;}

    // 카카오아이디
    if(!regex.value("kakaoId", "카카오 아이디를 입력해주세요.")){return;}
    if(!regex.maxLen("kakaoId",45,"45글자 이내로 입력가능합니다.")){return;}

    if(!vaildCode.current.readOnly){regex.throwErr(vaildCode.current.parentElement,'이메일 인증을 진행해주세요.'); return;}

    setNoticeTitle({
      title: "단군마켓 가입이 완료되었습니다.",
      subTitle: `감사합니다.`,
    });

    onToggleShow();
  };

  return (
    <>
      <HeaderLogo />
      <main>
        <form action="" method="post" encType="multipart/form-data" onSubmit={validation}>
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
              <AiOutlineUser />
            </div>
          </div>
          <div className={styles.inputArea}>
            <Input id="name" type="text" placeholder="이름" name="userName" />
            <ErrText>이름은 30자 이하로 작성해주세요.</ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input id="userId" type="text" placeholder="아이디" name="userId" />
            <p className={styles.info}>
              영어 소문자, 숫자를 조합하여 6자리 이상
            </p>
          </div>
          <div className={styles.inputArea}>
            <Input
              id="password"
              type="password"
              placeholder="패스워드"
              name="password"
            />
            <p className={styles.info}>
              영어 소문자, 숫자, 특수문자를 조합하여 8자리 이상
            </p>
          </div>
          <div className={styles.inputArea}>
            <Input
              id="password_check"
              type="password"
              placeholder="패스워드 확인"
            />
          </div>
          <div className={styles.inputArea}>
            <Input
              id="userEmail"
              type="email"
              placeholder="이메일"
              ref={userEmail}
              onChange={() => {
                if (isAct === "확인") {
                  setisAct("받기");
                }
              }}
            />
          </div>
          <div id='validCode' className={styles.inputArea}>
            <div className={styles.validation}>
            <Input
              ref={vaildCode}
              type="text"
              placeholder="인증번호"
              name="validationNum"
            />
            <Button type="button" onClick={AuthFunc}>
              인증번호 {isAct}
            </Button>
            </div>
          </div>
          <div className={styles.inputArea}>
            <Input id="kakaoId" type="text" placeholder="kakao ID" />
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
