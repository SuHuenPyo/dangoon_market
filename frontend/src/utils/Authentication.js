import axios from "axios";

class Authentication {
  constructor(email, validCode) {
    this._email = email;
    this._validCode = validCode;
    this._result = null;
  }

  get send() {
    return this.sendValidCode();
  }

  get check() {
    return this.checkValidCode();
  }

  sendValidCode = async () => {
    let result = null;
    const email = this._email;
    let url = "http://dg-market.iptime.org:28019/mail";

    if (!email) {
      alert("인증번호를 발송할 이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(url, {
        user_email: email,
      });

      result = response;
    } catch (err) {
      alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
      result = err.response;
    }

    return result;
  };

  checkValidCode = async () => {
    let result = null;
    const vaildCode = this._validCode;
    const email = this._email;

    if (!vaildCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(
        "http://dg-market.iptime.org:28019/signup/auth",
        {
          params: { user_email: email, auth_code: vaildCode },
        }
      );

      result = response;
    } catch (err) {
      return err.response;
    }

    return result;
  };
}

export default Authentication;
