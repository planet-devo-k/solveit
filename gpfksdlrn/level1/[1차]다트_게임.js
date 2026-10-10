// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function solution(dartResult) {
  const scores = [];
  const power = { S: 1, D: 2, T: 3 };
  let i = 0;

  while (i < dartResult.length) {
    let score = '';

    // 점수 읽기 (0 ~ 10)
    while (!isNaN(dartResult[i])) {
      score += dartResult[i++];
    }

    // S, D, T에 따라 점수 계산
    score = Number(score) ** power[dartResult[i++]];
    scores.push(score);

    // 옵션 확인
    const option = dartResult[i];

    if (option === '*') {
      // 현재 점수 2배
      scores[scores.length - 1] *= 2;

      // 이전 점수가 있다면 함께 2배
      if (scores.length > 1) {
        scores[scores.length - 2] *= 2;
      }

      i++;
    } else if (option === '#') {
      // 현재 점수를 마이너스로 변경
      scores[scores.length - 1] *= -1;
      i++;
    }
  }

  return scores.reduce((sum, score) => sum + score, 0);
}
