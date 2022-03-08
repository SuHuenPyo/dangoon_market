const config = require('../config/_config')
const rand = require('../helper/RandomHelper')
const pagenationHelper = require('../helper/PagenationHelper');
const router = require('express').Router();
const mysql2 = require('mysql2/promise');


module.exports = (app) => {

    rand.getRandomChar()
    let dbcon = null;

    /**
     * @swagger
     * /home:
     *   get:
     *     description: 단군마켓 판매글을 조회합니다. 
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
    router.get('/home', async(req,res, next)=>{

        //현재 페이지 번호 받기 (default 1)
        const page = req.query.page || 1;
        
        //페이지당 요청 글 개수 (default 10)
        const rows = req.query.rows || 10;
        
        try{
            //DB Connection
            dbcon = await mysql2.createConnection(config.database_config);
            await dbcon.connect();

            //전체 데이터 수 조회
            let sql = "SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S'";
            
            const [result1] = await dbcon.query(sql);
            console.log(result1);

            const totalCount = result1[0].cnt;

            pagenation = pagenationHelper.pagenation(totalCount, page, rows);

            console.log(JSON.stringify(pagenation));

            let args = [];

            //데이터 조회 
            sql = "SELECT b_id, b_writer, b_title, b_content, b_rdate, b_category FROM dangoon.board WHERE b_type='S' LIMIT ?,?";


            args.push(pagenation.offset);
            args.push(pagenation.listCount);

            const [result2] = await dbcon.query(sql, args);

            json = result2;

            console.log(result2);
            
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
