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
import LogOut           from './router/logout.js';
import signUp           from './router/signup.js';
import saleHistory      from './router/salehistory.js';
import watchList        from './router/watchlist.js';
import productDetails   from './router/productdetails.js';
import Mail             from './router/mail.js';
import Development      from './router/development.js';
import Like             from "./router/like.js";
import requestPurchase  from "./router/purchaseditem.js";
import Profile          from "./router/profile.js";
import test             from "./router/test.js";


import * as url from "url";
import path from "path";




//need to install 
import express from 'express';
const app = express();

    //세션부분
import session from "express-session"
import MySQLStore from "express-mysql-session";

import serveStatic from "serve-static"; //특정 폴더의 파일을 URL로 노출
import serveFavicon from "serve-favicon";
import morgan from "morgan"; 
import cors from 'cors';
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import * as multer from "multer";
import ImportManager from "./common/IM.js";
import cookieParser from "cookie-parser";
import { NONAME } from "dns";




const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//인증서
import https from 'https';
import fs from 'fs';




const options = {
    key: fs.readFileSync('./.certification/privkey1.pem'),
    cert: fs.readFileSync('./.certification/cert1.pem')
};

const httpsPort = 7799;

https.createServer(options, app).listen(httpsPort, ()=>{
    console.log("Https server listening on port " + httpsPort);
});



//session 미들웨어 등록 
//세션 mysql 셋팅
app.set('trust proxy',1)
const secretKey = 'S2cre2t';
app.use(cookieParser(secretKey));
const MySQLStoreSession = MySQLStore(session);
const connection = ImportManager.mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'dangoon',
});
const sessionStore = new MySQLStoreSession({}, connection);

app.use(session({
    //key: 'Login#SeSS1on',
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        //3 * 1000 * 60  * 60 = 3시간 유효
        maxAge: 3 * 1000 * 60 * 60,
        // allow the cookie to be sent via HTTP ("true" means "HTTPS only)
        secure: true, 
        sameSite: 'none',
        
    },
    store: sessionStore,
}))


/**
 * POST 파라미터 수신모듈 설정
 * 추가 모듈들 중 UserAgent를 제외하고 가장 먼저 설정되어야함
 * body-parser를 이용해 application/x-www-form-urlencoded 파싱
 * extended: true --> 계속 사용 
 * extended: false --> 한번 사용 
 * */ 
app.use(cors({
    origin: true,
    credentials : true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
}));
app.use(bodyParser.text()); //TEXT형식의 파라미터 수신가능
app.use(bodyParser.json()); //JSON형식의 파라미터 수신가능
app.use(bodyParser.urlencoded({extended:true}));



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
//app.use("/upload", serveStatic(_config.UPLOAD_CONFIG.dir)); //upload파일 저장위치
app.use("/thumb", serveStatic(_config.THUMBNAIL.dir));      //썸네일 저장위치
app.use(serveFavicon(_config.FAVICON_PATH));//favicon

app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms :date'))


//Router
app.use("/api/home",            Home);
app.use("/api/category",        Category);
app.use("/api/registerforsale", registerForSale);
app.use("/api/notice",          Notice);
app.use("/api/cavelife",        caveLife);
app.use("/api/login",           Login);
app.use("/api/logout",          LogOut)
app.use("/api/signup",          signUp);
app.use("/api/salehistory",     saleHistory);
app.use("/api/watchlist",       watchList);
app.use("/api/productdetails",  productDetails);
app.use("/api/mail",            Mail);
app.use("/api/development",     Development);
app.use("/api/like",            Like);
app.use("/api/requestpurchase", requestPurchase);
app.use("/api/profile",         Profile);
app.use("/api/.well-known", test);


//에러처리 
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something Wrong , 무언가 실수가 있네요 ! ");
});



app.listen(_config.SERVER_PORT, ()=>{
    console.log("---- 서버가 실행 되었어요 ----");
});



function testMiddleWare(req, res, next){
    console.log('첫번째 미들웨어');
    next();
}
function testMiddleware2(req, res, next){
    console.log('두번째 미들웨어');
    next();
}
