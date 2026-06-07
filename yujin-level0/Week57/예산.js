function solution(d, budget) {
  let result = 0;
  // 최대 개수를 구하기 위한 오름차순 정렬
  d.sort((a, b) => a - b);

  for (let i = 0; i < d.length; i++) {
    if (budget >= d[i]) {
      budget -= d[i];
      result++;
    } else {
      break;
    }
  }

  return result;
}

// 다른 풀이
// function solution(d, budget) {
//     return d.sort((a, b) => a - b).reduce((count, price) => {
//         return count + ((budget -= price) >= 0);
//     }, 0);
// }
