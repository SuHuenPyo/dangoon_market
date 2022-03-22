import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from 'aws-sdk';
import ImportManager from "../common/IM.js";
import { uploadSignUp } from "../helper/awsHelper.js";

//validation
import { validator } from "../middleware/validator.js";
import { body, param, query, validationResult } from "express-validator";
import { DG_DB } from "../helper/dbHelper.js";

const signUp = express.Router();

let dbcon = null;
let json = null;
/**
 * @swagger
 * /signup:
 *   post:
 *     description: 회원가입을 위한 폼을 전송합니다.
 *     tags: [Post (Not Work) 테스트x]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "회원가입을 위한 내용을 전송"
 *     content:
 *      multipart/form-data:
 *       schema:
 *         type: object
 *         required:
 *              - Info
 *         properties:
 *              userId:
 *                  type: string
 *              userName:
 *                  type: string
 *              userPassword:
 *                  type: string
 *              userEmail:
 *                  type: string
 *              profile:
 *                  type: Img
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
signUp.post('/',/*
[
    body('userEmail').custom(async(value, {req})=>{

        console.log("정제된값 " + req.body.userEmail)
        let dbcon = new DG_DB();
        try{
            
            await dbcon.DbConnect();
            let [result] = await dbcon.sendQuery(`select EXISTS(select m_email from dangoon.member where M_EMAIL=? limit 1) as success;`, req.body.userEmail);
            console.log("result  = " + result[0].success);
            if(result[0].success)  {
                console.log("ffffff")
                throw new Error('already exists!!');

            } //throw new Error('이미 존재하는 Email입니다.');
        }catch(e){ throw new Error("DB 연동, 사용중 에러");
            return res.status(400).json({text: 'Bad Request ! , 그것은 나쁩니다.'});
        }
        finally{
            dbcon.end();
        }
        return true;

    }),
        
    
    body('userId').exists().custom(value => {
        const regexId = /^[a-z]+[a-z0-9]{5,19}$/g;
    }),
    body('userPassword').exists().isLength({min: 8, max: 30}).custom(value=>{
        const regexPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{7,29}$/;
    })
],*/
uploadSignUp.single('profile'),
 async(req, res, next) =>{
    let {userName, userPassword, userEmail, userId, kakaoId} = req.body;
    let {file} = req;
    
    let dbcon = new DG_DB();
    //return res.status(400).json({text: '임시 에러'});
    try{
        await dbcon.DbConnect();

        
        //먼저있는지 체크

        let [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.member WHERE (M_EMAIL=? OR M_KAKAO_ID=? OR M_USER_ID=?)`, userEmail, kakaoId, userId);
        
        if(result[0].cnt >= 1){
            return res.status(400).json({text: '이미 존재하는 정보입니다. 다시확인해주세요.'});
        }


        [result] = await dbcon.sendQuery(`INSERT INTO dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_PIC, M_KAKAO_ID) VALUES(?, ?, ?, ?, ?, ?)`, userId, userName, userPassword, userEmail, file.key, kakaoId);

        console.log(result);

    }catch(e){
        return next(e);
    }finally{
        await dbcon.end();
    }

    return res.status(200).json({text: '회원가입이 완료 되었습니다.'});
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
    //query('auth_code').exists().isLength({min: 6, max: 6}),
    //query('user_email').exists().isEmail(),
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
