import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { uploadBoard } from "../helper/awsHelper.js";
import { DG_DB } from "../helper/dbHelper.js";
import { authIsOwner } from "../middleware/session.js";

const Like = express.Router();


let dbcon = null;
let json = null;

/**
 * @swagger
 * /like:
 *   get:
 *     description: 단군마켓 글의 좋아요 상태를 수정합니다. 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "page"
 *       in: "query"
 *       description: "미정"
 *       type: "number"
 *     - name: "rows"
 *       in: "query"
 *       description: "미정"
 *       type: "number"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Like.get('/', authIsOwner, async(req, res, next)=>{

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();


        //좋아요
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S'`);
        //console.log(result);

        const totalCount = result[0].cnt;
        pagenationResult = pagenation(totalCount, page, rows);

        //console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        
        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE b_type='S' LIMIT ?,?`, pagenationResult.offset, pagenationResult.listCount);

        //console.log(result2);
        let regexp = /\B(?=(\d{3})+(?!\d))/g;
        //console.log(result)

        result.forEach(element => {
            element.b_price = element.b_price.toString().replace(regexp, ',');
        });
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': result, 'pageEnd': pagenationResult.totalPage});
});
export default Like;