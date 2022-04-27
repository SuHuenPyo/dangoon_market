import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { DG_DB } from "../helper/dbHelper.js";


import ImportManager from "../common/IM.js";
import { getObj, put_from_url, S3URL, uploadBoard, uploadComment } from "../helper/awsHelper.js";
import { authIsOwner } from "../middleware/session.js";


const caveLife = express.Router();

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
caveLife.get('/', async(req, res, next)=>{
    let dbcon = null;
    let json = null;


    //현재 페이지 번호 받기 (default 1)
    const page = req.query.page || 1;
    
    //페이지당 요청 글 개수 (default 10)
    const rows = req.query.rows || 5;

    let pagenationResult = null;
    try{
        //DB Connection
        dbcon = await mysql.createConnection(_config.database_config);
        await dbcon.connect();

        //전체 데이터 수 조회
        let sql = "SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='C'";
        
        const [result1] = await dbcon.query(sql);
        //console.log(result1);

        const totalCount = result1[0].cnt;

        pagenationResult = pagenation(totalCount, page, rows);

        //console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        sql = "SELECT b_id, m_id , b_writer, b_title, b_content, b_img, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate FROM dangoon.board WHERE b_type='C' LIMIT ?,?";

        args.push(pagenationResult.offset);
        args.push(pagenationResult.listCount);

        const [result2] = await dbcon.query(sql, args);


        for(let idx in result2){
            let args = [];
            sql = "SELECT m_pic FROM dangoon.member WHERE m_id=?";
            args.push(result2[idx].m_id);
            let [tempResult] = await dbcon.query(sql, args);
            result2[idx].profilePic = S3URL+tempResult[0].m_pic;
        }
        console.log(result2);
        json = result2;
        



    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }

    //저장한 값 여기서 전송해주고 
    res.send({'item': json, 'pageEnd': pagenationResult.groupEnd});

});
/**
 * @swagger
 * /cavelife:
 *   post:
 *     description: 동굴생활 단군마켓 커뮤니티에 글을 쓰는 기능입니다.
 *     tags: [Post (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "multipart/form-data"
 *       schema:
 *          type: object
 *          properties:
 *              memberId:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              board: 
 *                  type: Img
 *                  description: "이미지파일"
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
caveLife.post('/', uploadBoard.array('board', 10) ,async(req, res, next)=>{

    //console.log(req.files);
    
    //썸네일 키를 저장할 변수
    let thumbnail_key = null;

    if(req.files[0].fieldname == 'thumbnail'){
        // put_from_url(S3URL+req.files[0].fieldname , req.files[0].key, (err, res)=>{
        //     if(err){
        //         console.log("무언가 잘못되었음");
        //     }
        //     console.log("정상적으로 썸네일이 업로드 되었습니다. ");
        // }) 
        //test(S3URL+req.files[0].fieldname , req.files[0].key);
        //console.log(req)
        thumbnail_key = await getObj(req.files[0].key);
    }
    //
    
    //file type Board
    let mfileType = "B";
    
    //board CaveLife
    let mboardType = "C";

    let {memberId, title, content} = req.body;
    let memberName  = null;
    let boardId     = null;

    //필요사항
    /*
        M_ID        = 맴버아이디  (추후엔 세션으로 맴버ID 가져오도록 할거임)
        B_WRITER    = 작성자 (추후엔 이것도 세션으로 맴버ID 가져오도록 할거임)
        B_TITLE     = 작성글 제목
        B_CONTENT   = 작성글 내용
        B_IMG       = 이것은 사실 썸네일 관련인데 . 일단은 패스 하도록 
        B_CATEGORY  = 카테고리
        B_PRICE     = default 0 
    */
    
    let dbcon = new DG_DB();
    try {
        
        await dbcon.DbConnect();
        //먼저 유저관련 정보 가져오기 
        let [result] = await dbcon.sendQuery(`SELECT m_name AS name FROM dangoon.member WHERE (m_id = ?)`, memberId);
        memberName = result[0].name;

        //게시판 생성
        [result] = await dbcon.sendQuery(`INSERT INTO dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, b_img ) VALUES(?, ?, ?, ?, ?, ?)`, memberId, mboardType, memberName, title, content, thumbnail_key);
        boardId = result.insertId


        //이미지 등록
        for(let idx in req.files){
            await dbcon.sendQuery(`INSERT INTO dangoon.file(b_id, f_type, f_file) VALUES(?, ?, ?)`, boardId, mfileType, req.files[idx].key);
        }
        

    }catch(e){
       console.error(e);
       return res.status(400).json({text: '무언가 잘못됨.'});
    }finally{
        dbcon.end();
    }


    return res.status(200).json({text: '동굴생활 등록 성공'});
    
});

/**
 * @swagger
 * /cavelife/comment:
 *   post:
 *     description: 동굴생활 단군마켓 커뮤니티에 댓글을 쓰는 기능입니다..
 *     tags: [Post (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "content"
 *       in: "body"
 *       description: "multipart/form-data"
 *       schema:
 *          type: object
 *          properties:
 *              boardId:
 *                  type: string
 *              content:
 *                  type: string
 *              comment: 
 *                  type: Img
 *                  description: "이미지파일"
 *         
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
caveLife.post('/comment', authIsOwner ,uploadComment.array('comment', 10) ,async(req, res, next)=>{

    //board
    let mfileType = "C";

    let {boardId, content} = req.body;


    console.log(req.files);

    //필요사항
    /*
        B_ID    : 보드 ID
        userId  : 세션에서 직접 가져올것임 
        m_id = 세션에서 뽑아옴 
    */
    
     let user_id = req.session.user.id; //세션상 user id(NickName)
     let userId = null; //DB m_id
    

    //필요정보 저장
    let writerName = null;

    let dbcon = new DG_DB();
    try {
        
        await dbcon.DbConnect();

        //세션유저 m_id 가져오기
        //해당 접속자 세션정보로 m_id를 가져온다
        let [result] = await dbcon.sendQuery(`SELECT m_id FROM dangoon.member WHERE m_user_id=?`, user_id);
        userId = result[0].m_id;


        //먼저 유저관련 정보 가져오기 
        [result] = await dbcon.sendQuery(`SELECT m_name AS writerName FROM dangoon.member WHERE (m_id = ?)`, userId);
        writerName = result[0].writerName;

        //댓글 생성
        [result] = await dbcon.sendQuery(`INSERT INTO dangoon.comment(b_id, m_id, c_writer, c_content) VALUES(?, ?, ?, ?)`, boardId, userId, writerName, content);
        
        let c_id = result.insertId


        //이미지 등록
        for(let idx in req.files){
            await dbcon.sendQuery(`INSERT INTO dangoon.file(b_id, c_id, f_type, f_file) VALUES(?, ?, ?, ?)`, boardId, c_id, mfileType, req.files[idx].key);
        }
        

    }catch(e){
       console.error(e);
       return res.status(400).json({text: '무언가 잘못됨.'});
    }finally{
        dbcon.end();
    }


    return res.status(200).json({text: '댓글 등록 성공'});
    
});
/**
 * @swagger
 * /cavelife/comment:
 *   get:
 *     description: 동굴생활 글에 달린 댓글을 가져옵니다..
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "boardId"
 *       in: "query"
 *       description: "댓글을 볼 해당 B_id를 입력합니다."
 *     responses:
 *       "200":
 *         description: "writerName: 댓글 작성자 \n writerId: 작성자 userID \n content: 댓글 내용 \n rDate: 댓글 작성 일시\n writerPic: 글쓴이 프로필사진 \n commentPic: 댓글에 사용된 사진"
 *     
*/
caveLife.get('/comment', authIsOwner, async(req, res, next)=>{
    let {boardId} = req.query

    //FileType - B-게시판, C-댓글
    let FileType = "C"

    //return value
    //let writerName, writerPic , writerId ,content, rDate, commentPic= null;
    let returnJson = [];

    let dbcon = new DG_DB();
    try{
        await dbcon.DbConnect();
        //writer id 가져오기 
        let [result] = await dbcon.sendQuery(`SELECT c_id, m_id as writerId, c_writer as writerName, c_content as content, date_format(c_rdate, '%Y-%m-%d %H:%i:%s')as rDate FROM dangoon.comment WHERE b_id`, boardId, boardId);

        let tempResult1 = [];
        let tempResult2 = [];

        
        for(let idx in result){ 
            [tempResult1] = await dbcon.sendQuery(`SELECT m_pic as writerPic FROM dangoon.member WHERE m_id=?`, result[idx].writerId);
            //console.log(FileType, boardId, result[idx].c_id) ;
            [tempResult2] = await dbcon.sendQuery(`SELECT F_FILE as commentPic FROM dangoon.file WHERE (f_type=? AND b_id=? AND c_id=?)`,FileType, boardId, result[idx].c_id);
            //console.log(tempResult2);
            let jsonCommentPic = [];
            for(let imgIdx in tempResult2){
                jsonCommentPic.push( S3URL+tempResult2[imgIdx].commentPic)
            }
            returnJson.push({'writerName': result[idx].writerName, 'writerId': result[idx].writerId, 'content': result[idx].content, 'rDate': result[idx].rDate, 'writerPic': S3URL+tempResult1[0].writerPic, 'commentPic':jsonCommentPic});
        }
        
    }catch(e){
        return next(e);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json({result: returnJson});

});

/**
 * @swagger
 * /cavelife/details:
 *   get:
 *     description: 동굴생활 글을 상세조회합니다.. 
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "boardId"
 *       in: "query"
 *       description: "상세보기 할 해당 게시글의 B_ID를 입력합니다."
 *     responses:
 *       "200":
 *         description: "writerId: 글쓴이 고유 ID \n imageUrls: 해당 동굴생활 이미지\n writerImg: 글쓴이 사진\n writerName: 글쓴이 이름\n title: 동굴생활 게시글 제목\n content: 해당 게시물 내용\n hits: 조회수\n rDate: 글 등록날짜"
 *  
*/
caveLife.get('/details', async(req, res, next)=>{
    let {boardId} = req.query

    //FileType - B-게시판, C-댓글
    let boardType = "B"
    //return value
    let sellerId, sellerImg, sellerName, title, content, hits, rDate= null;
    let imageUrls = [];

    let dbcon = new DG_DB();
    try{
        await dbcon.DbConnect();

        //board 정보 가져오기 
        
        await dbcon.sendQuery(`UPDATE dangoon.board AS A, (SELECT b_hits FROM dangoon.board WHERE b_id=?) AS B SET A.b_hits = (B.b_hits + 1) WHERE A.b_id=?;`, boardId, boardId);
        let [result] = await dbcon.sendQuery(`SELECT m_id as sellerId, b_title as title, b_content as content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as rDate, b_hits as hits From dangoon.board WHERE b_id=?`, boardId);
        sellerId    = result[0].sellerId;
        title       = result[0].title;
        content     = result[0].content;
        rDate       = result[0].rDate;
        hits        = result[0].hits;

        //글쓴이 기반으로 프로필 사진 가져오기 
        [result] = await dbcon.sendQuery(`SELECT m_name as sellerName, m_pic as sellerImg FROM dangoon.member WHERE m_id=?`, sellerId);
        sellerImg   = S3URL+result[0].sellerImg;
        sellerName  = result[0].sellerName;

        
        console.log(boardId);
        //동굴생활 해당글 이미지들 가져오기 
        [result] = await dbcon.sendQuery(`SELECT f_file as imageUrls from dangoon.file WHERE (B_ID=? AND c_id IS NULL AND f_type=? )`, boardId, boardType);
        
        let index = 0;
        for(let idx in result){ 
            imageUrls.push(S3URL+result[idx].imageUrls);
        }
        


        
        
    }catch(e){
        return res.status(400).json({'에러코드': e});
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
        dbcon.end();
    }
    //저장한 값 여기서 전송해주고 
    return res.status(200).json({writerId: sellerId, imageUrls: imageUrls, writerImg: sellerImg, writerName: sellerName, title: title, content: content, hits: hits, rDate: rDate});

});

export default caveLife