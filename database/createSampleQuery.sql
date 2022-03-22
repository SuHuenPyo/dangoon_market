/*

Memo >>>>>>>>>>>>>>>>>>>>>>>>>>>

 ctrl + shift + Enter  드래그 영역 쿼리문 모두 실행 
 

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test1', '테스트1', '1234', 'test1@gmail.com', 'asdas3d');
insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test2', '테스트2', '1234', 'test2@gmail.com', 'asda5sd');
insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test3', '테스트3', '1234', 'test3@gmail.com', 'asda6sd');
insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test4', '테스트4', '1234', 'test4@gmail.com', 'as1dasd');
insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test5', '테스트5', '1234', 'test5@gmail.com', 'asd8asd');
insert into dangoon.member(M_USER_ID, M_NAME, M_PW, M_EMAIL, M_KAKAO_ID) VALUES('test6', '테스트6', '1234', 'test6@gmail.com', 'asda46sd');



insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(2, 'S', 'test1', '아이팟 팝니다.', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(3, 'S', 'test2', '에어팟 팝니다', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(4, 'S', 'test3', '컴퓨터 팝니다.', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다.', '싸게 팝니다.', 'ETC', 10000);

insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다2', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다3', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다4', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다5', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다6', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다7', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다8', '싸게 팝니다.', 'ETC', 10000);

insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다9', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다10', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다11', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다12', '싸게 팝니다.', 'ETC', 10000);
insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(5, 'S', 'test4', '전자 기타 팝니다13', '싸게 팝니다.', 'ETC', 10000);

insert into dangoon.admin(A_USER_ID, A_NAME, A_PW) VALUES('admin-shun', 'shun', '1234');
insert into dangoon.admin(A_USER_ID, A_NAME, A_PW) VALUES('admin-ej', 'ej', '1234');
insert into dangoon.admin(A_USER_ID, A_NAME, A_PW) VALUES('admin-dong', 'dong', '1234');

insert into dangoon.announcement(AA_ID,A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('1','1', 'shun', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('2','1', 'shun', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('3','2', 'ej', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('4','2','ej', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('5','2','ej', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('6','2','ej', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('7','2','ej', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('8','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ',100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('9','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('10','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('11','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('12','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('13','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('14','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);
insert into dangoon.announcement(AA_ID, A_ID, AA_WRITER, AA_TITLE, AA_CONTENT, AA_HITS) VALUES('15','3','dong', '사기위험 공지안내', '공지입니다 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ', 100);


 insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY) VALUES(5, 'C', 'test4', '신논현역 맛집이 어디인가요 ', '다음주 신논현에 출장가는데 점심으로 먹을만한 맛집좀 알려주세요', 'ETC');
 insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY) VALUES(5, 'C', 'test4', '강남역 맛집이 어디인가요 ', '다음주 강남역 출장가는데 점심으로 먹을만한 맛집좀 알려주세요', 'ETC');
 insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY) VALUES(5, 'C', 'test4', '신사역 맛집이 어디인가요 ', '다음주 신사역 출장가는데 점심으로 먹을만한 맛집좀 알려주세요', 'ETC');
 insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY) VALUES(5, 'C', 'test4', '옥수역 맛집이 어디인가요 ', '다음주 옥수역 출장가는데 점심으로 먹을만한 맛집좀 알려주세요', 'ETC');
 insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY) VALUES(5, 'C', 'test4', '신길역 맛집이 어디인가요 ', '다음주 신길역 출장가는데 점심으로 먹을만한 맛집좀 알려주세요', 'ETC');


insert into dangoon.board(M_ID, B_TYPE, B_WRITER, B_TITLE, B_CONTENT, B_CATEGORY, B_PRICE) VALUES(1355, 'S', 'test4', '전자 기타 팝니다.', '싸게 팝니다.', 'ETC', 10000);