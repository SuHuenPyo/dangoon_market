import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import styled from "styled-components";
import styles from "../asset/scss/SignupForm.module.scss";
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import Notice from "../components/Notice";
import { onImgView } from "../utils/ImgPreview";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../Slices/ProfileSlice";
import Authentication from "../utils/Authentication";
import Meta from '../components/Meta';

// styled-components
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
  const [disabled, setDisabled] = React.useState(true)
  const { m_item } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // 안내창 관련 이벤트 정의
  const [validShow, setValidShow] = React.useState(false);
  const [notice, setNotice] = React.useState({ title: null, subTitle: null});

  const onToggleShow = React.useCallback(() => {
    setValidShow(validShow ? false : true);
  }, [validShow]);

  React.useEffect(() => {
    if (!m_item.m_name) {
      dispatch(getMyProfile());
    }
  }, []);


 
  return (
    <>
      <Meta title="나의 마늘" description="단군마켓 나의 마늘 페이지"  />
      <HeaderLogo />
      <main>
        <form action="" method="post" encType="multipart/form-data">
          {/* 이미지 업로드 영역 */}
          <div className={styles.UploadImg}>
            <input
              id="userImg"
              type="file"
              name="userImg"
              accept="image/*"
              onChange={(event) => {
                onImgView(event, "#myprofile_img", "newprofile");
              }}
            />
            <label className={styles.uploader} htmlFor="userImg">
              <AiOutlineCamera />
            </label>
            <div id="myprofile_img" className={styles.imgView}>
              {/* 업로드된 이미지 영역 */}
              {/* 이미지 업로드 전 표시될 아이콘 */}
              <img
                src={m_item.m_pic}
                alt={`${m_item.m_name}의 프로필 이미지`}
              />
              <AiOutlineUser />
            </div>
          </div>
          <div className={styles.inputArea}>
            <Input
              type="text"
              placeholder="이름"
              name="userName"
              defaultValue={m_item.m_name}
            />
            <ErrText>이름은 30자 이하로 작성해주세요.</ErrText>
          </div>
          <div className={styles.inputArea}>
            <Input
              type="text"
              placeholder="아이디"
              name="userId"
              defaultValue={m_item.m_user_id}
              readOnly 
            />
          </div>
          <div className={styles.inputArea}>
            <Input
              type="email"
              placeholder="이메일"
              defaultValue={m_item.m_email}
              ref={userEmail}
              onChange={()=>{setDisabled(false)}}
            />
            <ErrText></ErrText>
          </div>
          <div className={`${styles.inputArea} ${styles.validation}`}>
            <Input
              type="text"
              placeholder="인증번호"
              name="validationNum"
              readOnly={disabled}
            />
            <Button
              type="button"
              onClick={ async()=>{
                const Auth = new Authentication(userEmail.current.value);

                const result = Auth.send;

                if(result.status === 200){
                  setValidShow(true);
                  setNotice({ title: "인증메일 발송이 완료되었습니다.", subTitle: `작성하신 이메일의 메일함을 확인해주세요.` })
                } else if (result.status > 200){
                  setValidShow(true)
                  setNotice({ title: "인증메일 발송에 실패하였습니다.", subTitle: `다시 한번 시도해주세요.` })
                }
              }}
              disabled={disabled}
            >
              인증번호 전송
            </Button>
          </div>
          <div className={styles.inputArea}>
            <Input
              type="text"
              placeholder="kakao ID"
              defaultValue={m_item.m_kakao_id}
            />
          </div>
          <Button type="submit" className={styles.saveBtn}>
            저장하기
          </Button>
        </form>
      </main>
      <Notice
        show={validShow}
        title={notice.title}
        subTitle={notice.subTitle}
        onClick={onToggleShow}
      />
    </>
  );
};

export default Signup;
