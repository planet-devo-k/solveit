// https://school.programmers.co.kr/learn/courses/30/lessons/12918

function solution(s) {
  return /^\d{4}$|^\d{6}$/.test(s);
}

/* 참고사항
 /.../   : 정규표현식
 ^       : 문자열 시작
 $       : 문자열 끝
 \d      : 숫자 한 글자 (0~9)
 {4}     : 앞 패턴이 4번 반복
 |       : 또는 (OR)

 즉,
 /^\d{4}$/  -> 숫자 4자리
 /^\d{6}$/  -> 숫자 6자리
*/