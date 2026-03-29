function solution(my_string, n) {
  let answer = my_string.split("");
  let result = [];

  for (let i = 0; i < answer.length; i++) {
    result = answer[i];
    for (let j = 0; j < n - 1; j++) {
      answer[i] += result;
    }
  }
  let num1 = answer.join("");

  return num1;
}
