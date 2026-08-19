// https://school.programmers.co.kr/learn/courses/30/lessons/178871

function solution(players, callings) {
  const rank = new Map();

  players.forEach((player, idx) => {
    rank.set(player, idx);
  });

  for (const calling of callings) {
    const currentIdx = rank.get(calling);
    const prevPlayer = players[currentIdx - 1];

    [players[currentIdx], players[currentIdx - 1]] = [
      players[currentIdx - 1],
      players[currentIdx],
    ];

    rank.set(calling, currentIdx - 1);
    rank.set(prevPlayer, currentIdx);
  }

  return players;
}
