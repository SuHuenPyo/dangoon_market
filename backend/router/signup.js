const router = require('express').Router();

router.use((req,res,next)=>{
    console.log('Time: ' , Date.now());
    next();
});

router.get('/', (req,res, next)=>{
    try{
        //대충 DB 연동하고 결과 저장 
    }catch(e){
        return next(err);
    }finally{
        //dbEnd 반드시 마지막에 DB 핸들풀고 
    }
    //저장한 값 여기서 전송해주고 
    res.send("signup입니다.");
});



module.exports = router;