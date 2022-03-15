import ImportManager from "../common/IM.js";
import AWS from 'aws-sdk';
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

//limit content
const maxSize = 2 * 1024 *1024; //2MB
const maxBoardCount = 5; //게시판(거래, 커뮤니티) 사진 개수 제한
const maxProfileCount = 1; //프로필사진 업로드 개수 제한

const s3 = new AWS.S3({
    credentials:{
        accessKeyId: ImportManager.privateInfo.AWS_CONFIG.secretAccessKey,
        secretAccessKey : ImportManager.privateInfo.AWS_CONFIG.accessKeyId,
        region : ImportManager.privateInfo.AWS_CONFIG.region,
    },
});
/**
 * 프로필 사진 업로드를 위한 셋팅
 */
export let uploadProfile = multer({
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, 'profile/'+Date.now().toString() + extension)
        },
        acl: 'public-read',
    }),
    limits: {
        fileSize: maxSize,
        files: maxProfileCount
    }
});
/**
 * 수정 필요
 */
export let uploadBoard = multer({
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, file.fieldname+'/'+Date.now().toString() + extension)
        },
        acl: 'public-read',
    }),
    limits: {
        fileSize: maxSize,
        files: maxProfileCount
    }
});

export let removeImage = async(fileKey)=>{
    
}
