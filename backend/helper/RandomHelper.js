
/**
 * 
 * @param {number} digit digit - 1이상의 자연수
 * @returns 
 */
module.exports.getRandomNumber = (digit=6)=> {
    return;
}

/**
 * 
 * @param {number} digit  digit - 1이상의 자연수
 * @returns {string} 랜덤하게 섞인 문자열, 숫자 
 */
module.exports.getRandomChar = (digit=6)=> {
    return Math.random().toString(36).slice(2).substring(0,digit);
}



