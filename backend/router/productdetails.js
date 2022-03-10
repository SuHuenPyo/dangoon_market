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
     * /home:
     *   productdetails:
     *     description: 단군마켓 판매글을 조회합니다. 
     *     tags: [Get (Working)]
     *     produces:
     *     - "application/json"
     *     parameters:
     *     - name: "board_id"
     *       in: "query"
     *       description: "상세보기 할 board_id를 입력합니다."
     *       type: "number"
     *     responses:
     *       "200":
     *         description: "successful operation"
     *     
    */
    router.get('/productdetails', async(req,res, next)=>{

        //현재 페이지 번호 받기 (default 1)
        const board_id = req.query.board_id;

        
        try{
            //DB Connection
            dbcon = await mysql2.createConnection(config.database_config);
            await dbcon.connect();

            //데이터 조회 
            sql = "select M_ID, B_WRITER, B_TITLE, B_CONTENT, B_IMG, B_RDATE, B_HITS from dangoon.board where B_ID = ? LIMIT 0,1";

            let args = [];
            args.push(board_id);

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
