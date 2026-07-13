// [RETRY]
function solution(cards1, cards2, goal) {
  let idx1 = 0;
  let idx2 = 0;

  for (let i = 0; i < goal.length; i++) {
    let target = goal[i];

    if (idx1 < cards1.length && cards1[idx1] === target) {
      idx1++;
    } else if (idx2 < cards2.length && cards2[idx2] === target) {
      idx2++;
    } else {
      return "No";
    }
  }
  return "Yes";
}
