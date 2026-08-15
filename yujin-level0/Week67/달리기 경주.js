function solution(players, callings) {
  // 선수의 현재 등수를 빠르게 조회하기 위한 Map/객체 생성
  const rankMap = {};
  players.forEach((player, index) => {
    rankMap[player] = index;
  });

  // 호명된 선수를 앞 선수와 swap
  for (let name of callings) {
    const curIdx = rankMap[name]; // 불린 선수의 현재 등수
    const prevIdx = curIdx - 1; // 바로 앞 선수의 등수
    const prevName = players[prevIdx]; // 바로 앞 선수의 이름

    // 선수 위치 교체
    players[prevIdx] = name;
    players[curIdx] = prevName;

    // rankMap 객체에 등수 업데이트
    rankMap[name] = prevIdx;
    rankMap[prevName] = curIdx;
  }

  return players;
}

// 간단한 풀이
// function solution(players, callings) {
//     const rank = {};
//     players.forEach((c,i) => rank[c] = i);
//     for(const winner of callings){
//         let winnerI = rank[winner];
//         let loserI = winnerI - 1;

//         rank[winner]--;
//         rank[players[loserI]]++;

//         players[winnerI] = players[loserI];
//         players[loserI] = winner;
//     }
//     return players;
// }
