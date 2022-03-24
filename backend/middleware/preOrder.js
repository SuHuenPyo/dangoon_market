import ImportManager from "../common/IM.js";

//const preOderRouter = ImportManager.router;

export const preOder = {

    "registerImgCheck": (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            //return res.status(400).json({errors: errors.array() });
            return res.status(400).json({text: 'Bad Request ! , 그것은 나쁩니다.'});
        }

        next();
    },
}