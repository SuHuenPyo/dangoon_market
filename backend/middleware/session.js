/**
 *  세션 검증을 위한 express 미들웨어
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const authIsOwner = (req, res, next)=>{
    
    //console.log(req.session);
    
    if( req.session && req.session.user && req.session.user.authorized &&
        req.session.user.ip === req.connection.remoteAddress && 
        req.session.user.userAgent === req.headers['user-agent']
        ){
        console.log("Auth ID : " + req.session.user.id + "(이)가 접속했습니다.");
        console.log("IP : " + req.session.user.ip);
        console.log("userAgent : " + req.session.user.userAgent);

        next();
    }else{
        console.log("미인증 유저의 접속 확인됨.")
        return res.status(401).json({'text':'로그인이 필요한 기능입니다. 로그인 정보를 확인하세요.'});
    }
}