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

    //DB Config
    DATABASE_CONFIG : {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'dangoon',
    },





}