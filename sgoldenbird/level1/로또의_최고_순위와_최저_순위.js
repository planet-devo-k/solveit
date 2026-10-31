function solution(lottos, win_nums) {
  const getRanking = (count) => {
    switch (count) {
      case 6:
        return 1;
      case 5:
        return 2;
      case 4:
        return 3;
      case 3:
        return 4;
      case 2:
        return 5;
      default:
        return 6;
    }
  };

  const zeroCount = lottos.filter((num) => num === 0).length;
  const matchCount = lottos.filter((num) => win_nums.includes(num)).length;
  const maxRank = getRanking(matchCount + zeroCount);
  const minRank = getRanking(matchCount);

  return [maxRank, minRank];
}
