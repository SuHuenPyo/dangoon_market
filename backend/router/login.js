import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { DG_DB } from "../helper/dbHelper.js";

const Login = express.Router();

/**
 * @swagger
 * /home:
 *   post:
 *     description: 로그인을 위한 폼을 전송합니다..
 *     tags: [Post (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "로그인을 위한 폼 전송"
 *     content:
 *      multipart/form-data:
 *       schema:
 *         type: object
 *         required:
 *              - Info
 *         properties:
 *              user_id:
 *                  type: string
 *              user_pw:
 *                  type: string
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Login.post('/', async(req, res, next)=>{
    
    let {user_id, user_pw} = req.body;

    let dbcon = new DG_DB();
    //return res.status(400).json({text: '임시 에러'});

    console.log(user_id, user_pw);

    try{
        await dbcon.DbConnect();

        //존재유무 체크
        let [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.member WHERE (M_USER_ID=? AND M_PW=?)`, user_id, user_pw);
        
        if(result[0].cnt < 1){
            return res.status(400).json({text: '아이디와 패스워드를 다시 확인하세요'});
        }

    }catch(e){
        return next(e);
    }finally{
        await dbcon.end();
    }

    return res.status(200).json({text: '로그인 성공입니다.'});
    
   
});

export default Login