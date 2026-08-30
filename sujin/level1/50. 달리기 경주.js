function solution(players, callings) {
  const rank = new Map();

  players.forEach((player, index) => {
    rank.set(player, index);
  });

  for (const calling of callings) {
    const currentRank = rank.get(calling);
    const frontPlayer = players[currentRank - 1];

    players[currentRank - 1] = calling;
    players[currentRank] = frontPlayer;

    rank.set(calling, currentRank - 1);
    rank.set(frontPlayer, currentRank);
  }

  return players;
}
