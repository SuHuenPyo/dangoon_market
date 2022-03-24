import React from "react";
import style from "../asset/css/writebutton.module.css"
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi"

const WriteButton = (props) => {
  return (
    <button className={style.writesalebtn}>
        <Link to={props.path} className={style.link}>
            <FiEdit className={style.icon} />
        </Link>
        </button>
  );
};

export default WriteButton;
