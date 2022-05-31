import ImportManager from "../common/IM.js";
import AWS from 'aws-sdk';
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import request from 'request-promise';
import client from 'https';

import sharp from "sharp";
import fs from "fs";
import Jimp from 'jimp';

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
/*
    if(!req.session.user){
        console.log("로그인을 하세요");
        return res.status(401).json({'text':'로그인을 하세요'});
    }
*/
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


const BoardThumbnailFilter = (req, file, cb) => {
    //차례대로 파일 하나하나 SignupFilter에 차례대로 넣음 
    //매번 새롭게 함수가 실행되고, req.files에 파일이 파일한개씩 쌓임 
    // 이걸 이용해서 file이 한개만 있을경우 최초실행이라 판단하고 썸네일로 제작함 
    
    //맨처음 이미지를 썸네일로 만들것임 . 

    console.log("1111111111")

    if(req.files.length == 1){
        req.files[0].fieldname = 'thumbnail';
        file.fieldname = 'thumbnail';
    }
    
    //console.log("필터 : "+req.files);

    if(!req.session.user){
        console.log("로그인을 하세요");
        return res.status(401).json({'text':'로그인을 하세요'});
    }
    let typeArray = file.mimetype.split('/');
    let fileType = typeArray[1];
    //console.log(typeArray);
    //console.log(fileType);
    if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg'){
        cb(null, true);    
    }else{
        cb(new AppError('허용되지 않는 이미지 파일입니다. jpg, png, jpeg 외엔 업로드가 불가능합니다.', 400), false);
    }

};

/**
 * 썸네일 업로드를 위한 함수 생성
 */
export let put_from_url = (url, key ,callback)=>{
    request({
        url: url,
        encoding: null,
    }, async(err, res, body)=>{
        if(err) return callback(err,res);

 
        


        s3.putObject({
            Bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
            Key : "thumbnail/"+key,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body // 버퍼입니다. 
        }, callback);
    })
}

let streamToString = (stream)=> {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    });
  }

  

export let getObj = async(key)=>{

    console.log(key);

    const transformer = sharp()
    .resize({
    width: 85,
    height: 85,
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  });

    let readableStream = await s3.getObject({ Bucket: ImportManager.privateInfo.AWS_CONFIG.bucket, Key: key }).createReadStream();

    const pipeline = sharp();

    // pipeline.metadata().then(metadata => {
        
    //     s3.putObject({
    //         Bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
    //         Key : "thumbnail/"+key,
    //         Body: metadata // 버퍼입니다. 
    //     }, (err)=>{
    //         if(err) console.log(err);
    //     });
    // });
    // let output = await sharp(readableStream).resize(85, 85).toBuffer();
    
    // console.log(output)



    pipeline.metadata().then(metadata => {
        console.log(metadata);
    });

    let buffer = await readableStream.pipe(transformer).pipe(pipeline).toBuffer();

    console.log(buffer);

    s3.putObject({
        Bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,
        Key : "thumbnail/"+key,
        Body: buffer // 버퍼입니다. 
    }, (err)=>{
        if(err) console.log(err);
    });

    return "thumbnail/"+key;
    
    
}




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
    fileFilter: BoardThumbnailFilter,
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,

        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            // console.log("업로드:"+req.files)
            // console.log(file);
            // if(req.files[0].fieldname == 'thumbnail'){
            //     //console.log("aaaaaaaaaaaaaaa")
            //     cb(null, 'thumbnail/'+Date.now().toString()+file.originalname + extension)
            // }else{
            //     cb(null, 'board/'+Date.now().toString()+file.originalname + extension)
            // }
            //console.log(file.fieldname + "이름");
            // if(file.fieldname == 'thumbnail'){
            //     cb(null, 'thumbnail/'+Date.now().toString()+file.originalname + extension)
            // }
            console.log(req.files);
            cb(null, 'board/'+Date.now().toString()+file.originalname + extension)
            
        },
        acl: 'public-read',
    }),
    limits: {
        fileSize: maxSize,
        files: maxBoardFileCount
    }
});

/**
 * 댓글 쓰기 전용 업로더
 */
 export let uploadComment = multer({
    storage : multerS3({
        s3: s3,
        bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,

        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, 'comment/'+Date.now().toString()+file.originalname + extension)
        },
        acl: 'public-read',
    }),
    fileFilter: SignUpFilter,
    limits: {
        fileSize: maxSize,
        files: maxBoardFileCount
    }
});


// /**
//  * 썸네일 전용 업로더
//  */
//  export let uploadThumbnail = multer({
//     storage : multerS3({
//         s3: s3,
//         bucket: ImportManager.privateInfo.AWS_CONFIG.bucket,

//         key: function (req, file, cb) {
//              let extension = path.extname(file.originalname);
//              cb(null, 'thumb/'+Date.now().toString()+file.originalname + extension)
//         },
//         acl: 'public-read',
//     }),
//     fileFilter: SignUpFilter,
//     limits: {
//         fileSize: maxSize,
//         files: maxBoardFileCount
//     }
// });
export let removeImage = async(fileKey)=>{

}


