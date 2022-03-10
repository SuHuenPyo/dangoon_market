import React from "react";
import { NavLink } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import Menu from './Menu';

//css
import styles from '../css/HeaderTitle.module.css';


const HeaderTitle = (props) => {
  const menu = React.useRef();

  const [menuLeft, setMenuLeft] = React.useState("-100%");
 
  const isMenuLeft = React.useCallback(()=>{
       return setMenuLeft(menuLeft === '-100%' ? '0px' : '-100%');
  },[menuLeft]);

  return (
    <>
    <header show={ menuLeft === '-100%' ? false : true }className={styles.header}>
     <RiMenuLine id="menu-btn" className={styles.headIcon} onClick={isMenuLeft}/>
     <NavLink to='/home' className={styles.link}>
       <h1 className={styles.headTitle}>{props.title}</h1>     
    </NavLink> 
    </header>

    <Menu ref={menu} left={menuLeft} onClick={isMenuLeft}/>
    </>
  );
};

export default HeaderTitle;
