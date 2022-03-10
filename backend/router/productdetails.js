const config = require('../config/_config')
const rand = require('../helper/RandomHelper')
const pagenationHelper = require('../helper/PagenationHelper');
const router = require('express').Router();
const mysql2 = require('mysql2/promise');

module.exports = (app) => {
    router.use((req,res,next)=>{
        console.log('Time: ' , Date.now());
        next();
    });
    /**
     * @swagger
     * /productdetails:
     *   get:
     *     description: 게시글 조회
     *     tags: [Post (Not Work)]
     *     produces:
     *     - "application/json"
     *     parameters:
     *     - name: "category"
     *       in: "query"
     *       description: "조회할 카테고리 id, 중첩 가능. ex) category=1&category=2&category=3"
     *       type: "string"
     *     - name: "query"
     *       in: "query"
     *       description: "검색어"
     *       type: "string"
     *     responses:
     *       "200":
     *         description: "successful operation"
     *     
    */

    router.get('/productdetails', async(req,res, next)=>{

        //현재 페이지 번호 받기 (default 1)
        const boardid = req.query.boardid;

        if(boardid == null) return next(new Error("올바른 상품을 선택하세요."));
        
        try{
            //DB Connection
            dbcon = await mysql2.createConnection(config.database_config);
            await dbcon.connect();

            //데이터 조회 
            sql = "select M_ID, B_WRITER, B_TITLE, B_CONTENT, B_IMG, B_RDATE, B_HITS from dangoon.board where B_ID = ? LIMIT 0,1";

            let args = [];
            args.push(req.query.boardid);

            const [result] = await dbcon.query(sql, args);

            json = result;

            console.log(result);
            
        }catch(e){
            return next(e);
        }finally{
            //dbEnd 반드시 마지막에 DB 핸들풀고 
            dbcon.end();
        }
        //저장한 값 여기서 전송해주고 
        res.send({'item': json});
    });

    return router;
}
