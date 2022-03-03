

module.exports.getRandomNumber = (digit=6)=> {
    return;
}

//무작위 문자열값이 섞여나옵니다. 숫자,알파벳
module.exports.getRandomChar = (digit=6)=> {
    return Math.random().toString(36).slice(2).substring(0,digit);
}



