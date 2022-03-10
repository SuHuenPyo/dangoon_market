import React from "react";
import style from "../css/writebutton.module.css"
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi"

const WriteButton = () => {
  return (
    <Link to="/home">
        <button className={style.writesalebtn}>
            <FiEdit className={style.far} />
        </button>
    </Link>
  );
};

export default WriteButton;
