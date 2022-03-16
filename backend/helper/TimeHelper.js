
/**
 * 파라미터로 YYYY-MM-DD hh:mm:ss 형식의 값을 입력받습니다. 
 * 현재 시스템 시간을 기준으로 해당 파라미터의 시간과의 분 차이를 얻어옵니다.
 * @param {string} targetTime 
 * @returns {number} 현재 시간과의 분 차이를 반환합니다.
 */
export let compareMinutes = (targetTime)=>{

    let temp = targetTime.split(" ");

    //YYYY-MM-DD
    let targetDt = temp[0].split("-");

    let targetYear = targetDt[0];
    let targetMonth = targetDt[1];
    let targetDay = targetDt[2];

    //HH:MM:SS
    let targetT = temp[1].split(":");

    let targetHours = targetT[0];
    let targetMinutes = targetT[1];

    
    let now = new Date();

    //현재시간을 구합니다. 
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    let dateNow = new Date(year, month, day, hours, minutes);
    let dateTarget = new Date(targetYear, targetMonth, targetDay, targetHours, targetMinutes);

    let elapsedMSec = dateTarget.getTime() - dateNow.getTime();
    let elapsedMin = elapsedMSec / 1000 / 60;

    return parseInt(elapsedMin);

}