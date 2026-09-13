function solution(N, stages) {
  let result = [];
  let totalPlayers = stages.length;

  for (let i = 1; i <= N; i++) {
    let stuckPlayers = stages.filter((stage) => stage === i).length;
    let failureRate = totalPlayers === 0 ? 0 : stuckPlayers / totalPlayers;

    result.push({ stage: i, rate: failureRate });
    totalPlayers -= stuckPlayers;
  }

  result.sort((a, b) => {
    if (b.rate === a.rate) {
      return a.stage - b.stage;
    }
    return b.rate - a.rate;
  });

  return result.map((item) => item.stage);
}
