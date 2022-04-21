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

    //return value
    let return_value = {}

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        //해당 m_id에 해당하는 포스팅 글을 가져온다. 이때 board type은 "S"(판매게시판)이고 B_EXPIRED가 false인 것만 가져온다.
        [result] = await dbcon.sendQuery(`SELECT b_id FROM dangoon.board WHERE (m_id=? AND b_type='S')`, user_m_id);

        //가져온 list(판매글)을 기준으로 반복문을 돌며 거래요청이 있는지 가져온다.
        return_value = result;
        for(let id in return_value){
            let temp = [];
            [temp] = await dbcon.sendQuery(`SELECT r_id, r_flag, m_name, r_done FROM dangoon.request_purchased as dr, dangoon.member as dm WHERE (dr.b_id=? AND dr.m_id = dm.m_id )`, return_value[id].b_id);            
            return_value[id].request_info = (temp != undefined) ? JSON.parse(JSON.stringify(temp)) : return_value[id].request_info = ''
        }

        console.log(return_value);

        //(프론트 쪽) 가져온 list들중 거래요청을 수락한게 있다면 다른 요청은 버튼이 비활성화 된다. 

        // (backend 쪽 ) 비활성화 인데도 만약 backend에 거래수락 요청이 온다면 리스트들 중에 거래중인게 있는지 확인후 수락해준다. 

        
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json(return_value);
});
/**
 * @swagger
 * /requestpurchase/approve:
 *   get:
 *     description: 단군마켓 거래글 요청상태를 승인합니다.
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "b_id"
 *       in: "query"
 *       description: "수락할 게시물의 b_id"
 *     - name: "r_id"
 *       in: "query"
 *       description: "수락할 request id"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
requestPurchase.get('/approve', authIsOwner, async(req, res, next)=>{


    /**필요정보
     * m_id = 세션에서 뽑아옴 
     * b_id = 게시글 id
     * r_id = 요청 id
     */
    
    if((req.query.b_id == undefined) || (req.query.r_id == undefined)){
        return res.status(400).json("파라미터가 잘못 된거같은데요?");
    }

    let user_id = req.session.user.id; //세션상 user id(NickName)
    let target_b_id = req.query.b_id;
    let target_r_id = req.query.r_id;
    let user_m_id = null; //DB m_id

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        //해당 접속자 세션이 해당 게시글을 쓴 사람이 맞는지 확인 한다. 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE (b_id=? AND m_id=?)`, target_b_id ,user_m_id);

        //수락 query를 날리기 전에 혹여나 이미 수락한 요청이 있는지 확인한다. 단군마켓은 중복 수락을 허용하지 않는다. 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.request_purchased WHERE (b_id=? AND r_flag=1) `, target_b_id);
        if(result[0].cnt > 0){
            return res.status(400).json("이미 거래 요청이 수락된 상태입니다. 다른 거래를 취소하고 수락 해주세요.");
        }

        [result] = await dbcon.sendQuery(`UPDATE dangoon.request_purchased SET r_flag = '1' WHERE (b_id=? AND r_id=?)`, target_b_id ,target_r_id);
        
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json("거래요청이 수락됨");
});

/**
 * @swagger
 * /requestpurchase/cancel:
 *   delete:
 *     description: 단군마켓 거래글 요청상태를 취소합니다. (해당 요청 삭제처리 됨)
 *     tags: [Delete (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "b_id"
 *       in: "query"
 *       description: "취소처리 게시물의 b_id"
 *     - name: "r_id"
 *       in: "query"
 *       description: "취소처리 request id"
 *     responses:
 *       "200":
 *         description: "취소요청 정상처리 됨"
 *     
*/
requestPurchase.delete('/cancel', authIsOwner, async(req, res, next)=>{


    /**필요정보
     * m_id = 세션에서 뽑아옴 
     * b_id = 게시글 id
     * r_id = 요청 id
     */
    
    if((req.query.b_id == undefined) || (req.query.r_id == undefined)){
        return res.status(400).json("파라미터가 잘못 된거같은데요?");
    }

    let user_id = req.session.user.id; //세션상 user id(NickName)
    let target_b_id = req.query.b_id;
    let target_r_id = req.query.r_id;
    let user_m_id = null; //DB m_id

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        //해당 접속자 세션이 해당 게시글을 쓴 사람이 맞는지 확인 한다. 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE (b_id=? AND m_id=?)`, target_b_id ,user_m_id);

        //취소 쿼리를 날리기 전에 수락한 거래가 있는지 확인한다. 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.request_purchased WHERE (r_id=? AND r_flag=1 AND b_id=?) `,target_r_id,target_b_id );
        if(result[0].cnt < 1){
            return res.status(400).json("취소 할 거래가 확인되지 않습니다.");
        }
        //삭제 쿼리 
        [result] = await dbcon.sendQuery(`DELETE FROM dangoon.request_purchased WHERE r_id=?`, target_r_id);
        
        //삭제가 정상 처리 되었는지 한번더 확인한다.
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.request_purchased WHERE (r_id=? AND r_flag=1 AND b_id=?) `,target_r_id,target_b_id );
        if(result[0].cnt > 0){
            return res.status(400).json("거래 취소에 실패 했습니다.");
        }

    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    //클라이언트 요청 정상수행 (응답에 대한 메시지 미포함, 보통 삭제요청에 사용 )
    return res.status(200).json("거래취소에 성공했습니다.");
});


/**
 * @swagger
 * /requestpurchase/complete:
 *   put:
 *     description: 단군마켓 거래글을 거래완료 처리합니다. (거래요청을 받고 거래요청을 수락한 상태여야만 합니다.)
 *     tags: [Put (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "b_id"
 *       in: "body"
 *       description: "x-www-form-urlencoded"
 *       schema:
 *          type: object
 *          properties:
 *              b_id:
 *                  type: number
 *     
*/
requestPurchase.put('/complete', authIsOwner, async(req, res, next)=>{


    /**필요정보
     * m_id = 세션에서 뽑아옴 
     * b_id = 게시글 id
     */
     let {b_id} = req.body;
    if(b_id == undefined){
        return res.status(400).json("파라미터가 잘못 된거같은데요?");
    }

    let user_id = req.session.user.id; //세션상 user id(NickName)
    let target_b_id = b_id;
    let target_r_id = null // 검색해서 가져올 r_id (해당 레코드는 거래요청수락 상태여야 한다.)
    let user_m_id = null; //DB m_id

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();
        //해당 접속자 세션정보로 m_id를 가져온다 
        [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        user_m_id = result[0].m_id;

        //해당 접속자 세션이 해당 게시글을 쓴 사람이 맞는지 확인 한다.  && 거래완료상태가 아닌게 맞는지 체크 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE (b_id=? AND m_id=? AND b_expired=0)`, target_b_id ,user_m_id);
        if(result[0].cnt < 1){
            return res.status(400).json("거래가 완료된 상태이거나, 당신이 작성한 게시글이 아니거나 , 블록 처리된 게시글입니다.");
        }


        //거래 완료 쿼리를 날리기 전에 해당 게시물에 (거래요청&&거래요청수락) 상태인지 확인한다
        [result] = await dbcon.sendQuery(`SELECT r_id FROM dangoon.request_purchased WHERE (r_flag=1 AND b_id=?) ` , target_b_id );
        if(result[0].r_id == undefined){
            return res.status(400).json("거래상태가 거래중이 아닙니다. 거래요청을 받고 거래요청을 수락한 상태여야 합니다.");
        }
        target_r_id = result[0].r_id;

        //해당  request 레코드의 r_done 컬럼 값을 true로 변경하고 거래가 완료된 r_id임을 저장한다. 
        [result] = await dbcon.sendQuery(`UPDATE dangoon.request_purchased SET r_done='1' WHERE (b_id=? AND r_flag=1)  ` , target_b_id );

        //완료된 거래요청 빼고 진행중인 거래요청은 모두 삭제처리 된다. 
        [result] = await dbcon.sendQuery(`DELETE FROM dangoon.request_purchased WHERE (b_id=? AND r_flag=0)`, target_b_id);
        [result] = await dbcon.sendQuery(`UPDATE dangoon.board SET b_expired='1' WHERE b_id=?  ` , target_b_id );
        
        //위의 요청이 정상적으로 수행되었는지 재확인 쿼리를 수행한다. 
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.request_purchased WHERE (r_flag=1 AND b_id=?) `,target_b_id );
        if(result[0].cnt != 1){
            console.log(result[0].cnt) ;
            return res.status(400).json("거래요청 관련 쿼리 수행중 오류가 발생했습니다.");
        }
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE (b_id=? AND b_expired=1) `,target_b_id );
        if(result[0].cnt != 1){
            return res.status(400).json("게시글이 정상적으로 완료처리에 실패했습니다.");
        }
        console.log("테스트0");
    }catch(e){
        console.log("테스트1");
        return next(e);
        
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        await dbcon.end();
        console.log("테스트2");
    }
    //저장한 값 여기서 전송해주고 
    //클라이언트 요청 정상수행 (응답에 대한 메시지 미포함, 보통 삭제요청에 사용 )
    console.log("테스트3");
    return res.status(200).json("거래완료 처리 되었습니다.");
    
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