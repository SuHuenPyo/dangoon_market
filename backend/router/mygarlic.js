import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";

const myGarlic = express.Router();

/**
 * @swagger
 * /cavelife:
 *   get:
 *     description: 동굴생활 전체 글을 조회합니다.. 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "page"
 *       in: "query"
 *       description: "검색 할 페이지 번호를 설정합니다. default = 1"
 *       type: "number"
 *     - name: "rows"
 *       in: "query"
 *       description: "페이지당 표시 개수를 설정합니다. default = 5"
 *       type: "number"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
myGarlic.get('/', async(req, res, next)=>{
    let dbcon = null;



    //현재 페이지 번호 받기 (default 1)
    const page = req.query.page || 1;
    
    //페이지당 요청 글 개수 (default 10)
    const rows = req.query.rows || 5;
    
    try{
        //DB Connection
        dbcon = await mysql.createConnection(config.database_config);
        await dbcon.connect();

        //전체 데이터 수 조회
        let sql = "SELECT COUNT(*) as cnt FROM dangoon.BOARD WHERE B_TYPE='C'";
        
        const [result1] = await dbcon.query(sql);
        console.log(result1);

        const totalCount = result1[0].cnt;

        pagenation = pagenationHelper.pagenation(totalCount, page, rows);

        console.log(JSON.stringify(pagenation));

        let args = [];

        //데이터 조회 
        sql = "SELECT B_ID, M_ID , B_WRITER, B_TITLE, B_CONTENT, B_IMG, DATE_FORMAT(B_RDATE, '%Y-%m-%d %H:%i:%s')as b_rdate FROM dangoon.BOARD WHERE B_TYPE='C' LIMIT ?,?";

        args.push(pagenation.offset);
        args.push(pagenation.listCount);

        const [result2] = await dbcon.query(sql, args);

        json = result2;

        console.log(result2);
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': json});

    
    return router;
});

export default myGarlic;