function solution(k, m, score) {
  let answer = 0;
  // 내림차순
  score.sort((a, b) => b - a);

  // m개씩 묶고 각 상자의 최저 점수 골라내기
  for (let i = m - 1; i < score.length; i += m) {
    answer += score[i] * m;
  }
  return answer;
}
