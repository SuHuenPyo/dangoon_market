displayNotice();

//공지사항을 띄워줍니다. 
function displayNotice(){
    //4까지만 표시합니다. 
    let maxLoadCount = 4;
    result = requestNotice(4);
    

    let loadedContent = document.querySelector
}

//대충 임시 백엔드 기능 
function requestNotice(count){
    //쓰이지않지만 count는 4개까지 불러옵니다. 날짜기준 DESC 
    result = [
        ["공지사항입니다. 오늘은 거래 하지마세요.", "2021-08-19"],
        ["공지사항입니다. 오늘은 거래 하지마세요.", "2021-08-19"],
        ["공지사항입니다. 오늘은 거래 하지마세요.", "2021-08-19"],
        ["공지사항입니다. 오늘은 거래 하지마세요.", "2021-08-19"],
    ]
    return result;
}