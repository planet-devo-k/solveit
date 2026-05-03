function solution(price, money, count) {
  let result = money;
  for (let i = 1; i <= count; i++) {
    result -= price * i;
  }

  return result < 0 ? Math.abs(result) : 0;
}

// 다른 풀이(가우스 공식: 1~n까지의 합)
// function solution(price, money, count) {
//     const tmp = price * count * (count + 1) / 2 - money;
//     return tmp > 0 ? tmp : 0;
// }
