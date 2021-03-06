import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../asset/css/HeaderLogo.module.css";
import { RiMenuLine, RiUserLine } from "react-icons/ri";
import Menu from "./Menu";

// logo
import Logo from "../asset/img/logo-color.png";

const HeaderLogo = () => {
  const menu = React.useRef();

const [menuLeft, setMenuLeft] = React.useState("-100%");

const isMenuLeft = React.useCallback(()=>{
      document.querySelector('main').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
      return setMenuLeft(menuLeft === '-100%' ? '0px' : '-100%');
},[menuLeft]);

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.headIcon}
          onClick={isMenuLeft}
        >
          <RiMenuLine className={`${styles.menuIcon}`} />
        </div>
        <NavLink to="/home" className={styles.headLogo}>
          <h1>
            <img src={Logo} alt="단군마켓로고" />
          </h1>
        </NavLink>
        <NavLink to="/mygralic" className={styles.headIcon}>
          <RiUserLine className={styles.userIcon} ait="나의 마늘" />
        </NavLink>
      </header>
      <Menu
        ref={menu}
        left={menuLeft}
        onClick={isMenuLeft}
      />
    </>
  );
};

export default HeaderLogo;
