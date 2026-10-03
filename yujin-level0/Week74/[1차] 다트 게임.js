function solution(dartResult) {
  const scores = [];
  let currentScore = 0;

  for (let i = 0; i < dartResult.length; i++) {
    const char = dartResult[i];

    // 숫자(점수) 처리 (10점 예외 처리 포함)
    if (!isNaN(char)) {
      if (char === "1" && dartResult[i + 1] === "0") {
        currentScore = 10;
        i++; // '0'까지 처리했으므로 인덱스 1 증가
      } else {
        currentScore = Number(char);
      }
    }
    // 보너스(S, D, T) 처리
    else if (char === "S") {
      scores.push(currentScore ** 1);
    } else if (char === "D") {
      scores.push(currentScore ** 2);
    } else if (char === "T") {
      scores.push(currentScore ** 3);
    }
    // 옵션(*, #) 처리
    else if (char === "*") {
      const len = scores.length;
      scores[len - 1] *= 2; // 현재 점수 2배
      if (len - 2 >= 0) {
        scores[len - 2] *= 2; // 직전 점수 2배
      }
    } else if (char === "#") {
      const len = scores.length;
      scores[len - 1] *= -1; // 현재 점수 마이너스
    }
  }

  // 3차례 점수 총합 반환
  return scores.reduce((acc, cur) => acc + cur, 0);
}

// 정규식 간단 풀이
function solution(dartResult) {
  // [점수(1~2자리)][보너스(S/D/T)][옵션(*/#/없음)] 형태로 3개 세트 추출
  const regex = /(\d+)([SDT])([*#]?)/g;
  const matches = [...dartResult.matchAll(regex)];

  const scores = [];

  matches.forEach((match, i) => {
    let [, score, bonus, option] = match;
    score = Number(score);

    // 보너스
    if (bonus === "D") score **= 2;
    if (bonus === "T") score **= 3;

    // 옵션
    if (option === "*") {
      score *= 2;
      if (i > 0) scores[i - 1] *= 2; // 직전 점수도 2배
    } else if (option === "#") {
      score *= -1;
    }

    scores.push(score);
  });

  return scores.reduce((a, b) => a + b, 0);
}
