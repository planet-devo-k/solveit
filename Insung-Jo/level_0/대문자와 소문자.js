function solution(my_string) {
  const REGEX = /[a-z]/;
  let word = my_string.split("");
  let answer = [];

  for (let i = 0; i < my_string.length; i++) {
    if (word[i].match(REGEX)) {
      answer.push(word[i].toUpperCase());
    } else answer.push(word[i].toLowerCase());
  }

  return answer.join("");
}
