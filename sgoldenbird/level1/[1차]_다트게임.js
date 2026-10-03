function solution(dartResult) {
  const scores = [];
  let currentScore = 0;

  for (let i = 0; i < dartResult.length; i++) {
    const char = dartResult[i];

    if (!isNaN(char)) {
      if (char === "1" && dartResult[i + 1] === "0") {
        currentScore = 10;
        i++;
      } else {
        currentScore = Number(char);
      }
    } else if (char === "S" || char === "D" || char === "T") {
      if (char === "D") {
        currentScore = Math.pow(currentScore, 2);
      } else if (char === "T") {
        currentScore = Math.pow(currentScore, 3);
      }

      scores.push(currentScore);
    } else if (char === "*") {
      scores[scores.length - 1] *= 2;
      if (scores.length > 1) {
        scores[scores.length - 2] *= 2;
      }
    } else if (char === "#") {
      scores[scores.length - 1] *= -1;
    }
  }

  return scores.reduce((acc, cur) => acc + cur, 0);
}
