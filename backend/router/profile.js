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
 *     description: 단군마켓 유저 프로필을 조회합니다. 유저이름, sellbuyCnt(판매,구매횟수 순서대로), description, 프로필 이미지가 리턴됩니다. (b_id에 해당하는 글쓴이 정보), 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "b_id"
 *       in: "query"
 *       description: "해당 b_id"
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
    let b_id = req.query.b_id

    //return result value
    let return_info = {};

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();

        //해당 b_id의 소유자를 가져온다. 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.BOARD WHERE B_ID=?`, b_id);
        console.log(b_id)
        user_m_id = result[0].m_id;

        //소유자의 이름과, 사진을 가져온다. 
        [result] = await dbcon.sendQuery(`SELECT DISTINCT m_user_id, m_name, m_email, m_pic, m_kakao_id FROM dangoon.MEMBER WHERE M_ID=?`, user_m_id);
        return_info.m_name = JSON.parse(JSON.stringify(result[0].m_name));
        return_info.m_pic  = JSON.parse(JSON.stringify(S3URL+result[0].m_pic));

        //소유자의 판매내역(판매중인것, 판매완료한것), 구매내역(완료된 것만) 을 가져온다.
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) AS cnt FROM dangoon.BOARD as db WHERE (m_id=? AND b_type='S') UNION SELECT COUNT(*) FROM dangoon.REQUEST_PURCHASED WHERE (m_id=? AND r_done=1)`, user_m_id, user_m_id);        

        return_info.sellBuyCnt = [];
        for(let idx in result){
            return_info.sellBuyCnt.push(JSON.parse(JSON.stringify(result[idx].cnt)));
        }
        
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json(return_info);
});

/**
 * @swagger
 * /profile/myprofile:
 *   get:
 *     description: 단군마켓 자신의 프로필을 조회합니다.유저아이디 유저이름 이메일 프로필이미지 카카오id가 출력됩니다. , 
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
Profile.get('/myprofile', authIsOwner, async(req, res, next)=>{


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
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.MEMBER WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        console.log(user_m_id);

        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT DISTINCT m_user_id, m_name, m_email, m_pic, m_kakao_id FROM dangoon.MEMBER WHERE m_id=?`, user_m_id);
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


