import React from 'react';
import { NavLink} from 'react-router-dom';
import { RiGithubLine, RiMailLine } from 'react-icons/ri'
import { AiOutlineNotification } from 'react-icons/ai'

import Logo from '../asset/img/logo-white.png';
import styles from '../asset/css/Menu.module.css';

const Menu = React.forwardRef((props,ref) => {
    
    return (
        <div ref={ref} className={styles.menu} style={{left:props.left, visibility: props.left === '-100%' ? 'hidden' : 'visible'}} onClick={props.onClick}>
        <h2 className={styles.menuLogo}>
            <img src={Logo} alt="단군마켓로고"/>
        </h2>
        
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
              <NavLink to='/home'>홈</NavLink>
            </li>
          <li className={styles.menuItem}>
              <NavLink to='/cavelife'>동굴생활</NavLink>
            </li>
          <li className={styles.menuItem}>
              <NavLink to='/categori'>상품별 카테고리</NavLink>
            </li>
          <li className={styles.menuItem}>
              <NavLink to='/mygralic'>나의 마늘</NavLink>
            </li>
        </ul>

        <ul className={styles.menuContact}>
            <li className={styles.menuContactItem}>
                <NavLink to='/notice' className={styles.notice}>
                    <AiOutlineNotification/>
                </NavLink>
            </li>
            <li className={styles.menuContactItem}>
                <a href='https://github.com/SuHuenPyo/dangoon_market' className={styles.github}>
                    <RiGithubLine/>
                </a>
            </li>
            <li className={styles.menuContactItem}>
                <a href='mailto:dg.market.blackbear@gmail.com' className={styles.email}>
                    <RiMailLine/>
                </a>
            </li>
        </ul>
    </div>
    )
})

export default React.memo(Menu);