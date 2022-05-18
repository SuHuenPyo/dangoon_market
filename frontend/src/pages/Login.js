import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Meta from "../components/Meta";

import HeaderLogo from "../components/HeaderLogo";
import Notice from "../components/Notice";

import RegexHelper from "../utils/RegexHelper";
import styles from "../asset/scss/SignupForm.module.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { login } from "../Slices/LoginSlice";


const Title = styled("div")`
  width: 84%;
  margin: 30px auto 15px auto;
  text-align: left;
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 40px;
    color: #af713c;
  }

  p {
    margin-top: 2px;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #af713c;
    opacity: 0.7;
  }
`;

const Form = styled.form`
  width: 84%;
  height: auto;
  margin: 10px auto;

  input {
    display: block;
    width: 100%;
    height: 46px;
    margin: 10px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-indent: 10px;
  }

  button.submit {
    width: 100%;
    height: 46px;
    border: 1px solid #e5e5e5;
    border-radius: 40px;
    background-color: #ff9500;
    color: white;
    font-size: 0.83rem;
    font-weight: 600;
    margin-top: 10px;
  }
`;

const SignupLink = styled.div`
  margin-top: 30px;
  text-align: center;
  color: #89603d;
  font-size: 0.9rem;
  line-height: 1.2rem;

  a {
    color: #af713c;
    line-height: 1.3rem;
    font-size: 0.9rem;
    margin-left: 15%;
    padding: 6px;
    border: 1px solid #af713c;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    background-color: #af713c;
    color: #fff;
  }
`;

const Password = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  .eyes {
    all: unset;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 16px;
    right: 10px;
    color: #b5b5b5;
    display: none;
  }

  .show {
    display: block;
  }
`;

const Login = () => {
  const { rt, loading } = useSelector((state) => state.login, shallowEqual);
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState(true);
  const [notice, setNotice] = React.useState({ title: null, subTitle: null });
  const loginForm = React.useRef();

  const onClick = () => {
    setShow(false);
  };

  const doLogin = async (e) => {
    e.preventDefault();

    document.querySelectorAll(`.${styles.errMsg}`).forEach((v, i) => {
      v.remove();
    });

    const regex = new RegexHelper();

    // 아이디
    if (!regex.value("userId", "아이디를 입력해주세요.")) {
      return;
    }
    //패스워드
    if (!regex.value("password", "패스워드를 입력해주세요.")) {
      return;
    }

    const userId = e.target.userId.value;
    const password = e.target.password.value;

    await dispatch(login({ user_id: userId, user_pw: password }));
  };

  const handPassword = () => {
    setPassword((prevState) => !prevState);
  };

  const navigator = useNavigate();

  React.useEffect(() => {
    if (rt === null) {
      return;
    }

    if (!loading && rt === 200) {
      console.log(rt);
      return navigator(-1);
    }

    if (!loading && rt === 402) {
      console.log(rt);
      setNotice({
        title: "이미 로그인 되어있습니다.",
        subTitle: null,
      });
      setShow(true);

      return;
    }

    if (!loading && rt !== 400) {
      console.log(rt);
      setNotice({
        title: "로그인에 실패했습니다.",
        subTitle: "다시 한번 시도해주세요.",
      });
      setShow(true);
    }

    return;
  }, [dispatch, rt, loading]);

  return (
    <>
      <Meta title="단군마켓 로그인 페이지" description="단군마켓 로그인 페이지" />
      <HeaderLogo />
      <main>
        <Title>
          <h2>LOGIN</h2>
          <p>안녕하세요. 단군마켓을 통해 중고거래를 시작해보세요.</p>
        </Title>
        <Form ref={loginForm} action="" method="get" onSubmit={doLogin}>
          <input id="userId" name="userId" type="text" placeholder="아이디" />
          <Password>
            <input
              id="password"
              name="password"
              type={password ? "password" : "text"}
              placeholder="패스워드"
            />
            <button
              onClick={handPassword}
              className={`eyes ${password ? "show" : null}`}
              type="button"
            >
              <AiOutlineEye />
            </button>
            <button
              onClick={handPassword}
              className={`eyes ${password ? null : "show"}`}
              type="button"
            >
              <AiOutlineEyeInvisible />
            </button>
          </Password>
          <button className="submit" type="submit">
            로그인하기
          </button>
        </Form>
        <SignupLink>
          <p>
            단군마켓 회원이 아니신가요?
            <Link to="/signup">회원가입하기</Link>
          </p>
        </SignupLink>
      </main>
      <Notice
        show={show}
        title={notice.title}
        subTitle={notice.subTitle}
        onClick={onClick}
      />
    </>
  );
};

export default Login;
