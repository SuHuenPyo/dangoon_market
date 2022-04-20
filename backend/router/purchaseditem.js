import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { authIsOwner } from "../middleware/session.js";
import { DG_DB } from "../helper/dbHelper.js";

const requestPurchase = express.Router();


/**
 * @swagger
 * /requestpurchase/sellhistory:
 *   get:
 *     description: 단군마켓 거래글 요청상태를 조회합니다.
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
requestPurchase.get('/sellhistory', authIsOwner, async(req, res, next)=>{


    /**필요정보
     * m_id = 세션에서 뽑아옴 
     */
    
    let user_id = req.session.user.id; //세션상 user id(NickName)
    let user_m_id = null; //DB m_id

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        //해당 m_id에 해당하는 포스팅 글을 가져온다. 이때 board type은 "S"(판매게시판)이고 B_EXPIRED가 false인 것만 가져온다.

        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE b_type='S' LIMIT ?,?`, pagenationResult.offset, pagenationResult.listCount);

        //가져온 list(판매글)을 기준으로 반복문을 돌며 거래요청이 있는지 가져온다. 

        //(프론트 쪽) 가져온 list들중 거래요청을 수락한게 있다면 다른 요청은 버튼이 비활성화 된다. 

        // (backend 쪽 ) 비활성화 인데도 만약 backend에 거래수락 요청이 온다면 리스트들 중에 거래중인게 있는지 확인후 수락해준다. 

        
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': result, 'pageEnd': pagenationResult.totalPage});
});
/**
 * @swagger
 * /requestpurchase:
 *   post:
 *     description: 거래요청을 보냅니다. 
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
 *              b_id:
 *                  type: number
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *       "400":
 *         description: "이미 신청된 요청"
 *     
*/
requestPurchase.post('/', authIsOwner, async(req,res,next) =>{

    /**
     * 필요정보 
     * b_id
     * user_m_id = 세션에서 가져올것임
     * 
     */
    let user_id = req.session.user.id; //세션상 user id(NickName)
    let user_m_id = null; //DB m_id
    let {b_id} = req.body;

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        console.log(user_m_id);
        //m_id와 b_id를 insert한다. request_purchased 테이블에 . 존재하지 않을떄만 삽입한다. (Not Exists)
        [result] = await dbcon.sendQuery(`INSERT INTO dangoon.request_purchased(b_id, m_id) SELECT ?, ? FROM DUAL WHERE NOT EXISTS(SELECT * FROM dangoon.request_purchased WHERE b_id=? AND m_id=?) LIMIT 1 `, b_id, user_m_id, b_id, user_m_id)

        console.log(result)

    }catch(e){
        return next(e);
        
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json({text: 'success send message'});
});
export default requestPurchase