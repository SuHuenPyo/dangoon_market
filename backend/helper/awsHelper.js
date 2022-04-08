import ImportManager from "../common/IM.js";
import AWS from 'aws-sdk';
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

//AWS URL
export const S3URL = "https://dg-market-bucket.s3.ap-northeast-2.amazonaws.com/";

//limit content
const maxSize = 10 * 1024 *1024; //2MB
const maxBoardCount = 5; //게시판(거래, 커뮤니티) 사진 개수 제한
const maxProfileCount = 1; //프로필사진 업로드 개수 제한
const maxBoardFileCount = 10;

const s3 = new AWS.S3({
    credentials:{
        accessKeyId: ImportManager.privateInfo.AWS_CONFIG.secretAccessKey,
        secretAccessKey : ImportManager.privateInfo.AWS_CONFIG.accessKeyId,
        region : ImportManager.privateInfo.AWS_CONFIG.region,
    },
});

//안전한 업로드를 위한 필터 구성
const SignUpFilter = (req, file, cb) => {
    if(!req.session.user){
        console.log("로그인을 하세요");
        return res.status(401).json({'text':'로그인을 하세요'});
    }
    let typeArray = file.mimetype.split('/');
    let fileType = typeArray[1];
    console.log(typeArray);
    console.log(fileType);
    if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg'){
        cb(null, true);    
    }else{
        cb(new AppError('허용되지 않는 이미지 파일입니다. jpg, png, jpeg 외엔 업로드가 불가능합니다.', 400), false);
    }

};
/**
 * 프로필 사진 업로드를 위한 셋팅
 */
export let uploadSignUp = multer({
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, 'profile/'+Date.now().toString() + extension)
        },
        acl: 'public-read',
    }),
    fileFilter: SignUpFilter,
    
    limits: {
        fileSize: maxSize,
        files: maxProfileCount
    },

});
/**
 * 게시판 글쓰기 전용 업로더
 */
export let uploadBoard = multer({
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,

        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, 'board/'+Date.now().toString()+file.originalname + extension)
        },
        acl: 'public-read',
    }),
    fileFilter: SignUpFilter,
    limits: {
        fileSize: maxSize,
        files: maxBoardFileCount
    }
});

export let removeImage = async(fileKey)=>{

}

