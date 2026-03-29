function solution(my_string, letter) {
  let answer = my_string.split("");

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === letter) {
      answer.splice(i, 1);
      i--;
    }
  }
  answer = answer.join("");
  return answer;
}
