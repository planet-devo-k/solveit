function solution(number, limit, power) {
  var answer = 0;
  for (let n = 1; n <= number; n++) {
    let count = 0;
    for (let j = 1; j * j <= n; j++) {
      if (j * j == n) count++;
      else if (n % j == 0) count += 2;
    }
    if (count > limit) count = power;
    answer += count;
  }
  return answer;
}

// 다른 풀이
// function solution(number, limit, power) {
//     const sum = (num) => {
//         let res = 0;
//         for (let i = 1; i * i <= num; i++) {
//             if (i * i === num) res++;
//             else if (num % i === 0) res += 2;
//         }
//         return res;
//     };
//     return Array.from({ length: number }, (el, i) => i + 1)
//         .map((el) => (sum(el) > limit ? power : sum(el)))
//         .reduce((acc, cur) => acc + cur, 0);
// }
