import * as nodemailer from 'nodemailer';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({path: path.join(__dirname, '/.env')});

const Mail = express.Router();

    
/**
 * @swagger
 * /mail:
 *   post:
 *     description: 인증용 메일 발송
 *     tags: [Post (Not Work)]
 *     produces:
 *     - "application/json"
 *     body:
 *     - name: "user_email"
 *       in: "query"
 *       description: "인증번호를 받을 email을 입력합니다."
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Mail.post('/', async(req,res,next) =>{
    



    // const DATABASE_CONFIG = {
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE,
    // }
    // let dbcon = null;

          



    // console.log(process.env.DB_DATABASE);
    // next();

    // const validCheck = user_email.indexOf('@');
    // if(!user_email || user_email.length ===0 || validCheck === -1){
    //     return next(res.status(400).json({message: '이메일 형식이 틀렸습니다.'}))
    // }

    // //database connect 
    // //날라온 이메일이 존재하는지 확인해야한다.
    // try {
    //     dbcon = await mysql2.createConnection(config.database_config);
    //     await dbcon.connect();

    //     let sql = "SELECT M_EMAIL from MEMBER where M_EMAIL = ?";
    //     const [result] = await dbcon.query(sql, user_email);
    //     data = result;
        
    // } catch (error) {
    //     console.log(error);
    // }finally{
    //     dbcon.end();
    // }

    // if(data.length > 0){
    //     return next(res.status(400).json({message: '이미 가입된 이메일입니다.'}))
    // }
    
    //난수를 생성하고 email로 전송한다. 

    const {user_email} = req.body;
    let data = null;

    console.log(req);

    let authCode = randomHelper.getRandomChar(6);
    console.log(authCode);


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

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Email을 보냈습니다. 인증번호 : " + authCode);
            }
        });


    }catch(e){
        return next(e);
    }finally{
        //transporter 제거 
        transporter.close()
        res.send(authCode);
    }
    //저장한 값 여기서 전송해주고 

});

export default Mail;




