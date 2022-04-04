import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { DG_DB } from "../helper/dbHelper.js";
import IM from "../common/IM.js";


const Logout = express.Router();

  /**
     * @swagger
     * /logout:
     *   get:
     *     description: 로그아웃을 합니다.
     *     tags: [Get (Working)]
     *     produces:
     *     - "application/json"
     *     parameters:
     *     responses:
     *       "200":
     *         description: "successful operation"
     *     
    */
Logout.get('/', async(req, res, next)=>{
    
    if(req.session.user){
        console.log('로그아웃');
        
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('세션 삭제하고 로그아웃됨');
            return res.status(200).json({text: '성공적으로 로그아웃됨'});
        });
    }
    else{
        console.log('로그인 상태 아님');
        return res.status(400).json({text: '로그인 상태가 아닙니다.'});
    }
   
});
export default Logout