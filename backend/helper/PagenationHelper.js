/**
 * 
 * @param {number} totalCount totalCount - 페이지 계산의 대상이 되는 전체 데이터수 (SQL의 count 함수 결과값)
 * @param {number} nowPage nowPage - 현재페이지(GET 파라미터로 수신한 값)
 * @param {number} listCount listCount - 한 페이지에 보여질 목록의 수(개발자가 정의하거나 GET으로 받는 값)
 * @param {number} groupCount - 페이지 그룹수 (개발자가 정하는 값)
 * @return {Object} - nowPage: 현재페이지
 *                  - totalCount: 전체 데이터 수 
 *                  - listCount: 한 페이지에 보여질 목록의 수
 *                  - totalPage  : 전체 페이지 수
 *                  - groupCount : 한 페이지에 보여질 그룹의 수
 *                  - totalGroup : 전체 그룹 수
 *                  - nowGroup   : 한재 페이지가 속해 있는 그룹 번호
 *                  - groupStart : 현재 그룹의 시작 페이지
 *                  - prevGroupLastPage : 이전 그룹의 마지막 페이지
 *                  - nextGroupFirstPage : 다음 그룹의 시작 페이지
 *                  - offset : SQL의 LIMIT 절에서 사용할 데이터 시작 위치
 */
module.exports.pagenation = (totalCount=0, nowPage=1, listCount=10, groupCount=5) => {

    //파라미터 정수 변환
    totalCount = isNaN(totalCount) ? totalCount : parseInt(totalCount);
    nowPage = isNaN(nowPage) ? nowPage : parseInt(nowPage);
    listCount = isNaN(listCount) ? listCount : parseInt(listCount);
    groupCount = isNaN(groupCount) ? groupCount : parseInt(groupCount);


    //전체 페이지 수(
        let totalPage = parseInt(((totalCount - 1) / listCount)) +1;
    
        // 전체 그룹 수
        let totalGroup = parseInt(((totalPage - 1)/ groupCount)) +1;
    
        // 현재 페이지가 속한 그룹  
        let nowGroup = parseInt(((nowPage - 1) / groupCount)) + 1;
    
        // 현재 그룹의 시작 페이지 번호
        let groupStart = parseInt(((nowGroup - 1) * groupCount))+1;
    
        // 현재 그룹의 마지막 페이지 번호
        let groupEnd = Math.min(totalPage,nowGroup * groupCount);
    
        // 이전 그룹의 마지막 페이지 번호
        let prevGroupLastPage = 0;
        if(groupEnd > groupCount){prevGroupLastPage = groupStart - 1;}
    
        // 다음 그룹의 시작 페이지 번호
        let nextGroupFirstPage = 0;
        if(groupEnd < totalPage){nextGroupFirstPage = groupEnd + 1;}
    
        //Limit 절에서 사용할 테이터 시작 위치
        let offset = (nowPage -1) * listCount;
    
    
        return {
            nowPage : nowPage,
            totalCount : totalCount,
            listCount : listCount,
            totalPage : totalPage,
            groupCount : groupCount,
            totalGroup : totalGroup,
            nowGroup : nowGroup,
            groupStart : groupStart,
            groupEnd : groupEnd,
            prevGroupLastPage : prevGroupLastPage,
            nextGroupFirstPage : nextGroupFirstPage,
            offset : offset
        }
}