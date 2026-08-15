function solution(players, callings) {
  const rank = new Map(players.map((name, i) => [name, i]));

  for (const name of callings) {
    const cur = rank.get(name);
    const front = players[cur - 1];

    [players[cur - 1], players[cur]] = [name, front];

    rank.set(name, cur - 1).set(front, cur);
  }
  return players;
}
