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
// a를 주고 b를 돌려받는다 했을 때 한번 교환했을 때 a - b만큼 없어짐
// 마지막 교환을 안정적으로 하기 위해 b개를 제외하고, 순수하게 교환에 소모할 수 있는 병의 총개수
// 한 번 교환할 때마다 새 콜라를 b개씩 받으니까, (총 교환 횟수) * b를 하면 내가 최종적으로 받는 총 콜라의 개수
// function solution(a, b, n) {
//   return Math.floor((n - b) / (a - b)) * b;
// }
