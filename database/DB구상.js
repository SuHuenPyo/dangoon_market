''' 테이블 구상 시나리오 ```

#TABLE_BOARD (판매글, 동굴게시판){
    "동굴게시판", "판매게시판" 둘 게시판의 컬럼 구조가 딱히 다르지 않을 것으로 보여 테이블을 한개로 통합합니다.
}

#TABLE_LIKE  (좋아요 기능){
    1. 로그인 되어있을 경우 좋아요 버튼 활성화.
    2. 버튼 클릭시 Ajax로 uid, bno를 가진 데이터가 존재하는지 검사
    3. 결과로 하여금 "좋아요" "취소" 플래그 사용
        3-1 데이터가 없을 경우 데이터 추가
        3.2 데이터가 이미 존재한다면: 데이터 삭제
}


