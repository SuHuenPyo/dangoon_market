import React from "react";
import style from "../asset/css/pagination.module.css";
import { Link } from "react-router-dom";

const Announcementbutton = () => {
  return (
      <div className={style.paginationsection}>
        <Link to='#' >&lt;&lt;</Link>
        <Link to='#' >&lt;</Link>
        <Link to='#' title="Algorithm" className="active">1</Link>
        <Link to='#' title="DataStructure" >2</Link>
        <Link to='#' title="Languages" >3</Link>
        <Link to='#' title="Interview" >4</Link>
        <Link to='#' title="practice" >5</Link>
        <Link to='#' >&gt;</Link>
        <Link to='#' >&gt;&gt;</Link>
      </div>
  );
};

export default Announcementbutton;
