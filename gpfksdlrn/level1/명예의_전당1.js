// https://school.programmers.co.kr/learn/courses/30/lessons/138477

function solution(k, score) {
  const hallOfFame = [];
  const result = [];

  for (const point of score) {
    hallOfFame.push(point);

    // 상위 k개 점수만 유지
    if (hallOfFame.length > k) {
      hallOfFame.sort((a, b) => a - b);
      hallOfFame.shift(); // 가장 낮은 점수 제거
    }

    result.push(Math.min(...hallOfFame)); // 최하위 점수 기록
  }

  return result;
}
