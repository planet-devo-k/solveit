function solution(num_list) {
  let count = 0;
  for (let i of num_list) {
    while (i > 1) {
      if (i % 2 === 0) {
        i = i / 2;
      } else {
        i = (i - 1) / 2;
      }
      count++;
    }
  }
  return count;
}

// 다른 풀이
// 어떤 숫자를 1이 될 때까지 2로 계속 나누는 행위는, 2진수 관점에서 보면 자릿수를 하나씩 지우는 것과 완전히 똑같음
// function solution(num_list) {
//     return num_list.map(v => v.toString(2).length - 1).reduce((a, c) => a + c);
// }
