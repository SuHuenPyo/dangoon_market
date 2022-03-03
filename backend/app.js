//API 명세처리 
const {swaggerUi, specs} = require('./swagger');


//helper
const config = require("./config/_config");

//Router
const ROUTER_HOME               = require('./router/home');
const ROUTER_CATEGORY           = require('./router/category');
const ROUTER_MYGARLIC           = require('./router/mygarlic');
const ROUTER_REGISTER_FOR_SALE  = require('./router/registerforsale');
const ROUTER_NOTICE             = require('./router/notice');
const ROUTER_CAVE_LIFE          = require('./router/cavelife');
const ROUTER_LOGIN              = require('./router/login');
const ROUTER_SIGN_UP            = require('./router/signup');
const ROUTER_SALE_HISTORY       = require('./router/salehistory');
const ROUTER_PURCHASED_ITEM     = require('./router/purchaseditem');
const ROUTER_WATCH_LIST         = require('./router/watchlist');
const ROUTER_PRODUCT_DETAILS    = require('./router/productdetails');
const ROUTER_MAIL               = require('./router/mail');


const url = require("url");
const path = require("path");


//need to install 
const app = require('express')();
const static = require("serve-static"); //특정 폴더의 파일을 URL로 노출
const favicon = require("serve-favicon");
const logger = require('morgan'); // 로거 
const bodyParser = require("body-parser");
const cors = require('cors');


/**
 * POST 파라미터 수신모듈 설정
 * 추가 모듈들 중 UserAgent를 제외하고 가장 먼저 설정되어야함
 * body-parser를 이용해 application/x-www-form-urlencoded 파싱
 * extended: true --> 계속 사용 
 * extended: false --> 한번 사용 
 * */ 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text()); //TEXT형식의 파라미터 수신가능
app.use(bodyParser.json()); //JSON형식의 파라미터 수신가능


//swagger path 등록 
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, {explorer: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

//app.use -> 미들웨어 장착 
/**
 * 미들웨어는 인자 3가지를 사용 (request, response, next)
 * 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해줘야함 
 */

//static 모듈 경로셋팅 (보안적이점) https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjok1122&logNo=221545195520
app.use("/", static(config.PUBLIC_PATH));
app.use("/upload", static(config.UPLOAD_CONFIG.dir)); //upload파일 저장위치
app.use("/thumb", static(config.THUMBNAIL.dir));      //썸네일 저장위치
app.use(favicon(config.FAVICON_PATH));//favicon

app.use(logger('dev'))


//Router
app.use(ROUTER_HOME(app));
app.use(ROUTER_CATEGORY(app));
app.use(ROUTER_REGISTER_FOR_SALE(app));
app.use(ROUTER_NOTICE(app));
app.use(ROUTER_CAVE_LIFE(app));
app.use(ROUTER_LOGIN(app));
app.use(ROUTER_SIGN_UP(app));
app.use(ROUTER_SALE_HISTORY(app));
app.use(ROUTER_PURCHASED_ITEM(app));
app.use(ROUTER_WATCH_LIST(app));
app.use(ROUTER_PRODUCT_DETAILS(app));
app.use(ROUTER_MAIL(app));

//에러처리 
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something Wrong");
});



app.listen(config.SERVER_PORT, ()=>{
    console.log("Start Server");
});



function testMiddleWare(req, res, next){
    console.log('첫번째 미들웨어');
    next();
}
function testMiddleware2(req, res, next){
    console.log('두번째 미들웨어');
    next();
}
