import { validationResult } from "express-validator";
import ImportManager from "../common/IM.js";

export const validator = {

    //에러처리
    errorResultCallback:{
        /**
        * 에러코드 처리부분입니다. 
        * @param {*} req 
        * @param {*} res 
        * @param {*} next 
        * @returns 
        */
        "errorResult": (req, res, next)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                console.log(errors);
                //return res.status(400).json({errors: errors.array() });
                return res.status(400).json({text: 'Bad Request ! , 그것은 나쁩니다.'});
            }
            next();
        },
    },
    

    //express-validator의 커스텀 룰입니다.
    custom: {
        /**
         * 패스워드, 패스워드 확인이 일치하는지 검증합니다.
         * @param {*} param0 
         * @returns 
         */
        'checkMatchPassword' : ({req})=>{
            if(req.xx === req.xx){
                throw new Error('password confirmation does not match password');
            }
            return true;
        },


    },


}
