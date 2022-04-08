import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";

const Development = express.Router();


let dbcon = null;
let json = null;

/**
 * @swagger
 * /development/test:
 *   get:
 *     description: 테스트를 위한 유저테이블 정보를 가져옵니다.
 *     tags: [Get (Development)]
*     parameters:
*     - name: "sql"
*       in: "query"
*       description: "질의를 할 query문을 보냅니다."
*     produces:
*     - "application/json"
*     responses:
*       "200":
*         description: "successful operation"
*     
*/
Development.get('/test', async(req, res, next)=>{
    
    try{
        //DB Connection
        dbcon = await mysql.createConnection(_config.database_config);
        await dbcon.connect();

        //데이터 조회 
        let sql = req.query.sql;

        const [result2] = await dbcon.query(sql);
        console.log(result2);
        json = result2;
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': json});
});



export default Development;


