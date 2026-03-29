function solution(angle) { 
  if (typeof answer !== 'number') throw new Error('숫자를 입력하세요');
  let answer = 0;

  if(angle === 180) answer = 4;
  if(angle > 90 && angle < 180) answer = 3;
  if(angle === 90) answer = 2;
  if(angle > 0 && angle < 90 ) answer = 1;

  return answer;
}