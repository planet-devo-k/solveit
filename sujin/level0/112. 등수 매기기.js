function solution(score) {
  const averages = [];
  const answer = [];
  for (let i = 0; i < score.length; i++) {
    let average = 0;
    for (let j = 0; j < score[i].length; j++) {
      average += score[i][j];
    }
    averages.push(average / 2);
  }

  for (let i = 0; i < averages.length; i++) {
    let rank = 1;
    for (let j = 0; j < averages.length; j++) {
      if (averages[i] < averages[j]) rank += 1;
    }
    answer.push(rank);
  }
  return answer;
}
