import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from 'aws-sdk';
import ImportManager from "../common/IM.js";
import { uploadProfile } from "../helper/awsHelper.js";

//validation
import { validator } from "../middleware/validator.js";
import { param, query, validationResult } from "express-validator";
import { DG_DB } from "../helper/dbHelper.js";

const signUp = express.Router();

let dbcon = null;
let json = null;
/**
 * @swagger
 * /signup:
 *   get:
 *     description: 게시글 조회
 *     tags: [Post (Not Work)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "category"
 *       in: "query"
 *       description: "조회할 카테고리 id, 중첩 가능. ex) category=1&category=2&category=3"
 *       type: "string"
 *     - name: "query"
 *       in: "query"
 *       description: "검색어"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
signUp.post('/', uploadProfile.single('profile'), function (req, res, next) {
    
    res.send("Uploaded!");
});

/**
 * @swagger
 * /signup/auth:
 *   get:
 *     description: 이메일로 발송된 인증번호를 인증합니다. 이메일 인증은 발송기준 10분간 유효합니다.
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "auth_code"
 *       in: "query"
 *       description: "인증번호"
 *       type: "string"
 *     - name: "user_email"
 *       in: "query"
 *       description: "인증을 진행하는 email"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
signUp.get('/auth', [
    query('auth_code').exists().isLength({min: 6, max: 6}),
    query('user_email').exists().isEmail(),
    validator.errorResultCallback.errorResult
], async(req, res, next)=> {

    let auth_code = req.query.auth_code;
    let user_email = req.query.user_email

    let dbcon = new DG_DB();

    try{
        await dbcon.DbConnect();

        //먼저있는지 체크
        let [result] = await dbcon.sendQuery(`SELECT * FROM dangoon.auth where AUTH_EMAIL=?`, user_email);
        if (result[0].AUTH_PASS === auth_code){
            [result] = await dbcon.sendQuery(`SELECT date_format(auth_rdate, '%Y-%m-%d %H:%i:%s')as date FROM dangoon.auth where AUTH_EMAIL=?`, user_email);
            if(dbcon.checkElapsedTime(result[0].date) > -10){
                console.log(dbcon.checkElapsedTime(result[0].date));
                await dbcon.sendQuery(`UPDATE dangoon.auth SET auth_done=? WHERE AUTH_EMAIL=?`, true, user_email);
                return res.status(200).json({text: 'Auth OK!'});
            }
            
        }

        return res.status(400).json({text: 'Failed Auth, 그게 정말 맞을까요'});

    }catch(e){
        return next(e);
    }finally{
        await dbcon.end();
    }


});

signUp.post('/delete', async(req, res, next) => {
    
    await s3.deleteObject({
        Bucket : 'dg-market-bucket',
        Key: 'profile/1647326530263.PNG',
    }, (err, data)=>{
        if (err)console.error(err);
        console.log("S3 deleted Object : " , data); 
    });

    res.send("deleted ! ");
});


export default signUp;
