// https://school.programmers.co.kr/learn/courses/30/lessons/181839

/* 두 주사위를 굴렸을 때 나온 숫자를 각자 a, b라고 했을 때 얻는 점수
  - a, b 모두 홀수: a 제곱 + b 제곱
  - a, b 중 하나만 홀수라면 2 * (a + b)
  - a, b 모두 홀수가 아니라면 |a - b|
*/
function solution(a, b) {
    const sum = (a % 2) + (b % 2);
    
    if (sum === 2) return (a * a) + (b * b);
    else if (sum === 1) return 2 * (a + b);
    else return Math.abs(a - b);
}