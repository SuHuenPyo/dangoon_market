import util from 'util';
import crypto from 'crypto';


const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString("base64");
}

export const createHashPassword = async (pass) => {
    const salt = await createSalt();
    //해싱할 값 , salt, 라운드횟수, output length, hash Algorithm
    const key = await pbkdf2Promise(pass, salt, 104457, 64, "sha512")
    const hashedPassword = key.toString("base64");

    return {hashedPassword, salt};
};

export const verifyUserPassword = async (pass, userSalt, userPass) =>{
    const key = await pbkdf2Promise(pass, userSalt, 104457, 64, "sha512")
    const hashedPassword = key.toString("base64");

    if(userPass == hashedPassword){
        return true;
    }
    return false;
    
}



