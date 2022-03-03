const router = require('express').Router();

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
     *     tags: [Post]
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
    router.get('/', (req,res, next)=>{
        try{
            //대충 DB 연동하고 결과 저장 
        }catch(e){
            return next(err);
        }finally{
            //dbEnd 반드시 마지막에 DB 핸들풀고 
        }
        //저장한 값 여기서 전송해주고 
        res.send("productdetail입니다.");
    });
    
    return router;
}
