import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import { uploadBoard } from "../helper/awsHelper.js";
import { DG_DB } from "../helper/dbHelper.js";
import { authIsOwner } from "../middleware/session.js";

const Home = express.Router();


let dbcon = null;
let json = null;

/**
 * @swagger
 * /home:
 *   get:
 *     description: 단군마켓 판매글을 조회합니다. , item, 페이지의 마지막 번호를 리턴받습니다.
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
 *       description: "페이지당 표시 개수를 설정합니다. default = 10"
 *       type: "number"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
Home.get('/', authIsOwner, async(req, res, next)=>{


    console.log(req.connection.remoteAddress);
    console.log(req.headers['user-agent']);
    //현재 페이지 번호 받기 (default 1)
    const page = req.query.page || 1;
        
    //페이지당 요청 글 개수 (default 10)
    const rows = req.query.rows || 10;
    let pagenationResult = null;

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();


        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S'`);
        //console.log(result);

        const totalCount = result[0].cnt;
        pagenationResult = pagenation(totalCount, page, rows);

        //console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        
        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price, b_hits FROM dangoon.board WHERE b_type='S' ORDER BY b_id DESC LIMIT ?,? `, pagenationResult.offset, pagenationResult.listCount);

        //console.log(result2);
        let regexp = /\B(?=(\d{3})+(?!\d))/g;
        //console.log(result)

        for(let id in result){
            result[id].b_price = result[id].b_price.toString().replace(regexp, ',');
            let [temp] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.like WHERE (b_id=? AND l_flag='1' AND l_type='S')`, result[id].b_id);
            result[id].b_like = temp[0].cnt;
        }

        
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
 * /home/search:
 *   get:
 *     description: 단군마켓 판매글을 검색어로 조회합니다. , item, 페이지의 마지막 번호를 리턴받습니다.
 *     tags: [Get (Working)]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "keywords"
 *       in: "query"
 *       description: "검색할 키워드를 입력합니다. (필수 입력 항목)"
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
Home.get('/search', authIsOwner, async(req, res, next)=>{

    //현재 페이지 번호 받기 (default 1)
    const page = req.query.page || 1;
        
    //페이지당 요청 글 개수 (default 10)
    const rows = req.query.rows || 10;
    let pagenationResult = null;

    //키워드 
    let keyword = req.query.keywords;

    //필터 
    if (keyword.length > 10) {
        return res.status(400).json({text: '검색어가 너무 깁니다. 10자 이내로 해주세요'});
    }

    keyword = '%'+keyword+'%';

    //DB Connection
    let dbcon = new DG_DB();
    let result = null;
    try{
        await dbcon.DbConnect();


        //전체 데이터 수 조회
        [result] = await dbcon.sendQuery(`SELECT COUNT(*) as cnt FROM dangoon.board WHERE (b_type='S' AND b_title LIKE ?)`, keyword);
        //console.log(result);

        const totalCount = result[0].cnt;
        pagenationResult = pagenation(totalCount, page, rows);

        //console.log(JSON.stringify(pagenationResult));

        let args = [];

        //데이터 조회 
        
        [result] = await dbcon.sendQuery(`SELECT b_id, b_writer, b_title, b_content, date_format(b_rdate, '%Y-%m-%d %H:%i:%s')as b_rdate, b_category, b_price FROM dangoon.board WHERE (b_type='S' AND b_title LIKE ?) LIMIT ?,?`, keyword, pagenationResult.offset, pagenationResult.listCount);

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
/**
 * @swagger
 * /home/write:
 *   post:
 *     description: 판매글을 쓰는 기능입니다.
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
 *              category:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              price:
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
Home.post('/write', authIsOwner, uploadBoard.array('board', 10) ,async(req, res, next)=>{

    //board
    let mfileType = "B";
    //Sell 게시판
    let mboardType = "S";

    let {memberId, category, title, content, price} = req.body;
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
    //console.log(req.body)
    let dbcon = new DG_DB();
    try {
        
        await dbcon.DbConnect();
        //먼저 유저관련 정보 가져오기 
        let [result] = await dbcon.sendQuery(`SELECT m_name AS name FROM dangoon.member WHERE (m_id = ?)`, memberId);
        
        memberName = result[0].name;

        //게시판 생성
        [result] = await dbcon.sendQuery(`INSERT INTO dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(?, ?, ?, ?, ?, ?, ?)`, memberId, mboardType, memberName, title, content, category, price);
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


    return res.status(200).json({text: '판매글 등록 성공'});
    
});
export default Home;


