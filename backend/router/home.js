import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";

const Home = express.Router();


let dbcon = null;
let json = null;

  /**
     * @swagger
     * /home:
     *   get:
     *     description: 단군마켓 판매글을 조회합니다. 
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
     *       description: "페이지당 표시 개수를 설정합니다. default = 10"
     *       type: "number"
     *     responses:
     *       "200":
     *         description: "successful operation"
     *     
    */
Home.get('/', async(req, res, next)=>{

    console.log("home");
    //현재 페이지 번호 받기 (default 1)
    const page = req.query.page || 1;
        
    //페이지당 요청 글 개수 (default 10)
    const rows = req.query.rows || 10;
    
    try{
        //DB Connection
        dbcon = await mysql.createConnection(_config.database_config);
        await dbcon.connect();

        //전체 데이터 수 조회
        let sql = "SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S'";
        
        const [result1] = await dbcon.query(sql);
        console.log(result1);

        const totalCount = result1[0].cnt;

        let pagenationResult = pagenation(totalCount, page, rows);

        console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        sql = "SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE b_type='S' LIMIT ?,?";


        args.push(pagenationResult.offset);
        args.push(pagenationResult.listCount);

        const [result2] = await dbcon.query(sql, args);

        json = result2;

        //console.log(result2);
        let regexp = /\B(?=(\d{3})+(?!\d))/g;

        result2.forEach(element => {
            element.b_price = element.b_price.toString().replace(regexp, ',');
        });
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': json});
});
/**
 * @swagger
 * /home/write:
 *   post:
 *     description: 거래를 등록 합니다.
 *     tags: [Post (Not Work)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "상품정보가 담긴 스키마"
 *       schema:
 *         type: object
 *         required:
 *              - Info
 *         properties:
 *              userId:
 *                  type: string
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Home.post('/write', async(req, res, next)=>{
});
export default Home;


