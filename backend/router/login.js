import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { DG_DB } from "../helper/dbHelper.js";
import IM from "../common/IM.js";


const Login = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     description: 로그인을 위한 폼을 전송합니다..
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

    console.log(req.session);

    console.log(user_id, user_pw, new Date());

    //DB 객체 생성 
    let dbcon = new DG_DB();
    try{
        await dbcon.DbConnect();

        if(req.session.user){
            return res.status(402).json({text: '이미 로그인 되어있습니다.'});
        }


        //존재유무 체크
        let [result] = await dbcon.sendQuery(`SELECT * FROM dangoon.member WHERE (M_USER_ID=? AND M_PW=?)`, user_id, user_pw);
        
        if(result[0] != undefined){
            req.session.user = {
                id: req.body.user_id, 
                name : 'dg-cookie',
                authorized: true
            }

        }
        
        if(result[0] == undefined){
            return res.status(400).json({text: '아이디와 패스워드를 다시 확인하세요'});
        }
        
        

        // req.session.user_id = result[0].M_USER_ID;
        // req.session.save((err)=> {
        //     if(err) throw(err);
        //     res.status(200).json({text: 'login OK!!!'});
        //     //res.setHeader('Access-Control-Allow-Credentials', 'true');
        // })

        

    }catch(e){
        return next(e);
    }finally{
        await dbcon.end();
    }

    return res.status(200).json({text: '로그인 성공입니다.'});
    
   
});

// app.get('/login', function(req,rsp){    
//     var post = req.body;
//     db.query('select member.id as id, password, author_id, name from member left join author on member.author_id = author.id where member.id=? and password=?',
//     [post.id,post.password], function(err,result){
//         if(err) throw err;
//         if(result[0]!==undefined){
//             req.session.uid = result[0].id;                            (1)
//             req.session.author_id = result[0].author_id;
//             req.session.isLogined = true;
//             //세션 스토어가 이루어진 후 redirect를 해야함.
//             req.session.save(function(){                               (2)
//                 rsp.redirect('/');
//             });
//         }
//     });
// }

export default Login