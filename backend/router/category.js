import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { DG_DB } from "../helper/dbHelper.js";

const Category = express.Router();

/**
 * @swagger
 * /category:
 *   get:
 *     description: 카테고리별 게시글 조회
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "category"
 *       in: "query"
 *       description: "[gajun, life, sports, book, beauty, acc, cloth, plant, etc]"
 *       type: "string"
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
Category.get('/', async(req, res, next) => {
    
    //현재 페이지 번호 받기 (default 1)
    let page = req.query.page || 1;
            
    //페이지당 요청 글 개수 (default 10)
    let rows = req.query.rows || 10;
    let pagenationResult = null;

    //카테고리 
    let category = req.query.category || "etc";
    let categoryList = ["gajun", "life", "sports", "book", "beauty", "acc", "cloth", "plant", "etc"];

    let successFlag = 0;
    for (let value of categoryList){
        if(value == category){
            successFlag = 1;
            break;
        }
    }
    if(successFlag == 0){
        return res.status(404).json({text: '요청받은 리소스를 받을 수 없습니다.'});
    }

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();


        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S' and B_CATEGORY=?`, category);
        //console.log(result);

        const totalCount = result[0].cnt;
        pagenationResult = pagenation(totalCount, page, rows);

        //console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        
        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE (b_type='S' AND b_category=?)LIMIT ?,?`, category, pagenationResult.offset, pagenationResult.listCount);

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
export default Category;

