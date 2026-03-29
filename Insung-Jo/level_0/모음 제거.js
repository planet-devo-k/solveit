function solution(my_string) {
  const gather = ["a", "e", "i", "o", "u"];
  let answer = my_string.split("");

  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < gather.length; j++) {
      if (answer[i] === gather[j]) {
        answer.splice(i, 1);
        i--;
      }
    }
  }

  return answer.join("");
}
