/**
 * 공통 Import 모듈 관리자. 
 * @author : "shun"
 * 
 */
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { compareMinutes } from "../helper/TimeHelper.js";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//환경변수를 불러오기 위한 함수
dotenv.config()

const ImportManager = {

    //뽑아쓸 모듈
    "mysql"             : mysql,
    "express"           : express,
    "router"            : express.Router(),
    "path"              : path,
    "__filename"        : __filename,
    "__dirname"         : __dirname,
    "crypto"            : crypto,
    
    //helper
    "compareMinutes"    : compareMinutes,
    //환경변수
    privateInfo : {

        //DB CONFIG
        "DB_HOST"       : process.env.DB_HOST,
        "DB_PORT"       : process.env.DB_PORT,
        "DB_USER"       : process.env.DB_USER,
        "DB_PASSWORD"   : process.env.DB_PASSWORD,
        "DB_DATABASE"   : process.env.DB_DATABASE,

        //Email Config
        "MAIL_ID"       : process.env.NODEMAILER_USER,
        "MAIL_PASSWORD" : process.env.NODEMAILER_PASS,


        //S3 access config
        AWS_CONFIG : {
            "secretAccessKey"   : process.env.AWS_S3_ACCESS_KEY_ID,
            "accessKeyId"       : process.env.AWS_S3_ACCESS_SECRET_KEY,
            "region"            : process.env.AWS_S3_REGION,
            "bucket"            : process.env.AWS_S3_BUCKET,
        },
        

    }
    

}


export default ImportManager;