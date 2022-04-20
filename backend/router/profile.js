import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { S3URL, uploadBoard } from "../helper/awsHelper.js";
import { DG_DB } from "../helper/dbHelper.js";
import { authIsOwner } from "../middleware/session.js";

const Profile = express.Router();


/**
 * @swagger
 * /profile:
 *   get:
 *     description: 단군마켓 유저 프로필을 조회합니다. 판매횟수, 구매횟수, description, 프로필 이미지가 리턴됩니다. , 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     responses:
 *       "200":
 *         description: "successful operation"
 *       "403":
 *         description: "접근제한됨"
 *     
*/
Profile.get('/', authIsOwner, async(req, res, next)=>{


    /**
     * 필요정보 
     * b_id
     * user_m_id = 세션에서 가져올것임
     * 
     */
    let user_id = req.session.user.id; //세션상 user id(NickName)
    let user_m_id = null; //DB m_id

    //return result value
    let return_info = {};

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();

        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        console.log(user_m_id);

        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT DISTINCT m_user_id, m_name, m_email, m_pic, m_kakao_id FROM dangoon.member WHERE m_id=?`, user_m_id);
        return_info = {'m_user_id': result[0].m_user_id, 'm_name': result[0].m_name, 'm_email': result[0].m_email, 'm_pic':S3URL+result[0].m_pic, 'm_kakao_id': result[0].m_kakao_id }


        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json(return_info);
});

export default Profile;


