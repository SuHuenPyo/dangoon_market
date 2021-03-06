import styles from "../asset/scss/SignupForm.module.scss";

class RegexHelper {
  value(selector, msg) {
    const field = document.getElementById(selector);
    const value = field.value.trim();

    if (!value) {
      return this.throwErr(field, msg);
    }
    return true;
  }

  image(selector, msg, errSelector) {
    const field = document.getElementById(selector);
    const errField = document.getElementById(errSelector);
    let check = false;

    if(field.files[0]){
      check = true;
    }

    if (!check) {
      return this.throwErr(errField, msg);
    }
    return true;
  }

  selected(selector, msg) {
    const field = document.getElementById(selector);
    const value = field.value.trim();

    console.log(value);

    if (!value || value === 'none') {
      return this.throwErr(field, msg);
    }

    return true;
  }

  maxLen(selector, num, msg) {
    const field = document.getElementById(selector);
    const value = field.value.trim();

    if (value.length > num) {
      return this.throwErr(field, msg);
    }

    return true;
  }

  minLen(selector, num, msg) {
    const field = document.getElementById(selector);
    const value = field.value.trim();

    if (value.length < num) {
      return this.throwErr(field, msg);
    }

    return true;
  }

  compare_to(origin_selector, compare_selector, msg) {
    const origin = document.getElementById(origin_selector);
    const compare = document.getElementById(compare_selector);

    const src = origin.value.trim();
    const dsc = compare.value.trim();

    if (src !== dsc) {
      return this.throwErr(compare,msg);
    }

    return true;
  }

   regTest (selector,msg,regex_expr) {
      const fleid = document.getElementById(selector);
      const value = fleid.value.trim();

      if(!value || !regex_expr.test(value)){
          return this.throwErr(fleid,msg);
      }

      return true;

  }

  engNum(selector,msg){
      return this.regTest(selector,msg,/^[a-z]+[a-z0-9]*$/g);
  }

  engNumSp(selector,msg){
      return this.regTest(selector,msg,/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/);
  }

  email(selector,msg){
      return this.regTest(selector,msg,/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
  }

  throwErr(element, msg) {

    const errMsg = document.createElement("p");
    errMsg.innerText = msg;
    errMsg.className = styles.errMsg;
    element.after(errMsg);

    return false;
  }

  
}

export default RegexHelper;
