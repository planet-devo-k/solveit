function solution(N, stages) {
  // 각 스테이지에 멈춰있는 유저 수 카운트 (인덱스: 1 ~ N + 1)
  const userCount = new Array(N + 2).fill(0);
  for (const stage of stages) {
    userCount[stage]++;
  }

  // 각 스테이지별 실패율 계산
  let totalPlayers = stages.length; // 현재 스테이지에 도달한 인원수
  const stageRates = [];

  for (let stage = 1; stage <= N; stage++) {
    // 도달한 사람없으면 실패율은 0
    const failureRate =
      totalPlayers === 0 ? 0 : userCount[stage] / totalPlayers;

    stageRates.push({ stage, failureRate });

    // 다음 스테이지에 도달 인원 = 현재 도달 인원 - 현재 스테이지 탈락자
    totalPlayers -= userCount[stage];
  }

  // 실패율 내림차순 정렬 (실패율이 같으면 번호가 작은 순)
  stageRates.sort((a, b) => {
    if (b.failureRate === a.failureRate) {
      return a.stage - b.stage; // 번호 오름차순
    }
    return b.failureRate - a.failureRate; // 실패율 내림차순
  });

  // 4. 스테이지 번호만 추출해서 반환
  return stageRates.map((item) => item.stage);
}

// 다른 풀이
function solution(N, stages) {
  let result = [];
  let total = stages.length; // 스테이지에 도달한 전체 인원

  for (let i = 1; i <= N; i++) {
    // 현재 스테이지 i에 멈춰있는 사람 수 세기
    let count = stages.filter((stage) => stage === i).length;

    // [스테이지 번호, 실패율] 쌍으로 저장
    result.push([i, total === 0 ? 0 : count / total]);

    // 다음 스테이지로 올라간 사람 수 갱신
    total -= count;
  }

  // 4. 실패율(b[1]) 기준 내림차순 정렬 후 스테이지 번호(a[0])만 추출
  result.sort((a, b) => b[1] - a[1]);
  return result.map((item) => item[0]);
}
