import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { uploadBoard } from "../helper/awsHelper.js";


const productDetails = express.Router();

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
productDetails.post('/', uploadBoard.array('board', 10) ,async(req, res, next)=>{

    
});

export default productDetails;