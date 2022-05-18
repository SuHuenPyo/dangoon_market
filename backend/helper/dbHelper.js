import ImportManager from "../common/IM.js";



export class DG_DB{

    constructor(name){
        this.name = name;
        this.result = null;
    }

    async DbConnect(){
    
        console.log(ImportManager.privateInfo.DB_USER)
        console.log(ImportManager.privateInfo.DB_PASSWORD)
        console.log(ImportManager.privateInfo.DB_DATABASE)
        try{
            this.db = await ImportManager.mysql.createConnection({
                host        : ImportManager.privateInfo.DB_HOST,
                port        : parseInt(ImportManager.privateInfo.DB_PORT),
                user        : ImportManager.privateInfo.DB_USER,
                password    : ImportManager.privateInfo.DB_PASSWORD,
                database    : ImportManager.privateInfo.DB_DATABASE,
                
            });
            await this.db.connect();
            console.log("연동성공");
        }catch(e){
            console.error(e);
            console.error("DB 연동 실패");
            throw new Error("단군마켓 DB 연동 실패");
        }
    
    }

    /**
     * DB 연동을 해제합니다. 
     * @returns {boolean} true - 정상종료,  exeption - 에러
     */
    async end(){
        try{
            await this.db.end();
            return true;
        }catch(e){
            throw new Error("정상적으로 DB 핸들링이 종료되지 않았습니다.")
        }
        
    }
    /**
     * sql 문 가변인자로 넘길 배열문을 만듭니다. 
     * @param  {...any} args 
     * @returns { Array } 완성된 배열을 return 받습니다.
     */
    argsPush(...args){
        let arr = [];

        args.forEach(current => {
            arr.push(current)
        });
        return arr;
    }
    /**
     * 연결되어 있는 DBMS에 쿼리를 요청합니다.
     * @param {string} sql 
     * @param {Array} args 
     * @returns 
     */
    async sendQuery(sql, ...args){
        try{
            return await this.db.query(sql, args);
        }catch(e){
            throw new Error("쿼리 요청중 뭔가 문제가 생겼네요" + e);
        }
        
    }
    /**
     * 파라미터로 YYYY-MM-DD hh:mm:ss 형식의 값을 입력받습니다. 
     * 해당 시간을 기준으로 경과 분(minutes)을 반환합니다.
     * @param {string} targetTime 
     * @returns 
     */
    checkElapsedTime = (targetTime)=> {return ImportManager.compareMinutes(targetTime)};
    
    
    
}