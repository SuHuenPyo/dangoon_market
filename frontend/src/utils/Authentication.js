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
    let url = "https://dangoon.duckdns.org/api/mail";

    try {
      const response = await axios.post(url, {
        user_email: email,
      });

      result = response;
    } catch (err) {
      alert("에러가 발생했습니다. 관리자에게 문의해주세요.");
      result = err.response;
      console.log(err.response);
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
        "https://dangoon.duckdns.org/api/signup/auth",
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
