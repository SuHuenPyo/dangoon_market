import { useEffect } from "react";
import { useLocation } from "react-router-dom";



/**
 * @description 페이지 이동시, 상단으로 오게하는 기능
 * @returns null
 */

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // window.scrollTo(0, 0);
    document.querySelector('main').scrollIntoView({
      block: 'start',
      behavior: 'auto'
    });
  }, [pathname]);
  
  return null;
}
