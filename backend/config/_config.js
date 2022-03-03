const path = require("path");

module.exports = {
    
    //Web Server Port 
    SERVER_PORT : 28019,

    //public dir 
    PUBLIC_PATH: path.join(__dirname, "../public"),

    //favicon dir
    FAVICON_PATH: path.join(__dirname,"../public/favicon.png"),

    //쿠키 저장시 사용할 도메인
    // localhost 인경우 공백, 도메인이 aa.aa.aa 일경우 .을 붙여서 명시 -> .aa.aa.aa
    COOKIE_DOMAIN: "",

    //upload 파일 경로
    UPLOAD_CONFIG: {
        path: '/upload',
        dir: path.join(__dirname, '../_files/upload'),
        max_size: 1024 * 1024 * 20,
        max_count: 10
    },

    THUMBNAIL : {
        sizes: [480, 750, 1020],
        dir: path.join(__dirname, "../_files/thumb")
    },

    database_config : {
        host: '127.0.0.1', //mysql 서버 주소(다른 PC인 경우 IP주소)
        port: 3306 ,//MySQL 설치시 기본값 3306
        user: 'root', //접근 권한 아이디(root=관리자)
        password: '1234', //설치시 입력한 비밀번호
        database: 'dangoon', //사용할 데이터베이스 이름
    },

    mailer_config:{
        user: 'dg.market.whitebear@gmail.com',
        password: 'dangoon#@pa1'
    }





}