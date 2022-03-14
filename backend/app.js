//API 명세처리 
import {swaggerUi, specs} from "./swagger.js";


//helper
import _config from "./config/_config.js";

//Router
import Home             from "./router/home.js";
import caveLife         from './router/cavelife.js';
import Category         from './router/category.js';
import myGarlic         from './router/mygarlic.js';
import registerForSale  from './router/registerforsale.js';
import Notice           from './router/notice.js';
import Login            from './router/login.js';
import signUp           from './router/signup.js';
import saleHistory      from './router/salehistory.js';
import purchasedItem    from './router/purchaseditem.js';
import watchList        from './router/watchlist.js';
import productDetails   from './router/productdetails.js';
import Mail             from './router/mail.js';


import * as url from "url";
import path from "path";


//need to install 
import express from 'express';
const app = express();
import serveStatic from "serve-static"; //특정 폴더의 파일을 URL로 노출
import serveFavicon from "serve-favicon";
import morgan from "morgan"; 
import * as cors from "cors";
import bodyParser from "body-parser";



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/", serveStatic(_config.PUBLIC_PATH));
app.use("/upload", serveStatic(_config.UPLOAD_CONFIG.dir)); //upload파일 저장위치
app.use("/thumb", serveStatic(_config.THUMBNAIL.dir));      //썸네일 저장위치
app.use(serveFavicon(_config.FAVICON_PATH));//favicon

app.use(morgan('dev'))


//Router
app.use("/home",            Home);
app.use("/category",        Category);
app.use("/registerforsale", registerForSale);
app.use("/notice",          Notice);
app.use("/cavelife",        caveLife);
app.use("/login",           Login);
app.use("/signup",          signUp);
app.use("/salehistory",     saleHistory);
app.use("/purchaseditem",   purchasedItem);
app.use("/watchlist",       watchList);
app.use("/productdetails",  productDetails);
app.use("/mail",            Mail);

//에러처리 
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something Wrong");
});



app.listen(_config.SERVER_PORT, ()=>{
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
