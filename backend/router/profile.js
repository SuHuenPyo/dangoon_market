import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { uploadBoard } from "../helper/awsHelper.js";
import { DG_DB } from "../helper/dbHelper.js";
import { authIsOwner } from "../middleware/session.js";

const Profile = express.Router();


let dbcon = null;
let json = null;

/**
 * @swagger
 * /profile:
 *   get:
 *     description: 단군마켓 유저 프로필을 조회합니다. 판매횟수, 구매횟수, description, 프로필 이미지가 리턴됩니다. , 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "b_id"
 *       in: "query"
 *       description: ""
 *       type: "number"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Profile.get('/', authIsOwner, async(req, res, next)=>{


    /**
     * 필요사항 
     * B_ID : 
     */
    let b_id = req.query.b_id;
    let m_id = null;

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();


        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT DISTINCT m_id FROM dangoon.board WHERE b_id=?`, b_id);
        m_id = result[0].m_id;

        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE b_type='S' LIMIT ?,?`, pagenationResult.offset, pagenationResult.listCount);

        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    res.send({'item': result, 'pageEnd': pagenationResult.totalPage});
});

export default Profile;


