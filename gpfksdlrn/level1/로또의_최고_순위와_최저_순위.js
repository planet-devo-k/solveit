// https://school.programmers.co.kr/learn/courses/30/lessons/77484

function solution(lottos, win_nums) {
  const zeroCount = lottos.filter((num) => num === 0).length;
  const matchCount = lottos.filter((num) => win_nums.includes(num)).length;

  // 최고 순위는 0이 모두 당첨, 최저 순위는 0이 모두 낙첨
  const maxRank = getRank(matchCount + zeroCount);
  const minRank = getRank(matchCount);

  return [maxRank, minRank];
}

// 맞힌 개수에 따른 순위 계산
function getRank(count) {
  return Math.min(7 - count, 6);
}
