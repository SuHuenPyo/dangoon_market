import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

import HeaderLogo from '../components/HeaderLogo';
import Notice from '../components/Notice';

const Title = styled('div')`
    width:84%;
    margin: 30px auto 15px auto;
    text-align: left;
    h2 {
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 40px;
        color:#af713c
    }

    p { 
        margin-top: 2px;
        font-size: 0.8rem;
        line-height:1.2rem;
        color: #af713c;
        opacity: 0.7;
    }
`

const Form = styled.form`
    width: 84%;
    height:auto;
    margin: 10px auto;

    input {
        display:block;
        width: 100%;
        height:46px;
        margin: 10px auto;
        border:1px solid #ccc;
        border-radius:10px;
        text-indent: 10px;
    }

    button {
        width: 100%;
        height: 46px;
        border: 1px solid #e5e5e5;
        border-radius:40px;
        background-color:#ff9500;
        color:white;
        font-size: 0.83rem;
        font-weight: 600;
        margin-top: 10px;
    }
`
const SignupLink = styled.div`
    margin-top: 30px;
    text-align: center;
    color: #89603d;
    font-size: 0.9rem;
    line-height: 1.2rem;

    a {
        color:#af713c;
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

    
`


const Login = () => {
    return (
        <>
        <HeaderLogo/>
        <main>
            <Title>
                <h2>LOGIN</h2>
                <p>안녕하세요. 단군마켓을 통해 중고거래를 시작해보세요.</p>
                </Title>
            <Form action="" method='post'>
                <input type="text" placeholder='아이디' />
                <input type="password" placeholder='패스워드' />
                <button type='submit'>로그인하기</button>
            </Form>
            <SignupLink>
                <p>단군마켓 회원이 아니신가요?
                <Link to='/signup'>회원가입하기</Link>
                </p>
            </SignupLink>
        </main>
        <Notice/>
        </>
    );
};

export default Login;