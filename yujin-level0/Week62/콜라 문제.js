function solution(a, b, n) {
  let totalCoke = 0;
  let emptyBottles = n; // 보유 중인 빈 병 수

  while (emptyBottles >= a) {
    // 마트에서 새로 받을 수 있는 콜라 개수
    let newCoke = Math.floor(emptyBottles / a) * b;

    // 마트에 주고 남은 빈 병 + 새로 받은 콜라를 마시고 생길 빈 병
    let remainBottles = emptyBottles % a;

    totalCoke += newCoke;
    emptyBottles = newCoke + remainBottles;
  }

  return totalCoke;
}

// 다른 풀이
// function solution(a, b, n) {
//   return Math.floor((n - b) / (a - b)) * b;
// }
