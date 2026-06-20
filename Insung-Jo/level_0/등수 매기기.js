function solution(score) {
  const totalScores = score.map((s) => s[0] + s[1]);

  return totalScores.map((currentScore) => {
    return (
      totalScores.filter((otherScore) => otherScore > currentScore).length + 1
    );
  });
}
