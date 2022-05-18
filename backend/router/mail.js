import * as nodemailer from 'nodemailer';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import ImportManager from '../common/IM.js';
import { DG_DB } from '../helper/dbHelper.js';
import { body } from 'express-validator';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({path: path.join(__dirname, '/.env')});

const Mail = express.Router();

/**
 * @swagger
 * /mail:
 *   post:
 *     description: 인증용 메일 발송. 재전송시 받았던 메일은 무효처리 됩니다.
 *     tags: [Post (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "x-www-form-urlencoded"
 *       schema:
 *          type: object
 *          properties:
 *              user_email:
 *                  type: string
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Mail.post('/', async(req,res,next) =>{
    req.connection.setTimeout(100000);
    
    let {user_email} = req.body;
    let data = null;

    //console.log(req);

    let authCode = randomHelper.getRandomChar(6);
    let dbcon = new DG_DB();

    //console.log(authCode);


    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: _config.mailer_config.user,
            pass: _config.mailer_config.password
        }
    });

    var mailOptions = {
        from: '단군마켓',
        to: user_email,
        subject: '[단군마켓 인증번호]',
        html: '<h1>단군마켓 인증번호입니다. </h1> <h1>타인에게 절대 알리면 안됩니다.</h1>  <h1>'+authCode+'</h1>' 
    };
    try{
        console.log("0");
        await dbcon.DbConnect();
        console.log("1");
        let [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.auth WHERE auth_email=?`, user_email);
        if(result[0].cnt > 0){
            await dbcon.sendQuery(`DELETE FROM dangoon.auth WHERE auth_email=?`, user_email);
        }
        
        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Email을 보냈습니다. 인증번호 : " + authCode);
            }
        });

        await dbcon.sendQuery(`INSERT INTO dangoon.auth(auth_email, auth_pass) VALUES(?, ?)`, user_email, authCode);
    }catch(e){
        return next(e);
    }finally{
        //transporter 제거 
        transporter.close();
        await dbcon.end();
        
    }

    //저장한 값 여기서 전송해주고 
    return res.status(200).json({text: 'success send message'});

});

export default Mail;




