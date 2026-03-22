function solution(arr) {
  let answer = 0;

  for (const i of arr) {
    answer += i;
  }

  return answer / arr.length;
}
