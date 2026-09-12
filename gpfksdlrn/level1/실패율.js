// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
  const result = [];
  const count = Array(N + 2).fill(0);

  // 각 스테이지에 머물러 있는 플레이어 수
  stages.forEach((stage) => {
    count[stage]++;
  });

  // 현재 스테이지에 도달한 플레이어 수
  let total = stages.length;

  for (let stage = 1; stage <= N; stage++) {
    const failedPlayers = count[stage];
    const failRate = total === 0 ? 0 : failedPlayers / total;

    result.push({
      stage,
      failRate,
    });

    // 현재 스테이지에서 실패한 플레이어는 다음 스테이지에 도달하지 못함
    total -= failedPlayers;
  }

  // 실패율 내림차순, 실패율이 같으면 스테이지 번호 오름차순
  result.sort((a, b) => {
    if (a.failRate === b.failRate) {
      return a.stage - b.stage;
    }

    return b.failRate - a.failRate;
  });

  // 스테이지 번호만 추출
  return result.map((v) => v.stage);
}
