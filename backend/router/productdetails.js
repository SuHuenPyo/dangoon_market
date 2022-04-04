import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { S3URL, uploadBoard } from "../helper/awsHelper.js";
import { DG_DB } from "../helper/dbHelper.js";


const productDetails = express.Router();

/**
 * @swagger
 * /productdetails:
 *   get:
 *     description: 판매글 상세 글을 조회합니다.. 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "boardId"
 *       in: "query"
 *       description: "상세보기 할 해당 게시글의 B_ID를 입력합니다."
 *     responses:
 *       "200":
 *         description: "sellerId: 판매자고유ID\n imageUrls: 판매전용 이미지\n sellerImg: 판매자프로필 사진\n sellerName: 판매자이름\n price: 판매가격\n title: 판매글 제목\n content: 판매글 내용\n hits: 조회수\n category: 카테고리\n rDate: 글 등록날짜"
 *     
*/
productDetails.get('/', async(req, res, next)=>{
    let {boardId} = req.query

    //FileType - B-판매게시판, C-동굴생활
    let boardType = "B"
    //return value
    let sellerId, sellerImg, sellerName, price, title, content, hits, category, rDate= null;
    let imageUrls = [];

    let dbcon = new DG_DB();
    try{
        await dbcon.DbConnect();

        //board 정보 가져오기 
        
        await dbcon.sendQuery(`UPDATE dangoon.board AS A, (SELECT b_hits FROM dangoon.board WHERE b_id=?) AS B SET A.b_hits = (B.b_hits + 1) WHERE A.b_id=?;`, boardId, boardId);
        let [result] = await dbcon.sendQuery(`SELECT m_id as sellerId, b_title as title, b_content as content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as rDate, b_hits as hits, b_category as category, b_price as price From dangoon.board WHERE b_id=?`, boardId);

        sellerId    = result[0].sellerId;
        title       = result[0].title;
        content     = result[0].content;
        rDate       = result[0].rDate;
        hits        = result[0].hits;
        category    = result[0].category;
        price       = result[0].price;

        //sellerId기반으로 프로필 사진 가져오기 
        [result] = await dbcon.sendQuery(`SELECT m_name as sellerName, m_pic as sellerImg FROM dangoon.member WHERE m_id=?`, sellerId);
        sellerImg   = S3URL+result[0].sellerId;
        sellerName  = result[0].sellerName;

        
        console.log(boardId);
        //판매상품 이미지들 가져오기 
        [result] = await dbcon.sendQuery(`SELECT f_file as imageUrls from dangoon.file WHERE (B_ID=? and f_type=?)`, boardId, boardType);
        
        let index = 0;
        for(let idx in result){ 
            imageUrls.push(S3URL+result[idx].imageUrls);
        }
        


        
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json({sellerId: sellerId, imageUrls: imageUrls, sellerImg: sellerImg, sellerName: sellerName, price: price, title: title, content: content, hits: hits, category: category, rDate: rDate});

});

export default productDetails;