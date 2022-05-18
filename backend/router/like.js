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
 *     - name: "b_id"
 *       in: "query"
 *       description: "해당 기능을 적용할 b_id를 입력하세요"
 *       type: "number"
 *     - name: "l_type"
 *       in: "query"
 *       description: " C, S 둘중하나 C = 동굴생활, S = 판매게시판"
 *       type: "string"
 *     - name: "l_flag"
 *       in: "query"
 *       description: "true = 좋아요 체크,    false = 좋아요 체크 해제"
 *       type: "boolean"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *       "400":
 *         description: "query 값 검증에 실패했음."
 *       "418":
 *         description: "이미 해당 기능을 완료함 (ex > 이미 좋아요가 되어있음, 이미 해제되어있음)"
 *     
*/
Like.get('/', authIsOwner, async(req, res, next)=>{

    /**
     * 필요항목 
     * 좋아요 클릭할 게시물 B_ID
     * 좋아요 체크인지, 해제인지 Flag값 
     */

    //필요항목 
    let user_id = req.session.user.id; //세션상 user id(NickName)
    let user_m_id = null; //DB m_id
    let b_id = req.query.b_id;
    let l_type = req.query.l_type;
    let l_flag = req.query.l_flag;
    //검증
    if(b_id == undefined){
        return res.status(400).json({text: '검증실패'});
    }

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();

        //해당 기능을 수행할 해당유저의 M_id 가져오기
        //좋아요
        [result] = await dbcon.sendQuery(`SELECT M_ID FROM dangoon.MEMBER WHERE M_USER_ID=?`, user_id);
        user_m_id = result[0].m_id;


        /**
         * 1. 테이블이 존재하고 1일때 플래그를 1을 요청할 경우 => 패스          /
         * 2. 테이블이 존재하고 1일때 플래그를 0을 요청할 경우 => 쿼리실행      /
         * 3. 테이블이 존재하고 0일때 플래그를 1을 요청할 경우 => 쿼리실행  
         * 4. 테이블이 존재하고 0일때 플래그를 0을 요청할 경우 => 패스          /
         * 5. 테이블이 존재하지 않고 플래그 1을 요청할 경우 => 쿼리실행(생성)   
         * 6. 테이블이 존재하지 않고 플래그 0을 요청할 경우 => 패스             /
         */


        //조회해서 있다면 Update, 없다면 Insert .   단, 좋아요가 되어있는지 안되어있는지는 확인하지 않는다. 중요하지 않기때문  
        [result] = await dbcon.sendQuery(`SELECT L_FLAG FROM dangoon.LIKE WHERE (M_ID=? AND B_ID=? AND L_TYPE=?)`, user_m_id, b_id, l_type);


        //이미 테이블이 존재하고 1일때
        if(result[0] && result[0].l_flag == 1){
            //플래그 0 요청할 경우
            if(l_flag == 0){
                await dbcon.sendQuery(`UPDATE dangoon.LIKE SET L_FLAG = 0 WHERE (M_ID=? AND B_ID=? AND L_TYPE=?)`,user_m_id, b_id, l_type);
            }
            //플래그 1요청할 경우 무시 

        }else if(result[0] && result[0].l_flag == 0){
            if(l_flag == 1){
                await dbcon.sendQuery(`UPDATE dangoon.LIKE SET L_FLAG = 1 WHERE (M_ID=? AND B_ID=? AND L_TYPE=?)`,user_m_id, b_id, l_type);
            }

        }else if(!result[0]){//여기는 테이블이 존재하지 않음 
            
            // if(l_flag == 1){
            //     await dbcon.sendQuery(`INSERT INTO dangoon.like(m_id, b_id, l_flag, l_type) VALUES(?, ?, ?, ?)`,user_m_id, b_id, l_flag ,l_type);
            // }
            console.log(l_flag);
            if(l_flag == 'true'){
                console.log("만들어진다");
                 await dbcon.sendQuery(`INSERT INTO dangoon.LIKE(M_ID, B_ID, L_TYPE) VALUES(?, ?, ?)`,user_m_id, b_id ,l_type);
            }
        }

    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json({text: '정상처리 완료'});
});
export default Like;