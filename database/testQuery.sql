SELECT COUNT(*) as cnt FROM dangoon.board WHERE B_TYPE='S';

select * from dangoon.member;
SELECT * FROM dangoon.board;

select M_ID, B_WRITER, B_TITLE, B_CONTENT, B_IMG, B_RDATE, B_HITS from dangoon.board where B_ID = '10';


/*
외래키 해제 , 적용
*/
SET foreign_key_checks = 0;
SET foreign_key_checks = 1;