import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";

const saleHistory = express.Router();
/**
 * @swagger
 * /salehistory:
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
saleHistory.get('/', (req,res,next)=>{



    try{
        //대충 DB 연동하고 결과 저장 
    }catch(e){
        return next(err);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
    }
    //저장한 값 여기서 전송해주고 
    res.send("salehistory입니다.");
    return router;
});

export default saleHistory;
